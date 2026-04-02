import express from "express";
import User from "../models/User.js";

const router = express.Router();


// ✅ SAVE USER (called after login/signup)
router.post("/save", async (req, res) => {
    try {
        const { uid, name, email } = req.body;

        let user = await User.findOne({ uid });

        // 👉 If user doesn't exist → create
        if (!user) {
            user = new User({
                uid,
                name,
                email,
                role: "user" // default role
            });

            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ GET ALL USERS (for admin panel)
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ GET USER BY EMAIL (🔥 IMPORTANT - fixes your error)
router.get("/:email", async (req, res) => {
    try {
        const email = req.params.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ✅ EXPORT ROUTER
export default router;