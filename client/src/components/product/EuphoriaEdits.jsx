import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EuphoriaEdit = () => {
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    title: "",
    subtitle: "",
    products: [],
  });

  useEffect(() => {
    const fetchEdit = async () => {
      try {
        const res = await fetch(
          "https://euphoria-ooqv.onrender.com/api/website/edit",
        );

        const data = await res.json();

        if (data) {
          setEditData({
            title: data.title || "",
            subtitle: data.subtitle || "",
            products: data.products || [],
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEdit();
  }, []);
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
            {editData.subtitle}
          </p>

          <h2 className="text-5xl font-light text-black leading-tight whitespace-pre-line">
            {editData.title}
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
                src={editData.products?.[0]?.images?.[0]}
                alt={editData.products?.[0]?.name}
                className="h-[22rem] w-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div
              onClick={() =>
                navigate(`/product/${editData.products?.[0]?._id}`)
              }
              className="mt-6 cursor-pointer"
            >
              <h3 className="text-xl font-semibold">
                {editData.products?.[0]?.name}
              </h3>

              <p className="text-gray-500">₹{editData.products?.[0]?.price}</p>
            </div>
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
                src={editData.products?.[1]?.images?.[0]}
                alt={editData.products?.[1]?.name}
                className="h-[34rem] w-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* TEXT OVERLAY */}
              <p className="text-xs uppercase tracking-widest mb-2">
                Featured Product
              </p>

              <h3 className="text-2xl font-light italic">
                {editData.products?.[1]?.name}
              </h3>

              <p className="mt-2">₹{editData.products?.[1]?.price}</p>
            </div>
            onClick={() => navigate(`/product/${editData.products?.[1]?._id}`)}
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
                src={editData.products?.[2]?.images?.[0]}
                alt={editData.products?.[2]?.name}
                className="h-[22rem] w-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
            </div>

            <div
              onClick={() =>
                navigate(`/product/${editData.products?.[2]?._id}`)
              }
              className="mt-6 cursor-pointer"
            >
              <h3 className="text-xl font-semibold">
                {editData.products?.[2]?.name}
              </h3>

              <p className="text-gray-500">₹{editData.products?.[2]?.price}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EuphoriaEdit;
