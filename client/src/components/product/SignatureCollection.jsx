import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import ss1 from "../../assets/img/sc1.jpg";
import ss2 from "../../assets/img/sc2.jpg";
import ss3 from "../../assets/img/sc3.jpg";

const products = [
  {
    id: "dress-001",
    image: ss1,
    category: "dresses",
  },
  {
    id: "perfect-002",
    image: ss2,

    category: "signature",
  },
  {
    id: "noir-003",
    image: ss3,

    category: "co-ords",
  },
];

const SignatureCollection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f7f4f1] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-[#8b5e3c] mb-4">
            Signature Collection
          </p>

          <h2 className="text-5xl font-light text-black">
            Designed to Be Desired
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[26rem] object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <h3 className="mt-5 text-xl font-medium text-center">
                {product.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;