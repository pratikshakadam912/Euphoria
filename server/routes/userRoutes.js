import express from "express";
import User from "../models/User.js";

const router = express.Router();

// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      message: "Failed to fetch users.",
      error: error.message,
    });
  }
});

// =====================================================
// SAVE USER
// POST /api/users/save
// =====================================================
//
// Used when Firebase creates/logs in a user.
// Creates the MongoDB user if they don't already exist.
// =====================================================

router.post("/save", async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    if (!uid) {
      return res.status(400).json({
        message: "User UID is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "User email is required.",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // -------------------------------------------------
    // FIND EXISTING USER
    // -------------------------------------------------

    let user = await User.findOne({
      $or: [{ uid: String(uid) }, { email: normalizedEmail }],
    });

    // -------------------------------------------------
    // UPDATE EXISTING USER
    // -------------------------------------------------

    if (user) {
      let changed = false;

      if (name && name.trim() && user.name !== name.trim()) {
        user.name = name.trim();
        changed = true;
      }

      if (user.email !== normalizedEmail) {
        user.email = normalizedEmail;
        changed = true;
      }

      if (changed) {
        await user.save();
      }

      return res.status(200).json({
        message: "User already exists.",
        user,
      });
    }

    // -------------------------------------------------
    // CREATE NEW USER
    // -------------------------------------------------

    user = await User.create({
      uid: String(uid),
      name: name ? name.trim() : "",
      email: normalizedEmail,
      role: "user",
    });

    return res.status(201).json({
      message: "User saved successfully.",
      user,
    });
  } catch (error) {
    console.error("Save user error:", error);

    return res.status(500).json({
      message: "Failed to save user.",
      error: error.message,
    });
  }
});

// =====================================================
// SIGNUP
// POST /api/users/signup
// =====================================================

router.post("/signup", async (req, res) => {
  try {
    const { uid, name, email, password } = req.body;

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

    const existingUser = await User.findOne({
      $or: [{ uid: String(uid) }, { email: String(email).toLowerCase() }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
    }

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
