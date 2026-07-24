import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaImage } from "react-icons/fa";

export default function Website() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [products, setProducts] = useState([]);

  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    description: "",
    products: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchHero();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/products",
      );

      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Hero Section
  const fetchHero = async () => {
    try {
      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/website/hero",
      );

      const data = await res.json();

      if (data) {
        setHeroData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          products: data.products || [],
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Select Hero Product
  const selectProduct = (index, product) => {
    const updated = [...heroData.products];

    updated[index] = product;

    setHeroData({
      ...heroData,
      products: updated,
    });
  };
  // Save Hero
  const saveHero = async () => {
    try {
      setSaving(true);

      const body = {
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        products: heroData.products.map((p) => p._id),
      };

      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/website/hero",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        throw new Error("Save Failed");
      }

      alert("Hero updated successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to update Hero.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <p className="uppercase tracking-[5px] text-sm text-gray-500">
          Website Manager
        </p>

        <h1 className="text-5xl font-light mt-3">Hero Section</h1>

        <p className="text-gray-500 mt-4 max-w-2xl">
          Select the products that appear on the homepage hero section. Product
          details are managed from the Products page.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaImage className="text-2xl text-gray-700" />

            <h2 className="text-2xl font-semibold">Hero Content</h2>
          </div>

          {/* Title */}

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Hero Title</label>

            <input
              type="text"
              value={heroData.title}
              onChange={(e) =>
                setHeroData({
                  ...heroData,
                  title: e.target.value,
                })
              }
              placeholder="Wear"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Subtitle */}

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Hero Subtitle
            </label>

            <input
              type="text"
              value={heroData.subtitle}
              onChange={(e) =>
                setHeroData({
                  ...heroData,
                  subtitle: e.target.value,
                })
              }
              placeholder="New Collection"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>

            <textarea
              rows={6}
              value={heroData.description}
              onChange={(e) =>
                setHeroData({
                  ...heroData,
                  description: e.target.value,
                })
              }
              placeholder="Timeless silhouettes..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:border-black"
            />
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaImage className="text-2xl text-gray-700" />

            <h2 className="text-2xl font-semibold">Select Hero Products</h2>
          </div>

          <div className="space-y-8">
            {/* Product 1 */}

            <div>
              <label className="block mb-3 font-medium">
                Main Hero Product
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3"
                value={heroData.products?.[0]?._id || ""}
                onChange={(e) => {
                  const product = products.find(
                    (item) => item._id === e.target.value,
                  );

                  selectProduct(0, product);
                }}
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {heroData.products?.[0] && (
                <div className="mt-4 flex items-center gap-4 border rounded-xl p-3">
                  <img
                    src={heroData.products[0].images?.[0]}
                    alt={heroData.products[0].name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {heroData.products[0].name}
                    </h3>

                    <p className="text-gray-500">
                      ₹{heroData.products[0].price}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Product 2 */}

            <div>
              <label className="block mb-3 font-medium">
                Second Hero Product
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3"
                value={heroData.products?.[1]?._id || ""}
                onChange={(e) => {
                  const product = products.find(
                    (item) => item._id === e.target.value,
                  );

                  selectProduct(1, product);
                }}
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {heroData.products?.[1] && (
                <div className="mt-4 flex items-center gap-4 border rounded-xl p-3">
                  <img
                    src={heroData.products[1].images?.[0]}
                    alt={heroData.products[1].name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {heroData.products[1].name}
                    </h3>

                    <p className="text-gray-500">
                      ₹{heroData.products[1].price}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={saveHero}
              disabled={saving}
              className="
    w-full
    bg-black
    text-white
    py-4
    rounded-xl
    hover:bg-gray-800
    transition
    flex
    items-center
    justify-center
    gap-3
    disabled:opacity-50
  "
            >
              <FaSave />
              {saving ? "Saving..." : "Save Hero Section"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
