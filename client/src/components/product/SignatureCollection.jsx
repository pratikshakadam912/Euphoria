import { motion } from "framer-motion";
import ss1 from "../../assets/img/ss1.jpg";
import ss2 from "../../assets/img/ss2.jpg";
import ss3 from "../../assets/img/ss3.jpg";

const SignatureCollection = () => {
  return (
    <section className="bg-[#f7f4f1] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
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

        {/* PRODUCT SHOWCASE */}
        <div className="grid md:grid-cols-3 gap-16">

          {/* PRODUCT 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <img
                src={ss1}
                alt="Signature look 1"
                className="w-full h-[26rem] object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
          </motion.div>

          {/* PRODUCT 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <img
                src={ss2}
                alt="Signature look 2"
                className="w-full h-[26rem] object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
          </motion.div>

          {/* PRODUCT 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="overflow-hidden rounded-[2.5rem] shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <img
                src={ss3}
                alt="Signature look 3"
                className="w-full h-[26rem] object-cover group-hover:scale-110 transition duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
