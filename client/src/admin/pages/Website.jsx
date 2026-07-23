import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaImages,
  FaMagic,
  FaGem,
  FaPalette,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";

const API = "https://euphoria-ooqv.onrender.com/api";

const sections = [
  {
    id: "hero",
    title: "Hero Section",
    description: "Manage homepage hero banners, products and buttons.",
    icon: <FaImages />,
    color: "from-violet-500 to-fuchsia-500",
    items: "2 Featured Products",
  },
  {
    id: "curated",
    title: "Curated Essentials",
    description: "Luxury product showcase.",
    icon: <FaMagic />,
    color: "from-blue-500 to-cyan-500",
    items: "4 Products",
  },
  {
    id: "signature",
    title: "Signature Collection",
    description: "Signature banner & featured products.",
    icon: <FaGem />,
    color: "from-amber-500 to-orange-500",
    items: "Banner + Products",
  },
  {
    id: "edit",
    title: "Euphoria Edit",
    description: "Editorial campaign images.",
    icon: <FaPalette />,
    color: "from-pink-500 to-rose-500",
    items: "Gallery",
  },
];

const Website = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",

    buttonOne: {
      text: "",
      link: "",
    },

    buttonTwo: {
      text: "",
      link: "",
    },

    products: [],

    images: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      fetchSection(selectedSection.id);
    }
  }, [selectedSection]);

  // ===============================
  // Fetch Products
  // ===============================

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // Fetch Existing Homepage Section
  // ===============================

  const fetchSection = async (section) => {
    try {
      const res = await fetch(`${API}/website/${section}`);

      const data = await res.json();

      if (!data) return;

      setFormData({
        title: data.title || "",

        subtitle: data.subtitle || "",

        description: data.description || "",

        buttonOne: data.buttonOne || {
          text: "",
          link: "",
        },

        buttonTwo: data.buttonTwo || {
          text: "",
          link: "",
        },

        products: data.products?.map((p) => p._id) || [],

        images: [],
      });

      setImagePreview(data.images || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // Input Change
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Image Upload
  // ===============================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: files,
    }));

    const preview = files.map((file) => URL.createObjectURL(file));

    setImagePreview(preview);
  };

  // ===============================
  // Remove Image
  // ===============================

  const removeImage = (index) => {
    const imgs = [...formData.images];
    imgs.splice(index, 1);

    const preview = [...imagePreview];
    preview.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      images: imgs,
    }));

    setImagePreview(preview);
  };

  // ===============================
  // Save Homepage Section
  // ===============================

  const saveSection = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);

      data.append("subtitle", formData.subtitle);

      data.append("description", formData.description);

      data.append("buttonOne", JSON.stringify(formData.buttonOne));

      data.append("buttonTwo", JSON.stringify(formData.buttonTwo));

      data.append("products", JSON.stringify(formData.products));

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      const res = await fetch(`${API}/website/${selectedSection.id}`, {
        method: "PUT",
        body: data,
      });

      if (!res.ok) {
        throw new Error("Failed to Save");
      }

      alert("Homepage Updated Successfully");

      setSelectedSection(null);
    } catch (err) {
      console.log(err);

      alert(err.message);
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-[#f6f3ef] p-8">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-12">
        <div>
          <p className="uppercase tracking-[0.4em] text-xs text-gray-500">
            Euphoria Admin
          </p>

          <h1 className="text-5xl font-light mt-3">Homepage Manager</h1>

          <p className="text-gray-500 mt-4 max-w-2xl">
            Customize every homepage section, banners, featured products,
            editorial images and luxury collections without touching code.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-6">
          <p className="text-sm text-gray-500">Homepage Sections</p>

          <h2 className="text-4xl font-semibold mt-2">{sections.length}</h2>
        </div>
      </div>

      {/* ================= CARDS ================= */}

      <div className="grid lg:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -6,
            }}
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              border
              border-gray-100
              shadow-lg
            "
          >
            {/* Top Gradient */}

            <div className={`h-2 bg-gradient-to-r ${section.color}`} />

            <div className="p-8">
              <div className="flex justify-between">
                <div>
                  <div
                    className={`
                      w-16
                      h-16
                      rounded-2xl
                      bg-gradient-to-r
                      ${section.color}
                      flex
                      items-center
                      justify-center
                      text-white
                      text-2xl
                    `}
                  >
                    {section.icon}
                  </div>

                  <h2 className="text-2xl font-semibold mt-6">
                    {section.title}
                  </h2>

                  <p className="text-gray-500 leading-7 mt-3">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-10">
                <span className="bg-gray-100 rounded-full px-5 py-2 text-sm">
                  {section.items}
                </span>

                <button
                  onClick={() => setSelectedSection(section)}
                  className="
                    flex
                    items-center
                    gap-3
                    bg-black
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    hover:bg-gray-900
                    transition
                  "
                >
                  Edit Section
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}

      <AnimatePresence>
        {selectedSection && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              bg-black/60
              z-50
              flex
              items-center
              justify-center
              p-5
            "
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="
bg-white
rounded-3xl
shadow-2xl
w-full
max-w-6xl
h-[90vh]
flex
flex-col
"
            >
              {/* ================= MODAL HEADER ================= */}

              <div className="flex justify-between items-center border-b p-8">
                <div>
                  <h2 className="text-3xl font-semibold">
                    {selectedSection.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {selectedSection.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSection(null)}
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-gray-100
                    hover:bg-red-500
                    hover:text-white
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaTimes />
                </button>
              </div>

              {/* ================= MODAL BODY ================= */}

              <div
                className="flex-1 overflow-y-auto p-8 grid lg:grid-cols-2gap-8
                   "
              >
                {/* ================= LEFT SIDE ================= */}

                <div className="space-y-6">
                  {/* Title */}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Section Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter title"
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  {/* Subtitle */}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subtitle
                    </label>

                    <textarea
                      rows={3}
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      placeholder="Enter subtitle"
                      className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  {/* Description */}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                      className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>

                  {/* Hero Buttons */}

                  {selectedSection.id === "hero" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Button One Text
                        </label>

                        <input
                          type="text"
                          value={formData.buttonOne.text}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buttonOne: {
                                ...formData.buttonOne,
                                text: e.target.value,
                              },
                            })
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Button One Link
                        </label>

                        <input
                          type="text"
                          value={formData.buttonOne.link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buttonOne: {
                                ...formData.buttonOne,
                                link: e.target.value,
                              },
                            })
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Button Two Text
                        </label>

                        <input
                          type="text"
                          value={formData.buttonTwo.text}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buttonTwo: {
                                ...formData.buttonTwo,
                                text: e.target.value,
                              },
                            })
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Button Two Link
                        </label>

                        <input
                          type="text"
                          value={formData.buttonTwo.link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              buttonTwo: {
                                ...formData.buttonTwo,
                                link: e.target.value,
                              },
                            })
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>
                    </>
                  )}

                  {/* Product Selection */}

                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Featured Products
                    </label>

                    <select
                      multiple
                      value={formData.products}
                      onChange={(e) => {
                        const selected = [...e.target.selectedOptions].map(
                          (option) => option.value,
                        );

                        setFormData({
                          ...formData,
                          products: selected,
                        });
                      }}
                      className="w-full border rounded-xl p-4 h-64"
                    >
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Upload Images
                    </label>

                    <label
                      className="
        border-2
        border-dashed
        rounded-2xl
        h-56
        flex
        flex-col
        justify-center
        items-center
        cursor-pointer
        hover:border-black
        transition
      "
                    >
                      <span className="text-5xl">📸</span>

                      <p className="mt-4 font-semibold">Click To Upload</p>

                      <p className="text-gray-500 text-sm mt-2">
                        Multiple Images Supported
                      </p>

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {imagePreview.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-4">Image Preview</h3>

                      <div className="grid grid-cols-3 gap-4">
                        {imagePreview.map((img, index) => (
                          <div key={index} className="relative">
                            <img
                              src={img}
                              alt=""
                              className="
                h-32
                w-full
                rounded-xl
                object-cover
              "
                            />

                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="
                absolute
                top-2
                right-2
                bg-red-500
                text-white
                rounded-full
                w-7
                h-7
              "
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Save Button */}

                  <button
                    onClick={saveSection}
                    disabled={loading}
                    className="
                  w-full
                  bg-black
                  text-white
                  rounded-xl
                  py-4
                  text-lg
                  hover:bg-gray-900
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
                  >
                    {loading ? "Saving..." : "Save Homepage"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Website;
