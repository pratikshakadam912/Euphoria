import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";



import "swiper/css";
import "swiper/css/pagination";

const CollectionGrid = ({ selectedCategory = "all" }) => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    "https://euphoria-ooqv.onrender.com/api/products"
                );

                const data = await res.json();

                setProducts(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts =
        selectedCategory === "all"
            ? products
            : products.filter(
                  (product) =>
                      product.category?.toLowerCase() ===
                      selectedCategory.toLowerCase()
              );

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                Loading Products...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
            {filteredProducts.map((product) => (
                <div
                    key={product._id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}
                >
                    {/* PRODUCT IMAGE SLIDER */}
                    <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                            className="productSwiper"
                        >
                            {product.images?.map((img, index) => (
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