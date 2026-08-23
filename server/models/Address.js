import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    userId: {
      type: String,
      required: true,
      index: true,
    },

    // ==========================================
    // ADDRESS LABEL
    // ==========================================

    label: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },

    // ==========================================
    // PERSONAL DETAILS
    // ==========================================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // ADDRESS
    // ==========================================

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

    // ==========================================
    // DEFAULT ADDRESS
    // ==========================================

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
