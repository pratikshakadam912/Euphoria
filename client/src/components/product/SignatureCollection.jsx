import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import scc1 from "../../assets/img/scc1.jpg";

const SignatureCollection = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    "https://euphoria-ooqv.onrender.com/api/products"
                );

                const data = await res.json();

                // Only Signature Collection products
                const filtered = data.filter(
                    (item) =>
                        item.collection?.toLowerCase() === "signature"
                );

                setProducts(filtered);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="bg-white py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="uppercase tracking-[0.45em] text-[#8b5e3c] text-sm mb-5">
                        Signature Collection
                    </p>

                    <h2 className="text-6xl md:text-7xl font-light leading-none text-black">
                        Fashion With
                        <span className="block italic font-medium">
                            Character
                        </span>
                    </h2>
                </motion.div>

                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] mb-14"
                >
                    <img
                        src={scc1}
                        alt="Signature Collection"
                        className="w-full h-[650px] object-cover"
                    />

                    <div className="absolute inset-0 bg-black/20" />

                    <div className="absolute bottom-12 left-12 text-white">
                        <p className="uppercase tracking-[0.4em] text-sm mb-4">
                            Euphoria 2026
                        </p>

                        <h3 className="text-5xl md:text-7xl font-light leading-none">
                            Signature
                            <span className="block italic">
                                Collection
                            </span>
                        </h3>
                    </div>
                </motion.div>

                {/* Products */}
                <div className="grid md:grid-cols-3 gap-10">

                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.15,
                            }}
                            viewport={{ once: true }}
                            onClick={() =>
                                navigate(`/product/${product._id}`)
                            }
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-[2rem]">

                                <img
                                    src={product.images?.[0]}
                                    alt={product.name}
                                    className="w-full h-[500px] object-cover transition duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

                                    <span className="uppercase tracking-[0.3em] text-xs">
                                        {product.collection}
                                    </span>

                                    <h3 className="text-2xl font-light mt-2">
                                        {product.name}
                                    </h3>

                                </div>

                            </div>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default SignatureCollection;