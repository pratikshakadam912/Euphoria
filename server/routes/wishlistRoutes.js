import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// ======================================================
// GET USER WISHLIST
// GET /api/wishlist/user/:userId
// ======================================================

router.get("/user/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(wishlist);
  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// CHECK IF PRODUCT IS IN WISHLIST
// GET /api/wishlist/check/:userId/:productId
// ======================================================

router.get("/check/:userId/:productId", async (req, res) => {
  try {
    const exists = await Wishlist.exists({
      userId: req.params.userId,

      productId: req.params.productId,
    });

    res.json({
      exists: Boolean(exists),
    });
  } catch (error) {
    console.error("Wishlist check error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// ADD TO WISHLIST
// POST /api/wishlist
// ======================================================

router.post("/", async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;

    if (!userId || !productId || !name) {
      return res.status(400).json({
        message: "User and product information are required",
      });
    }

    // ------------------------------------------
    // PREVENT DUPLICATES
    // ------------------------------------------

    const existing = await Wishlist.findOne({
      userId,
      productId,
    });

    if (existing) {
      return res.status(200).json({
        message: "Product already in wishlist",
        wishlist: existing,
      });
    }

    // ------------------------------------------
    // CREATE
    // ------------------------------------------

    const wishlistItem = new Wishlist({
      userId,

      productId,

      name,

      price: Number(price) || 0,

      image: image || "",
    });

    await wishlistItem.save();

    res.status(201).json({
      message: "Product added to wishlist",

      wishlist: wishlistItem,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// REMOVE PRODUCT
// DELETE /api/wishlist/:userId/:productId
// ======================================================

router.delete("/:userId/:productId", async (req, res) => {
  try {
    const deleted = await Wishlist.findOneAndDelete({
      userId: req.params.userId,

      productId: req.params.productId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    res.json({
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// DELETE ENTIRE USER WISHLIST
// DELETE /api/wishlist/user/:userId
// ======================================================

router.delete("/user/:userId", async (req, res) => {
  try {
    await Wishlist.deleteMany({
      userId: req.params.userId,
    });

    res.json({
      message: "Wishlist cleared",
    });
  } catch (error) {
    console.error("Clear wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
