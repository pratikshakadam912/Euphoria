import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    userId: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    // ==========================================
    // PRODUCTS
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

        quantity: {
          type: Number,
          required: true,
          default: 1,
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
    ],

    // ==========================================
    // TOTAL
    // ==========================================

    total: {
      type: Number,
      required: true,
    },

    // ==========================================
    // SHIPPING ADDRESS
    // ==========================================

    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        required: true,
      },

      addressLine: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        default: "India",
      },
    },

    // ==========================================
    // ORDER STATUS
    // ==========================================

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
    },

    // ==========================================
    // PAYMENT
    // ==========================================

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // REFUND
    // ==========================================

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
