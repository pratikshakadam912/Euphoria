import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    fabric: String,

    description: String,

    sizes: [String],

    images: [String],

    category: {
      type: String,
      required: true,
    },

    collection: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
