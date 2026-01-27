import { motion } from "framer-motion";
import hero1 from "../../assets/img/hero1.jpg";
import hero2 from "../../assets/img/hero2.jpg";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
    return (
        <section className="min-h-screen pt-36 bg-[#f7f4f1] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 1.1, ease: "easeOut" }}
                >
                    <p className="text-sm tracking-[0.3em] text-[#8b5e3c] mb-6 uppercase">
                        Fashion Redefined
                    </p>

                    <h1 className="text-6xl font-light leading-tight text-black">
                        Wear Your
                        <span className="block font-medium italic">Euphoria</span>
                    </h1>

                    <p className="mt-6 text-gray-600 max-w-md leading-relaxed">
                        Curated fashion pieces designed to elevate your confidence,
                        elegance, and individuality.
                    </p>

                    <div className="mt-10 flex gap-5">
                        <button className="px-10 py-3 rounded-full bg-black text-white hover:bg-[#8b5e3c] transition-all duration-300">
                            Shop Collection
                        </button>

                        <button className="px-10 py-3 rounded-full border border-black hover:bg-black hover:text-white transition-all duration-300">
                            View Lookbook
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT IMAGES */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4 }}
                    className="relative flex gap-10 justify-center"
                >
                    {/* IMAGE 1 */}
                    <div className="group rounded-[2.8rem] overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500">
                        <img
                            src={hero1}
                            alt="Euphoria fashion"
                            className="w-72 h-[28rem] object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition"></div>
                    </div>

                    {/* IMAGE 2 */}
                    <div className="mt-24 group rounded-[2.8rem] overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500">
                        <img
                            src={hero2}
                            alt="Luxury wear"
                            className="w-72 h-[28rem] object-cover group-hover:scale-110 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition"></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
