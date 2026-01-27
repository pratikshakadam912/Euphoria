import { useState } from "react";
import ProductCard from "../../components/products/ProductCard";

const PRODUCTS = [
    {
        id: 1,
        name: "Classic Leather Bag",
        price: 3499,
        image:
            "https://images.unsplash.com/photo-1591561954557-26941169b49e",
    },
    {
        id: 2,
        name: "Minimal Wrist Watch",
        price: 5999,
        image:
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    },
    {
        id: 3,
        name: "Comfort Sneakers",
        price: 4299,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
        id: 4,
        name: "Premium Sunglasses",
        price: 2199,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    },
];

export default function Products() {
    const [quantities, setQuantities] = useState({});

    const increaseQty = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    const decreaseQty = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) - 1),
        }));
    };

    const addToCart = (product, qty) => {
        console.log("Added to cart:", product.name, qty);
    };

    return (
        <section className="bg-gray-50 min-h-screen px-6 py-16 md:px-20">
            {/* Heading */}
            <div className="mb-14 text-center">
                <h1 className="text-4xl font-bold">Our Products</h1>
                <p className="mt-3 text-gray-500">
                    Crafted with premium materials and modern design
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantities[product.id] || 1}
                        onIncrease={increaseQty}
                        onDecrease={decreaseQty}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
        </section>
    );
}
