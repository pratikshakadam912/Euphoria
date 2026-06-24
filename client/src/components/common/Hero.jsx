import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import hero1 from "../../assets/img/hero1.jpg";
import hero2 from "../../assets/img/hero2.jpg";
const products = [
    {
        id: "hero-1",
        image: hero1,
        category: "Dresses",
    },
    {
        id: "hero-2",
        image: hero2,
        category: "Signature",
    },


];

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-[#f8f5f1] min-h-screen overflow-hidden pt-28">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="uppercase tracking-[0.45em] text-[#8b5e3c] text-sm mb-6">
                            New Collection 2026
                        </p>

                        <h1 className="text-6xl md:text-7xl xl:text-8xl font-light leading-[0.9] text-black">
                            Wear
                            <span className="block italic font-medium">
                                Euphoria
                            </span>
                        </h1>

                        <p className="mt-8 text-gray-600 max-w-lg text-lg leading-relaxed">
                            Timeless silhouettes, modern tailoring, and elevated
                            essentials crafted for everyday elegance.
                        </p>

                        <div className="mt-10 flex gap-4 flex-wrap">

                            <button
                                onClick={() => navigate("/collection")}
                                className="px-8 py-4 rounded-full bg-black text-white hover:bg-[#8b5e3c] transition-all duration-300"
                            >
                                Shop Collection
                            </button>

                            <button
                                onClick={() => navigate("/about")}
                                className="px-8 py-4 rounded-full border border-black hover:bg-black hover:text-white transition-all duration-300"
                            >
                                Our Story
                            </button>

                        </div>

                        <div className="mt-20 flex gap-10">

                            <div>
                                <h3 className="text-3xl font-semibold">
                                    Premium
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">
                                    Curated Collection
                                </p>
                            </div>

                            <div>
                                <h3 className="text-3xl font-semibold">
                                    Luxury
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">
                                    Everyday Fashion
                                </p>
                            </div>

                        </div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >

                        {/* Background Glow */}
                        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#8b5e3c]/10 blur-[120px]" />

                        {/* Main Large Image */}
                        <motion.div
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => navigate("/product/hero-1")}
                            className="cursor-pointer"
                        >
                            <img
                                src={hero1}
                                alt=""
                                className="w-full h-[620px] object-cover rounded-[40px] shadow-2xl"
                            />
                        </motion.div>

                        {/* Bottom Gallery */}
                        <div className="grid grid-cols-2 gap-6 mt-6">

                            <motion.div
                                whileHover={{
                                    y: -6,
                                    scale: 1.02
                                }}
                                onClick={() => navigate("/product/hero-2")}
                                className="cursor-pointer"
                            >
                                <img
                                    src={hero2}
                                    alt=""
                                    className="h-60 w-full object-cover rounded-[28px] shadow-lg"
                                />
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    y: -6,
                                    scale: 1.02
                                }}
                                onClick={() => navigate("/collection")}
                                className="cursor-pointer bg-white rounded-[28px] shadow-lg flex flex-col justify-center items-center p-8"
                            >
                                <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
                                    Explore
                                </span>

                                <h3 className="text-3xl font-light text-center mt-4">
                                    New
                                    <span className="block italic">
                                        Collection
                                    </span>
                                </h3>

                                <button className="mt-6 text-sm border-b border-black">
                                    Discover More
                                </button>
                            </motion.div>

                        </div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;