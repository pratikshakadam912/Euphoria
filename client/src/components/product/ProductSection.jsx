import React, { useState } from "react";
import {
    Heart,
    ShoppingCart,
    Plus,
    Minus,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

const products = [
    {
        id: 4,
        name: "Classic Leather Bag",
        material: "100% Genuine Leather",
        description:
            "Handcrafted from premium leather for durability and timeless elegance.",
        image:
            "https://images.unsplash.com/photo-1591561954557-26941169b49e",
        price: 3499,
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
    const { addToCart } = useCart();

    const [cartItems, setCartItems] = useState({});

    const handleAdd = (product) => {
        addToCart({
            ...product,
            quantity: 1,
        });

        setCartItems((prev) => ({
            ...prev,
            [product.id]: 1,
        }));
    };

    const increaseQty = (product) => {
        addToCart({
            ...product,
            quantity: 1,
        });

        setCartItems((prev) => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1,
        }));
    };

    const decreaseQty = (productId) => {
        setCartItems((prev) => {
            const qty = prev[productId] || 0;

            if (qty <= 1) {
                const updated = { ...prev };
                delete updated[productId];
                return updated;
            }

            return {
                ...prev,
                [productId]: qty - 1,
            };
        });
    };

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-20">

            <div className="mb-14 text-center">
                <span className="text-sm uppercase tracking-[4px] text-gray-500">
                    Premium Collection
                </span>

                <h2 className="mt-3 text-4xl font-bold text-gray-900">
                    Our Featured Products
                </h2>

                <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                    Discover timeless designs crafted with premium
                    materials and attention to detail.
                </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
                            bg-white
                            shadow-md
                            transition-all
                            duration-300
                            hover:-translate-y-2
                            hover:shadow-2xl
                        "
                    >
                        {/* Wishlist */}
                        <button
                            className="
                                absolute
                                right-4
                                top-4
                                z-10
                                rounded-full
                                bg-white/90
                                p-2.5
                                shadow-md
                                backdrop-blur-sm
                                transition
                                hover:scale-110
                            "
                        >
                            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                        </button>

                        {/* Product Image */}
                        <div className="overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="
                                    h-72
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-110
                                "
                            />
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {product.name}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                <span className="font-medium text-gray-700">
                                    Material:
                                </span>{" "}
                                {product.material}
                            </p>

                            <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                {product.description}
                            </p>

                            <div className="mt-6 flex items-center justify-between">

                                <div>
                                    <p className="text-xs uppercase text-gray-400">
                                        Price
                                    </p>

                                    <h4 className="text-2xl font-bold text-black">
                                        ₹{product.price}
                                    </h4>
                                </div>

                                {/* Cart Controls */}
                                {cartItems[product.id] ? (
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-gray-50
                                            px-4
                                            py-2
                                            shadow-sm
                                        "
                                    >
                                        <button
                                            onClick={() =>
                                                decreaseQty(product.id)
                                            }
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-black
                                                text-white
                                                transition
                                                hover:scale-110
                                            "
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span className="font-semibold text-lg">
                                            {cartItems[product.id]}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQty(product)
                                            }
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-black
                                                text-white
                                                transition
                                                hover:scale-110
                                            "
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleAdd(product)
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-xl
                                            bg-black
                                            px-5
                                            py-3
                                            text-white
                                            shadow-lg
                                            transition-all
                                            duration-300
                                            hover:bg-gray-800
                                            hover:scale-105
                                        "
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}