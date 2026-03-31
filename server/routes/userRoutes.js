import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ SAVE USER
router.post("/save", async (req, res) => {
    try {
        const { uid, name, email } = req.body;

        let user = await User.findOne({ uid });

        if (!user) {
            user = new User({
                uid,
                name,
                email,
                role: "user" // default
            });

            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ GET ALL USERS (for admin)
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

export default router;