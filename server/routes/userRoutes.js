import express from "express";
import User from "../models/User.js";

const router = express.Router();

// =====================================================
// SIGNUP
// POST /api/users/signup
// =====================================================

router.post("/signup", async (req, res) => {
  try {
    const { uid, name, email, password } = req.body;

    // UID is required because User schema requires it
    if (!uid) {
      return res.status(400).json({
        message: "User UID is required.",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    // -------------------------------------------------
    // CHECK EXISTING USER
    // -------------------------------------------------

    const existingUser = await User.findOne({
      $or: [{ uid: String(uid) }, { email: String(email).toLowerCase() }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

    // -------------------------------------------------
    // CREATE USER
    // -------------------------------------------------

    const newUser = new User({
      uid: String(uid),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: "user",
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      user: savedUser,
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Failed to create user.",
      error: error.message,
    });
  }
});

// =====================================================
// LOGIN / GET USER
// POST /api/users/login
// =====================================================
//
// Firebase should handle password authentication.
// This endpoint only gets/creates the MongoDB user record.
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { uid, email } = req.body;

    if (!uid) {
      return res.status(400).json({
        message: "User UID is required.",
      });
    }

    let user = await User.findOne({
      uid: String(uid),
    });

    // -------------------------------------------------
    // USER DOES NOT EXIST IN MONGODB
    // -------------------------------------------------

    if (!user) {
      user = await User.create({
        uid: String(uid),
        email: email ? String(email).toLowerCase() : "",
        role: "user",
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      user,
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
// GET USER BY UID
// GET /api/users/uid/:uid
// =====================================================

router.get("/uid/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({
        message: "User UID is required.",
      });
    }

    const user = await User.findOne({
      uid: String(uid),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user by UID error:", error);

    return res.status(500).json({
      message: "Failed to fetch user.",
      error: error.message,
    });
  }
});

// =====================================================
// GET USER BY EMAIL
// GET /api/users/:email
// =====================================================

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const user = await User.findOne({
      email: String(email).toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user by email error:", error);

    return res.status(500).json({
      message: "Failed to fetch user.",
      error: error.message,
    });
  }
});

export default router;
