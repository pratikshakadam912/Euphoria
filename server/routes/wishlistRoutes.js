import express from "express";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// ======================================================
// GET USER WISHLIST
//
// GET /api/wishlist/:userId
// ======================================================

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let wishlist = await Wishlist.findOne({ userId });

    // ------------------------------------------
    // CREATE EMPTY WISHLIST IF NONE EXISTS
    // ------------------------------------------

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [],
      });

      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// ADD PRODUCT TO WISHLIST
//
// POST /api/wishlist
// ======================================================

router.post("/", async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({
        message: "Product price is required",
      });
    }

    // ==========================================
    // FIND OR CREATE WISHLIST
    // ==========================================

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [],
      });
    }

    // ==========================================
    // CHECK DUPLICATE
    // ==========================================

    const alreadyExists = wishlist.products.some(
      (product) => product.productId === String(productId),
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "Product is already in wishlist",

        wishlist,
      });
    }

    // ==========================================
    // ADD PRODUCT
    // ==========================================

    wishlist.products.push({
      productId: String(productId),

      name,

      price: Number(price),

      image: image || "",
    });

    await wishlist.save();

    res.status(201).json({
      message: "Product added to wishlist",

      wishlist,
    });
  } catch (error) {
    console.error("Add wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// REMOVE PRODUCT FROM WISHLIST
//
// DELETE /api/wishlist/:userId/:productId
// ======================================================

router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    // ==========================================
    // REMOVE PRODUCT
    // ==========================================

    const originalLength = wishlist.products.length;

    wishlist.products = wishlist.products.filter(
      (product) => product.productId !== String(productId),
    );

    // ==========================================
    // PRODUCT DIDN'T EXIST
    // ==========================================

    if (wishlist.products.length === originalLength) {
      return res.status(404).json({
        message: "Product not found in wishlist",
      });
    }

    await wishlist.save();

    res.json({
      message: "Product removed from wishlist",

      wishlist,
    });
  } catch (error) {
    console.error("Remove wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// CHECK PRODUCT IN WISHLIST
//
// GET /api/wishlist/:userId/check/:productId
// ======================================================

router.get("/:userId/check/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.json({
        exists: false,
      });
    }

    const exists = wishlist.products.some(
      (product) => product.productId === String(productId),
    );

    res.json({
      exists,
    });
  } catch (error) {
    console.error("Check wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ======================================================
// CLEAR WISHLIST
//
// DELETE /api/wishlist/:userId
// ======================================================

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({
      userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];

    await wishlist.save();

    res.json({
      message: "Wishlist cleared",

      wishlist,
    });
  } catch (error) {
    console.error("Clear wishlist error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
