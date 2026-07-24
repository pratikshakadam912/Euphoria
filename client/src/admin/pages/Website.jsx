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
  const [curatedData, setCuratedData] = useState({
    products: [],
  });

  const [signatureData, setSignatureData] = useState({
    banner: "",
    products: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchHero();
    fetchCurated();
    fetchSignature();
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

  const fetchCurated = async () => {
    try {
      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/website/curated",
      );

      const data = await res.json();

      if (data) {
        setCuratedData({
          products: data.products || [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSignature = async () => {
    try {
      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/website/signature",
      );

      const data = await res.json();

      if (data) {
        setSignatureData({
          banner: data.banner || "",
          products: data.products || [],
        });
      }
    } catch (err) {
      console.log(err);
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

  //product section
  const selectCuratedProduct = (index, product) => {
    const updated = [...curatedData.products];

    updated[index] = product;

    setCuratedData({
      products: updated,
    });
  };

  const selectSignatureProduct = (index, product) => {
    const updated = [...signatureData.products];

    updated[index] = product;

    setSignatureData({
      ...signatureData,
      products: updated,
    });
  };

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

  const saveCurated = async () => {
    try {
      setSaving(true);

      const body = {
        products: curatedData.products.map((p) => p._id),
      };

      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/website/curated",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Curated section updated successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to update Curated section.");
    } finally {
      setSaving(false);
    }
  };

  const saveSignature = async () => {
    try {
      setSaving(true);

      const body = {
        banner: signatureData.banner,
        products: signatureData.products.map((p) => p._id),
      };

      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/website/signature",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Signature section updated successfully.");
    } catch (err) {
      console.log(err);
      alert("Failed to update Signature section.");
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
      <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <div className="mb-8">
          <p className="uppercase tracking-[5px] text-sm text-gray-500">
            Homepage
          </p>

          <h2 className="text-3xl font-light mt-2">Curated Products</h2>

          <p className="text-gray-500 mt-2">
            Choose four products for the Curated Essentials section.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <label className="block mb-3 font-medium">
                Product {index + 1}
              </label>

              <select
                className="w-full border rounded-xl px-4 py-3"
                value={curatedData.products?.[index]?._id || ""}
                onChange={(e) => {
                  const product = products.find(
                    (item) => item._id === e.target.value,
                  );

                  selectCuratedProduct(index, product);
                }}
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>

              {curatedData.products?.[index] && (
                <div className="mt-4 flex items-center gap-4 border rounded-xl p-3">
                  <img
                    src={curatedData.products[index].images?.[0]}
                    alt={curatedData.products[index].name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {curatedData.products[index].name}
                    </h3>

                    <p className="text-gray-500">
                      ₹{curatedData.products[index].price}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={saveCurated}
          disabled={saving}
          className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Curated Section"}
        </button>

        <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-semibold mb-8">Signature Collection</h2>

          {/* Banner */}

          <div className="mb-8">
            <label className="block mb-3 font-medium">Banner Image URL</label>

            <input
              type="text"
              value={signatureData.banner}
              onChange={(e) =>
                setSignatureData({
                  ...signatureData,
                  banner: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Paste banner image URL"
            />

            {signatureData.banner && (
              <img
                src={signatureData.banner}
                alt=""
                className="mt-4 w-full h-64 object-cover rounded-2xl"
              />
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label className="block mb-3 font-medium">
                  Product {index + 1}
                </label>

                <select
                  className="w-full border rounded-xl px-4 py-3"
                  value={signatureData.products?.[index]?._id || ""}
                  onChange={(e) => {
                    const product = products.find(
                      (item) => item._id === e.target.value,
                    );

                    selectSignatureProduct(index, product);
                  }}
                >
                  <option value="">Select Product</option>

                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>

                {signatureData.products?.[index] && (
                  <div className="mt-4 flex items-center gap-4 border rounded-xl p-3">
                    <img
                      src={signatureData.products[index].images?.[0]}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">
                        {signatureData.products[index].name}
                      </h3>

                      <p className="text-gray-500">
                        ₹{signatureData.products[index].price}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={saveSignature}
            disabled={saving}
            className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Signature Section"}
          </button>
        </div>
      </div>
    </div>
  );
}
