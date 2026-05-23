import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import ss1 from "../../assets/img/collections/ss1.jpg";
import ss2 from "../../assets/img/collections/ss2.jpg";
import ss3 from "../../assets/img/collections/ss3.jpg";

import { useCart } from "../../context/CartContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

const products = [
    {
        id: "p1",
        name: "Ivory Grace Dress",
        price: 2499,
        fabric: "Premium Satin",
        description:
            "Elegant satin dress with soft texture and luxurious finish.",
        sizes: ["S", "M", "L"],
        images: [ss1, ss2, ss3],
    },

    {
        id: "p2",
        name: "Noir Silhouette",
        price: 1999,
        fabric: "Cotton Blend",
        description:
            "Minimal black outfit designed for comfort and elegance.",
        sizes: ["M", "L", "XL"],
        images: [ss2, ss3, ss1],
    },

    {
        id: "p3",
        name: "Soft Muse Co-ord",
        price: 2199,
        fabric: "Linen",
        description:
            "Relaxed co-ord set perfect for modern casual styling.",
        sizes: ["S", "M"],
        images: [ss3, ss1, ss2],
    },
];

const CollectionGrid = () => {
    const { addToCart } = useCart();

    const [cartItems, setCartItems] = useState({});

    const navigate = useNavigate();

    const handleAddToCart = (e, product) => {
        e.stopPropagation();

        addToCart({
            ...product,
            quantity: 1,
        });

        setCartItems((prev) => ({
            ...prev,
            [product.id]: 1,
        }));
    };

    const increaseQty = (e, product) => {
        e.stopPropagation();

        addToCart({
            ...product,
            quantity: 1,
        });

        setCartItems((prev) => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1,
        }));
    };

    const decreaseQty = (e, productId) => {
        e.stopPropagation();

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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                >
                    {/* PRODUCT IMAGE SLIDER */}
                    <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                            className="productSwiper"
                        >
                            {product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={product.name}
                                        className="
                                            w-full
                                            h-[240px]
                                            sm:h-[320px]
                                            lg:h-[460px]
                                            object-cover
                                            transition-transform
                                            duration-500
                                            group-hover:scale-105
                                        "
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* CART CONTROLS */}
                        {cartItems[product.id] ? (
                            <div
                                className="
                                    absolute
                                    z-10
                                    bottom-3
                                    lg:bottom-5
                                    left-1/2
                                    -translate-x-1/2
                                    flex
                                    items-center
                                    gap-3
                                    bg-white/95
                                    backdrop-blur-md
                                    px-4
                                    py-2
                                    rounded-full
                                    shadow-lg
                                "
                            >
                                <button
                                    onClick={(e) =>
                                        decreaseQty(e, product.id)
                                    }
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-black
                                        text-white
                                        transition
                                        hover:scale-110
                                    "
                                >
                                    <Minus size={14} />
                                </button>

                                <span className="font-semibold text-sm min-w-[20px] text-center">
                                    {cartItems[product.id]}
                                </span>

                                <button
                                    onClick={(e) =>
                                        increaseQty(e, product)
                                    }
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-black
                                        text-white
                                        transition
                                        hover:scale-110
                                    "
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={(e) =>
                                    handleAddToCart(e, product)
                                }
                                className="
                                    absolute
                                    z-10
                                    bottom-3
                                    lg:bottom-5
                                    left-1/2
                                    -translate-x-1/2
                                    bg-white/95
                                    backdrop-blur-md
                                    text-black
                                    text-xs
                                    lg:text-sm
                                    px-5
                                    lg:px-7
                                    py-2.5
                                    rounded-full
                                    shadow-lg
                                    hover:bg-black
                                    hover:text-white
                                    hover:scale-105
                                    transition-all
                                    duration-300
                                "
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="mt-3 lg:mt-5">
                        <h4 className="text-sm lg:text-lg font-medium text-gray-900">
                            {product.name}
                        </h4>

                        <p className="text-gray-500 text-xs lg:text-sm mt-1">
                            {product.fabric}
                        </p>

                        <p className="text-gray-900 font-semibold text-sm lg:text-lg mt-2">
                            ₹{product.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollectionGrid;