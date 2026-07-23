import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    fabric: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: ["signature", "dresses", "co-ords", "limited-edition"],
    },

    collection: {
      type: String,
      required: true,
    },

    sizes: [
      {
        type: String,
      },
    ],

    // ✅ Multiple Cloudinary Image URLs
    images: [
      {
        type: String,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
