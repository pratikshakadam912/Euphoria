import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,

  items: [
    {
      name: String,
      price: Number,
      image: String
    }
  ],

  total: Number,
  paymentMethod: String,

  status: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;