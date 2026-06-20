
import ss1 from "../../assets/img/collections/ss1.jpg";
import ss2 from "../../assets/img/collections/ss2.jpg";
import ss3 from "../../assets/img/collections/ss3.jpg";


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
        category: "dresses",
    },

    {
        id: "p2",
        name: "Noir Silhouette",
        category: "signature",
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
        category: "co-ords",
        price: 2199,
        fabric: "Linen",
        description:
            "Relaxed co-ord set perfect for modern casual styling.",
        sizes: ["S", "M"],
        images: [ss3, ss1, ss2],
    },
];

const CollectionGrid = ({ selectedCategory = "all" }) => {
    const navigate = useNavigate();

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter(
                (product) =>
                    product.category.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
            {filteredProducts.map((product) => (
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