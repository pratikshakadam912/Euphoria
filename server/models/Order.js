import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,

  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  total: Number,

  status: {
    type: String,
    default: "pending"
    // pending → confirmed → shipped → delivered → cancelled → refunded
  },

  paymentMethod: String,
  paymentId: String,

  isPaid: {
    type: Boolean,
    default: false
  },

  refundStatus: {
    type: String,
    default: "none"
    // none | requested | approved | rejected | processed
  }
},
 { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;