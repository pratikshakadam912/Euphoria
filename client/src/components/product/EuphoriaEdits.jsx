import { motion } from "framer-motion";
import ed1 from "../../assets/img/ed1.jpg";
import ed2 from "../../assets/img/ed2.jpg";
import ed3 from "../../assets/img/ed3.jpg";

const EuphoriaEdit = () => {
    return (
        <section className="bg-[#f7f4f1] py-32">
            <div className="max-w-7xl mx-auto px-6">

                {/* SECTION HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mb-20 max-w-xl"
                >
                    <p className="uppercase tracking-[0.35em] text-sm text-[#8b5e3c] mb-4">
                        The Euphoria Edit
                    </p>
                    <h2 className="text-5xl font-light text-black leading-tight">
                        A Study in
                        <span className="block italic">Modern Elegance</span>
                    </h2>
                </motion.div>

                {/* EDITORIAL LAYOUT */}
                <div className="grid md:grid-cols-3 gap-16 items-start">

                    {/* LEFT SMALL IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                        className="group mt-24"
                    >
                        <div className="relative overflow-hidden rounded-[2.5rem] shadow-lg">
                            <img
                                src={ed1}
                                alt="Editorial look"
                                className="h-[22rem] w-full object-cover group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                        </div>

                        <p className="mt-6 text-sm tracking-wide text-gray-700">
                            Fluid Silhouettes
                        </p>
                    </motion.div>

                    {/* CENTER HERO IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
                            <img
                                src={ed2}
                                alt="Hero fashion look"
                                className="h-[34rem] w-full object-cover group-hover:scale-105 transition duration-700"
                            />

                            {/* TEXT OVERLAY */}
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="text-xs uppercase tracking-widest mb-2">
                                    Featured Look
                                </p>
                                <h3 className="text-2xl font-light italic">
                                    Modern Muse
                                </h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT SMALL IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        viewport={{ once: true }}
                        className="group mt-40"
                    >
                        <div className="relative overflow-hidden rounded-[2.5rem] shadow-lg">
                            <img
                                src={ed3}
                                alt="Minimal look"
                                className="h-[22rem] w-full object-cover group-hover:scale-110 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                        </div>

                        <p className="mt-6 text-sm tracking-wide text-gray-700">
                            Quiet Luxury
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default EuphoriaEdit;
