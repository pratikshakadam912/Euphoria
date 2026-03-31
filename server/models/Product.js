import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
    image: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);