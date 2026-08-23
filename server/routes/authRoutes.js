import express from "express";
import User from "../models/User.js";

const router = express.Router();

// =====================================================
// SIGNUP
// =====================================================

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ---------------------------------------------
    // CHECK EXISTING USER
    // ---------------------------------------------

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // ---------------------------------------------
    // CREATE USER
    // ---------------------------------------------

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "user",
    });

    await newUser.save();

    // ---------------------------------------------
    // RETURN CLEAN USER
    // ---------------------------------------------
    // IMPORTANT:
    // Frontend uses user.uid throughout the app.
    // MongoDB provides _id, so we create uid from _id.

    return res.status(201).json({
      _id: newUser._id,
      uid: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Signup failed.",
      error: error.message,
    });
  }
});

// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ---------------------------------------------
    // FIND USER
    // ---------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    // ---------------------------------------------
    // PASSWORD CHECK
    // ---------------------------------------------

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password.",
      });
    }

    // ---------------------------------------------
    // RETURN CLEAN USER
    // ---------------------------------------------

    return res.status(200).json({
      _id: user._id,
      uid: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
});

// =====================================================
// GET USER BY EMAIL
// =====================================================

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json({
      _id: user._id,
      uid: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      message: "Failed to get user.",
      error: error.message,
    });
  }
});

export default router;
