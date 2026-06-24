import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        price: Number,
        fabric: String,
        description: String,
        sizes: [String],
        images: [String],
        category: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", productSchema);