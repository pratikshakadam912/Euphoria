import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext"; // 🔥 IMPORT

const products = [
    {
        id: 1,
        name: "Classic Leather Bag",
        material: "100% Genuine Leather",
        description:
            "Handcrafted from premium leather for durability and timeless elegance.",
        image:
            "https://images.unsplash.com/photo-1591561954557-26941169b49e",
        price: 3499, // 🔥 FIXED (NUMBER)
    },
    {
        id: 2,
        name: "Minimal Wrist Watch",
        material: "Stainless Steel & Sapphire Glass",
        description:
            "Designed for everyday wear with scratch-resistant glass and precision movement.",
        image:
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
        price: 5999,
    },
    {
        id: 3,
        name: "Comfort Sneakers",
        material: "Breathable Mesh & Rubber Sole",
        description:
            "Ultra-lightweight sneakers made for long-lasting comfort and flexibility.",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        price: 4299,
    },
];

export default function ProductSection() {

    const { addToCart } = useCart(); // 🔥 USE CONTEXT

    const handleAdd = (product) => {
        const item = {
            ...product,
            quantity: 1
        };

        addToCart(item);

        console.log("Added:", item); // ✅ debug
        alert(`${product.name} added to cart 🛒`);
    };

    return (
        <section className="bg-gray-50 py-16 px-6 md:px-20">

            <h2 className="mb-12 text-center text-3xl font-bold">
                Our Featured Products
            </h2>

            <div className="grid gap-10 md:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative rounded-2xl bg-white p-4 shadow-md transition hover:-translate-y-2 hover:shadow-2xl"
                    >

                        {/* Wishlist */}
                        <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow hover:scale-110 transition">
                            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                        </button>

                        {/* Image */}
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-56 w-full object-cover transition duration-300 group-hover:scale-110"
                            />
                        </div>

                        {/* Info */}
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">{product.name}</h3>

                            <p className="mt-1 text-sm text-gray-500">
                                <span className="font-medium text-gray-700">Material:</span>{" "}
                                {product.material}
                            </p>

                            <p className="mt-2 text-sm text-gray-600">
                                {product.description}
                            </p>

                            {/* Price + Button */}
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold">
                                    ₹{product.price}
                                </span>

                                <button
                                    onClick={() => handleAdd(product)} // 🔥 FIXED
                                    className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white shadow hover:bg-gray-800 transition"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Add
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}