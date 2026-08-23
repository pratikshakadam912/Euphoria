import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// =====================================================
// CREATE ORDER
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

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

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

    if (!products || !Array.isArray(products) || products.length === 0) {
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

    if (typeof total !== "number" || total < 0) {
      return res.status(400).json({
        message: "Valid order total is required.",
      });
    }

    // -------------------------------------------------
    // CREATE ORDER
    // -------------------------------------------------

    const newOrder = new Order({
      userId,
      userEmail,

      products: products.map((item) => ({
        productId: item.productId || item.id,

        name: item.name,

        price: Number(item.price) || 0,

        quantity: Number(item.quantity) || 1,

        image: item.image || "",

        size: item.size || null,

        color: item.color || null,

        variant: item.variant || null,
      })),

      total,

      paymentMethod,

      paymentId: paymentId || null,

      isPaid: typeof isPaid === "boolean" ? isPaid : paymentMethod !== "cod",

      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
      },

      status: "pending",

      refundStatus: "none",
    });

    const savedOrder = await newOrder.save();

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
// =====================================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

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
// =====================================================

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      userId,
    }).sort({
      createdAt: -1,
    });

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
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

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
// =====================================================

router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status.",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // -------------------------------------------------
    // BASIC STATUS FLOW
    // -------------------------------------------------

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

    order.status = status;

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
// =====================================================

router.put("/:id/refund", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

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
// =====================================================

router.put("/:id/refund/status", async (req, res) => {
  try {
    const { refundStatus } = req.body;

    const allowedStatuses = [
      "none",
      "requested",
      "approved",
      "rejected",
      "processed",
    ];

    if (!allowedStatuses.includes(refundStatus)) {
      return res.status(400).json({
        message: "Invalid refund status.",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

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
