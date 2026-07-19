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

    images: [
      {
        url: String,
        alt: String,
      },
    ],

    category: {
      type: String,
      required: true,
      enum: ["signature", "dresses", "co-ords", "limited-edition"],
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
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
