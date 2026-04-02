import express from "express";
import User from "../models/User.js";

const router = express.Router();


// 🟢 SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 🔍 Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Create new user
        const newUser = new User({
            name,
            email,
            password,
            role: "user" // default role
        });

        await newUser.save();

        res.status(201).json(newUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🔵 LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 🔐 Check password
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // ✅ Return user
        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 🟡 OPTIONAL: GET USER BY EMAIL (useful for frontend)
router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;