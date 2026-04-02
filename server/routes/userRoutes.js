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
router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;