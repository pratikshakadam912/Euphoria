import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
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
  { _id: false },
);

const shippingAddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
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

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    // =====================================================
    // USER
    // =====================================================

    userId: {
      type: String,
      required: true,
      index: true,
    },

    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // =====================================================
    // PRODUCTS
    // =====================================================

    products: {
      type: [orderProductSchema],
      required: true,
      validate: {
        validator: (products) => products.length > 0,
        message: "Order must contain at least one product.",
      },
    },

    // =====================================================
    // SHIPPING ADDRESS
    // =====================================================

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    // =====================================================
    // PRICE
    // =====================================================

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    // =====================================================
    // ORDER STATUS
    // =====================================================

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

    // =====================================================
    // PAYMENT
    // =====================================================

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

    // =====================================================
    // REFUND
    // =====================================================

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
