import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductSection() {
  const navigate = useNavigate();

  const [section, setSection] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await fetch(
          "https://euphoria-ooqv.onrender.com/api/website/curated",
        );

        const data = await res.json();

        setSection(data);
        setProducts(data?.products ?? []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSection();
  }, []);

  if (!section || products.length < 4) {
    return <section className="py-24 flex justify-center">Loading...</section>;
  }
  return (
    <section className="bg-[#faf8f5] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.35em] text-[#8b5e3c] text-sm">
            {section?.subtitle || "Euphoria Collection"}
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-light text-black">
            {section?.title || "Curated Essentials"}
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            {section?.description}
          </p>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Card */}

          <motion.div
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/product/${products[0]?._id}`)}
            className="md:col-span-7 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-[40px]">
              <img
                src={products[0]?.images?.[0]}
                className="w-full h-[700px] object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-light">
                  {products[0]?.name}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}

          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Product 2 */}

            <motion.div
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/product/${products[1]?._id}`)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-[32px]">
                <img
                  src={products[1]?.images?.[0]}
                  className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-light">
                    {products[1]?.name}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Product 3 */}

            <motion.div
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/product/${products[2]?._id}`)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-[32px]">
                <img
                  src={products[2]?.images?.[0]}
                  className="w-full h-[340px] object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-light">
                    {products[2]?.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Banner */}

          <motion.div
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/product/${products[3]?._id}`)}
            className="md:col-span-12 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-[40px]">
              <img
                src={products[3]?.images?.[0]}
                className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="uppercase tracking-[0.4em] text-sm mb-4">
                    New Season
                  </p>

                  <h2 className="text-5xl md:text-6xl font-light">
                    {products[3]?.name}
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
