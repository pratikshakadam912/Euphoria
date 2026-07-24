import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(
          "https://euphoria-ooqv.onrender.com/api/website/hero",
        );

        const data = await res.json();

        setHeroData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#f8f5f1]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 uppercase tracking-[4px] text-xs text-gray-500">
            Loading Hero...
          </p>
        </div>
      </section>
    );
  }

  const heroProducts = heroData?.products || [];

  const mainProduct = heroProducts[0];
  const secondProduct = heroProducts[1];

  return (
    <section className="bg-[#f8f5f1] min-h-screen overflow-hidden pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <p className="uppercase tracking-[0.45em] text-[#8b5e3c] text-sm mb-6">
              {heroData?.subtitle || "New Collection"}
            </p>

            <h1 className="text-6xl md:text-7xl xl:text-8xl font-light leading-[0.9] text-black">
              {heroData?.title || "Wear"}

              <span className="block italic font-medium">Euphoria</span>
            </h1>

            <p className="mt-8 text-gray-600 max-w-lg text-lg leading-relaxed">
              {heroData?.description ||
                "Timeless silhouettes, modern tailoring, and elevated essentials crafted for everyday elegance."}
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
                <h3 className="text-3xl font-semibold">Premium</h3>

                <p className="text-gray-500 text-sm mt-1">Curated Collection</p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold">Luxury</h3>

                <p className="text-gray-500 text-sm mt-1">Everyday Fashion</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#8b5e3c]/10 blur-[120px]" />

            {/* MAIN PRODUCT */}

            <motion.div
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                },
              }}
              onClick={() =>
                mainProduct && navigate(`/product/${mainProduct._id}`)
              }
              className="cursor-pointer"
            >
              <img
                src={mainProduct?.images?.[0]?.url}
                alt={mainProduct?.name}
                className="w-full h-[620px] object-cover rounded-[40px] shadow-2xl"
              />
            </motion.div>

            {/* Bottom Cards */}

            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* SECOND PRODUCT */}

              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                onClick={() =>
                  secondProduct && navigate(`/product/${secondProduct._id}`)
                }
                className="cursor-pointer"
              >
                <img
                  src={secondProduct?.images?.[0]?.url}
                  alt={secondProduct?.name}
                  className="h-60 w-full object-cover rounded-[28px] shadow-lg"
                />
              </motion.div>

              {/* STATIC EXPLORE CARD */}

              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                onClick={() => navigate("/collection")}
                className="
                  cursor-pointer
                  bg-white
                  rounded-[28px]
                  shadow-lg
                  flex
                  flex-col
                  justify-center
                  items-center
                  p-8
                "
              >
                <span className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  Explore
                </span>

                <h3 className="text-3xl font-light text-center mt-4">
                  New
                  <span className="block italic">Collection</span>
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

export default Hero;
