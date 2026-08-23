import express from "express";
import mongoose from "mongoose";

import Order from "../models/Order.js";

const router = express.Router();

// =====================================================
// CONSTANTS
// =====================================================

const PAYMENT_METHODS = ["cod", "razorpay", "upi", "card"];

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

const REFUND_STATUSES = [
  "none",
  "requested",
  "approved",
  "rejected",
  "processed",
];

// =====================================================
// HELPER - VALIDATE OBJECT ID
// =====================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// =====================================================
// HELPER - FORMAT PRODUCTS
// =====================================================

const formatProducts = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Order must contain at least one product.");
  }

  return products.map((item) => {
    const productId = item.productId || item.id;

    if (!productId) {
      throw new Error("Product ID is missing.");
    }

    const price = Number(item.price);

    const quantity = Number(item.quantity);

    if (!Number.isFinite(price) || price < 0) {
      throw new Error(`Invalid price for product ${productId}.`);
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for product ${productId}.`);
    }

    return {
      productId: String(productId),

      name: String(item.name || "Product").trim(),

      price,

      quantity: Math.floor(quantity),

      image: item.image || "",

      size: item.size || null,

      color: item.color || null,

      variant: item.variant || null,
    };
  });
};

// =====================================================
// HELPER - CALCULATE TOTAL
// =====================================================

const calculateProductsTotal = (products) => {
  return products.reduce((sum, product) => {
    return sum + Number(product.price) * Number(product.quantity);
  }, 0);
};

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
    // BASIC VALIDATION
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

    if (!PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method.",
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
      if (
        shippingAddress[field] === undefined ||
        shippingAddress[field] === null ||
        String(shippingAddress[field]).trim() === ""
      ) {
        return res.status(400).json({
          message: `${field} is required.`,
        });
      }
    }

    // =================================================
    // FORMAT PRODUCTS
    // =================================================

    let formattedProducts;

    try {
      formattedProducts = formatProducts(products);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    // =================================================
    // CALCULATE TOTAL
    // =================================================

    const calculatedTotal = calculateProductsTotal(formattedProducts);

    /*
      Frontend sends total as well.

      We compare it with the server-calculated total
      to prevent accidental/malicious mismatches.
    */

    const frontendTotal = Number(total);

    if (!Number.isFinite(frontendTotal) || frontendTotal < 0) {
      return res.status(400).json({
        message: "Invalid order total.",
      });
    }

    // Small tolerance for floating-point calculations.
    if (Math.abs(frontendTotal - calculatedTotal) > 0.01) {
      return res.status(400).json({
        message: "Order total does not match product prices.",
      });
    }

    // =================================================
    // PAYMENT VALIDATION
    // =================================================

    let finalIsPaid = false;

    if (paymentMethod === "cod") {
      finalIsPaid = false;
    } else {
      /*
        Current frontend uses mock online payment.

        Therefore we accept the frontend payment result
        for now.

        Replace this with Razorpay verification before
        production.
      */

      finalIsPaid = typeof isPaid === "boolean" ? isPaid : false;
    }

    // =================================================
    // CREATE ORDER
    // =================================================

    const order = new Order({
      userId: String(userId).trim(),

      userEmail: String(userEmail).trim().toLowerCase(),

      products: formattedProducts,

      total: calculatedTotal,

      status: "pending",

      shippingAddress: {
        fullName: String(shippingAddress.fullName).trim(),

        email: String(shippingAddress.email || userEmail)
          .trim()
          .toLowerCase(),

        phone: String(shippingAddress.phone).trim(),

        addressLine: String(shippingAddress.addressLine).trim(),

        city: String(shippingAddress.city).trim(),

        state: String(shippingAddress.state).trim(),

        postalCode: String(shippingAddress.postalCode).trim(),

        country: String(shippingAddress.country || "India").trim(),
      },

      paymentMethod,

      paymentId: paymentId || null,

      isPaid: finalIsPaid,

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
      userId: String(userId),
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
//
// Optional frontend ownership check:
// ?userId=USER_ID
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { userId } = req.query;

    if (!isValidObjectId(id)) {
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

    // =================================================
    // USER OWNERSHIP CHECK
    // =================================================

    if (userId && String(order.userId) !== String(userId)) {
      return res.status(403).json({
        message: "You are not authorized to view this order.",
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

    // =================================================
    // VALIDATION
    // =================================================

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    if (!ORDER_STATUSES.includes(status)) {
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

    if (status === "refunded") {
      return res.status(400).json({
        message: "Use the refund status endpoint to process a refund.",
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

    const { userId } = req.body;

    if (!isValidObjectId(id)) {
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
    // OWNERSHIP
    // =================================================

    if (userId && String(order.userId) !== String(userId)) {
      return res.status(403).json({
        message: "You are not authorized to modify this order.",
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

    // =================================================
    // VALIDATION
    // =================================================

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid order ID.",
      });
    }

    if (!REFUND_STATUSES.includes(refundStatus)) {
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
    // UPDATE REFUND STATUS
    // =================================================

    order.refundStatus = refundStatus;

    if (refundStatus === "processed") {
      order.status = "refunded";
      order.isPaid = false;
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
