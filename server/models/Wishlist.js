import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // ==========================================
    // SAVED PRODUCTS
    // ==========================================

    products: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
