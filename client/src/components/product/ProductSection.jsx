import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import noir01 from "../../assets/img/noir01.jpg"
import noir02 from "../../assets/img/noir02.jpg"
import noir03 from "../../assets/img/noir03.jpg"
import noir04 from "../../assets/img/noir04.jpg"

const products = [
  {
    id: "noir-001",
    name: "Classic outfit",
    image:[noir01],
  },
  {
    id: "noir-002",
    name: " noir dress",
    image:[noir02],
  },
  {
    id: "noir-003",
    name: "Comfort Sneakers",
    image:[noir03],
  },
  {
    id: "noir-004",
    name: "Luxury Collection",
    image:[noir04],
  },
];

export default function ProductSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#faf8f5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.35em] text-[#8b5e3c] text-sm">
            Euphoria Collection
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-light text-black">
            Curated Essentials
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Discover timeless pieces crafted with elegance and attention to detail.
          </p>
        </div>

        {/* Premium Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Large Card */}
          <motion.div
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/product/${products[0].id}`)}
            className="md:col-span-7 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-[40px]">
              <img
                src={products[0].image}
                alt={products[0].name}
                className="w-full h-[700px] object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-light">
                  {products[0].name}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="md:col-span-5 flex flex-col gap-6">

            <motion.div
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/product/${products[1].id}`)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-[32px]">
                <img
                  src={products[1].image}
                  alt={products[1].name}
                  className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-light">
                    {products[1].name}
                  </h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/product/${products[2].id}`)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-[32px]">
                <img
                  src={products[2].image}
                  alt={products[2].name}
                  className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-light">
                    {products[2].name}
                  </h3>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Bottom Banner */}
          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/product/${products[3].id}`)}
            className="md:col-span-12 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-[40px]">
              <img
                src={products[3].image}
                alt={products[3].name}
                className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="uppercase tracking-[0.4em] text-sm mb-4">
                    New Season
                  </p>

                  <h2 className="text-5xl md:text-6xl font-light">
                    Luxury Collection
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}