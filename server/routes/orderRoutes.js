import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ======================================================
// CREATE ORDER
// POST /api/orders/create
// ======================================================

router.post("/create", async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      products,
      total,
      shippingAddress,
      paymentMethod,
      paymentId,
      isPaid,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!userEmail) {
      return res.status(400).json({
        message: "User email is required",
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "Order must contain products",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const newOrder = new Order({
      userId,

      userEmail,

      products,

      total,

      shippingAddress,

      paymentMethod,

      paymentId: paymentId || null,

      isPaid: Boolean(isPaid),

      // IMPORTANT:
      // Every new order starts pending.
      status: "pending",
    });

    await newOrder.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      message: "Order created successfully",

      order: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET ALL ORDERS
// ADMIN
//
// GET /api/orders
// ======================================================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET USER ORDERS
//
// GET /api/orders/user/:userId
// ======================================================

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get user orders error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// GET SINGLE ORDER
//
// GET /api/orders/:id
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// UPDATE ORDER STATUS
//
// PUT /api/orders/:id
// ======================================================

router.put("/:id", async (req, res) => {
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
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,

      {
        status,
      },

      {
        new: true,
      },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated",

      order,
    });
  } catch (error) {
    console.error("Update order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
