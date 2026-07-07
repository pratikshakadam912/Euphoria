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

        // Dresses, Co-ords, Sarees, Tops...
        category: String,

        // Signature, New Arrival, Best Seller...
        collection: String,

        // Hero, Trending, Featured, None
        homeSection: String,

        // Highlight products
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
    }
);

export default mongoose.model("Product", productSchema);