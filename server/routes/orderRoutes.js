import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


// ✅ CREATE ORDER (from checkout)
router.post("/create", async (req, res) => {
    try {
        const { userId, userEmail, items, total, paymentMethod } = req.body;

        const newOrder = new Order({
            userId,
            userEmail,
            items,
            total,
            paymentMethod
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ✅ GET ALL ORDERS (for admin)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;