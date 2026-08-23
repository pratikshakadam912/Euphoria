import mongoose from "mongoose";

// =====================================================
// ORDER PRODUCT
// =====================================================

const orderProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true,
    },

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

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
      default: "",
    },

    size: {
      type: String,
      default: null,
    },

    color: {
      type: String,
      default: null,
    },

    variant: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  },
);

// =====================================================
// SHIPPING ADDRESS
// =====================================================

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

// =====================================================
// ORDER SCHEMA
// =====================================================

const orderSchema = new mongoose.Schema(
  {
    // =================================================
    // USER
    // =================================================

    userId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // =================================================
    // PRODUCTS
    // =================================================

    products: {
      type: [orderProductSchema],

      required: true,

      validate: {
        validator: (products) => Array.isArray(products) && products.length > 0,

        message: "Order must contain at least one product.",
      },
    },

    // =================================================
    // SHIPPING ADDRESS
    // =================================================

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    // =================================================
    // TOTAL
    // =================================================

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    // =================================================
    // ORDER STATUS
    // =================================================

    status: {
      type: String,

      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
      ],

      default: "pending",

      index: true,
    },

    // =================================================
    // PAYMENT
    // =================================================

    paymentMethod: {
      type: String,

      required: true,

      enum: ["cod", "razorpay", "upi", "card"],
    },

    paymentId: {
      type: String,
      default: null,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    // =================================================
    // REFUND
    // =================================================

    refundStatus: {
      type: String,

      enum: ["none", "requested", "approved", "rejected", "processed"],

      default: "none",
    },
  },

  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
