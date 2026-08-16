import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EuphoriaEdit = ({ editData }) => {
  const navigate = useNavigate();

  const products = editData?.products || [];

  // Don't render until the 3 products are available
  if (products.length < 3) {
    return null;
  }

  return (
    <section className="bg-[#f7f4f1] py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= SECTION HEADER ================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 max-w-xl"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-[#8b5e3c] mb-4">
            {editData?.subtitle || "The Euphoria Edit"}
          </p>

          <h2 className="text-5xl font-light text-black leading-tight whitespace-pre-line">
            {editData?.title || "A Study in Modern Elegance"}
          </h2>
        </motion.div>

        {/* ================= EDITORIAL LAYOUT ================= */}

        <div className="grid md:grid-cols-3 gap-16 items-start">
          {/* ================= PRODUCT 1 ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group mt-24 cursor-pointer"
            onClick={() => navigate(`/product/${products[0]?._id}`)}
          >
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-lg">
              <img
                src={products[0]?.images?.[0]}
                alt={products[0]?.name || "Product"}
                loading="lazy"
                className="
                  h-[22rem]
                  w-full
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-700
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/20
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              />
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">{products[0]?.name}</h3>

              <p className="text-gray-500 mt-1">₹{products[0]?.price}</p>
            </div>
          </motion.div>

          {/* ================= PRODUCT 2 ================= */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${products[1]?._id}`)}
          >
            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src={products[1]?.images?.[0]}
                alt={products[1]?.name || "Product"}
                loading="lazy"
                className="
                  h-[34rem]
                  w-full
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-700
                "
              />

              {/* TEXT OVERLAY */}

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs uppercase tracking-widest mb-2">
                  Featured Product
                </p>

                <h3 className="text-2xl font-light italic">
                  {products[1]?.name}
                </h3>

                <p className="mt-2">₹{products[1]?.price}</p>
              </div>
            </div>
          </motion.div>

          {/* ================= PRODUCT 3 ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group mt-40 cursor-pointer"
            onClick={() => navigate(`/product/${products[2]?._id}`)}
          >
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-lg">
              <img
                src={products[2]?.images?.[0]}
                alt={products[2]?.name || "Product"}
                loading="lazy"
                className="
                  h-[22rem]
                  w-full
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-700
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/20
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              />
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">{products[2]?.name}</h3>

              <p className="text-gray-500 mt-1">₹{products[2]?.price}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EuphoriaEdit;
