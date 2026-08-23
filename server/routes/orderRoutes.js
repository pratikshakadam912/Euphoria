import express from "express";
import mongoose from "mongoose";

import Order from "../models/Order.js";

const router = express.Router();

// =====================================================
// CREATE ORDER
// POST /api/orders/create
// =====================================================

router.post("/create", async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      products,
      total,
      paymentMethod,
      paymentId,
      isPaid,
      shippingAddress,
    } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    if (!userEmail) {
      return res.status(400).json({
        message: "User email is required.",
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product.",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required.",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required.",
      });
    }

    if (!["cod", "razorpay", "upi", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method.",
      });
    }

    if (typeof total !== "number" || total < 0) {
      return res.status(400).json({
        message: "Valid order total is required.",
      });
    }

    // =================================================
    // SHIPPING ADDRESS VALIDATION
    // =================================================

    const requiredAddressFields = [
      "fullName",
      "phone",
      "addressLine",
      "city",
      "state",
      "postalCode",
    ];

    for (const field of requiredAddressFields) {
      if (!shippingAddress[field]) {
        return res.status(400).json({
          message: `${field} is required.`,
        });
      }
    }

    // =================================================
    // FORMAT PRODUCTS
    // =================================================

    const formattedProducts = products.map((item) => {
      const productId = item.productId || item.id;

      if (!productId) {
        throw new Error("Product ID is missing.");
      }

      return {
        productId: String(productId),

        name: String(item.name || "Product"),

        price: Number(item.price) || 0,

        quantity: Math.max(1, Number(item.quantity) || 1),

        image: item.image || "",

        size: item.size || null,

        color: item.color || null,

        variant: item.variant || null,
      };
    });

    // =================================================
    // CREATE ORDER
    // =================================================

    const order = new Order({
      userId: String(userId),

      userEmail: String(userEmail).toLowerCase(),

      products: formattedProducts,

      total: Number(total),

      shippingAddress: {
        fullName: shippingAddress.fullName,

        email: shippingAddress.email || userEmail,

        phone: shippingAddress.phone,

        addressLine: shippingAddress.addressLine,

        city: shippingAddress.city,

        state: shippingAddress.state,

        postalCode: shippingAddress.postalCode,

        country: shippingAddress.country || "India",
      },

      paymentMethod,

      paymentId: paymentId || null,

      isPaid: typeof isPaid === "boolean" ? isPaid : paymentMethod !== "cod",

      status: "pending",

      refundStatus: "none",
    });

    const savedOrder = await order.save();

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      message: "Order created successfully.",

      order: savedOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Failed to create order.",

      error: error.message,
    });
  }
});

// =====================================================
// GET ALL ORDERS
// ADMIN
//
// GET /api/orders
// =====================================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      message: "Failed to fetch orders.",

      error: error.message,
    });
  }
});

// =====================================================
// GET USER ORDERS
//
// GET /api/orders/user/:userId
// =====================================================

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    const orders = await Order.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);

    return res.status(500).json({
      message: "Failed to fetch user orders.",

      error: error.message,
    });
  }
});

// =====================================================
// GET SINGLE ORDER
//
// GET /api/orders/:id
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    const order = await Order.findById(id).lean();

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      message: "Failed to fetch order.",

      error: error.message,
    });
  }
});

// =====================================================
// UPDATE ORDER STATUS
// ADMIN
//
// PUT /api/orders/:id/status
// =====================================================

router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ];

    // =================================================
    // VALIDATION
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status.",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // =================================================
    // STATUS FLOW
    // =================================================

    if (status === "confirmed" && order.status !== "pending") {
      return res.status(400).json({
        message: "Only pending orders can be confirmed.",
      });
    }

    if (status === "shipped" && order.status !== "confirmed") {
      return res.status(400).json({
        message: "Only confirmed orders can be shipped.",
      });
    }

    if (status === "delivered" && order.status !== "shipped") {
      return res.status(400).json({
        message: "Only shipped orders can be delivered.",
      });
    }

    if (
      status === "cancelled" &&
      !["pending", "confirmed"].includes(order.status)
    ) {
      return res.status(400).json({
        message: "Only pending or confirmed orders can be cancelled.",
      });
    }

    // =================================================
    // UPDATE
    // =================================================

    order.status = status;

    // COD becomes paid after delivery

    if (status === "delivered" && order.paymentMethod === "cod") {
      order.isPaid = true;
    }

    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully.",

      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);

    return res.status(500).json({
      message: "Failed to update order status.",

      error: error.message,
    });
  }
});

// =====================================================
// REQUEST REFUND
// USER
//
// PUT /api/orders/:id/refund
// =====================================================

router.put("/:id/refund", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // =================================================
    // VALIDATION
    // =================================================

    if (order.status !== "cancelled") {
      return res.status(400).json({
        message: "Refund can only be requested for cancelled orders.",
      });
    }

    if (!order.isPaid) {
      return res.status(400).json({
        message:
          "This order was not paid online and does not require a refund.",
      });
    }

    if (order.refundStatus !== "none") {
      return res.status(400).json({
        message: "Refund has already been requested.",
      });
    }

    // =================================================
    // REQUEST REFUND
    // =================================================

    order.refundStatus = "requested";

    await order.save();

    return res.status(200).json({
      message: "Refund requested successfully.",

      order,
    });
  } catch (error) {
    console.error("Refund request error:", error);

    return res.status(500).json({
      message: "Failed to request refund.",

      error: error.message,
    });
  }
});

// =====================================================
// UPDATE REFUND STATUS
// ADMIN
//
// PUT /api/orders/:id/refund/status
// =====================================================

router.put("/:id/refund/status", async (req, res) => {
  try {
    const { id } = req.params;

    const { refundStatus } = req.body;

    const allowedRefundStatuses = [
      "none",
      "requested",
      "approved",
      "rejected",
      "processed",
    ];

    // =================================================
    // VALIDATION
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    if (!allowedRefundStatuses.includes(refundStatus)) {
      return res.status(400).json({
        message: "Invalid refund status.",
      });
    }

    // =================================================
    // FIND ORDER
    // =================================================

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // =================================================
    // UPDATE REFUND
    // =================================================

    order.refundStatus = refundStatus;

    if (refundStatus === "processed") {
      order.status = "refunded";
    }

    await order.save();

    return res.status(200).json({
      message: "Refund status updated successfully.",

      order,
    });
  } catch (error) {
    console.error("Update refund error:", error);

    return res.status(500).json({
      message: "Failed to update refund status.",

      error: error.message,
    });
  }
});

export default router;
