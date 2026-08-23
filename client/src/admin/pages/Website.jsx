import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaImage } from "react-icons/fa";

const API = "https://euphoria-ooqv.onrender.com/api";

export default function Website() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [products, setProducts] = useState([]);

  // =========================================================
  // HERO
  // =========================================================

  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    description: "",
    products: [],
  });

  // =========================================================
  // CURATED
  // =========================================================

  const [curatedData, setCuratedData] = useState({
    products: [],
  });

  // =========================================================
  // SIGNATURE
  // =========================================================

  const [signatureData, setSignatureData] = useState({
    banner: "",
    products: [],
  });

  const [signatureBannerFile, setSignatureBannerFile] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState("");

  // =========================================================
  // EUPHORIA EDIT
  // =========================================================

  const [editData, setEditData] = useState({
    title: "",
    subtitle: "",
    products: [],
  });

  // =========================================================
  // FETCH ALL WEBSITE DATA
  // =========================================================

  const fetchWebsite = async () => {
    try {
      setLoading(true);

      const [websiteResponse, productsResponse] = await Promise.all([
        fetch(`${API}/website`),
        fetch(`${API}/products`),
      ]);

      if (!websiteResponse.ok) {
        throw new Error("Failed to fetch website sections");
      }

      if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
      }

      const sections = await websiteResponse.json();
      const productData = await productsResponse.json();

      setProducts(Array.isArray(productData) ? productData : []);

      // -------------------------------------------------------
      // Find sections
      // -------------------------------------------------------

      const hero = sections.find((section) => section.section === "hero");

      const curated = sections.find((section) => section.section === "curated");

      const signature = sections.find(
        (section) => section.section === "signature",
      );

      const edit = sections.find((section) => section.section === "edit");

      // -------------------------------------------------------
      // HERO
      // -------------------------------------------------------

      if (hero) {
        setHeroData({
          title: hero.title || "",
          subtitle: hero.subtitle || "",
          description: hero.description || "",
          products: hero.products || [],
        });
      } else {
        setHeroData({
          title: "",
          subtitle: "",
          description: "",
          products: [],
        });
      }

      // -------------------------------------------------------
      // CURATED
      // -------------------------------------------------------

      if (curated) {
        setCuratedData({
          products: curated.products || [],
        });
      } else {
        setCuratedData({
          products: [],
        });
      }

      // -------------------------------------------------------
      // SIGNATURE
      // -------------------------------------------------------

      if (signature) {
        setSignatureData({
          banner: signature.banner || "",
          products: signature.products || [],
        });
      } else {
        setSignatureData({
          banner: "",
          products: [],
        });
      }

      // -------------------------------------------------------
      // EDIT
      // -------------------------------------------------------

      if (edit) {
        setEditData({
          title: edit.title || "",
          subtitle: edit.subtitle || "",
          products: edit.products || [],
        });
      } else {
        setEditData({
          title: "",
          subtitle: "",
          products: [],
        });
      }
    } catch (error) {
      console.error("Fetch website error:", error);
      alert("Failed to load website data.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchWebsite();
  }, []);

  // =========================================================
  // HERO PRODUCT SELECT
  // =========================================================

  const selectProduct = (index, product) => {
    setHeroData((prev) => {
      const updated = [...prev.products];

      if (product) {
        updated[index] = product;
      } else {
        updated.splice(index, 1);
      }

      return {
        ...prev,
        products: updated,
      };
    });
  };

  // =========================================================
  // CURATED PRODUCT SELECT
  // =========================================================

  const selectCuratedProduct = (index, product) => {
    setCuratedData((prev) => {
      const updated = [...prev.products];

      if (product) {
        updated[index] = product;
      } else {
        updated.splice(index, 1);
      }

      return {
        ...prev,
        products: updated,
      };
    });
  };

  // =========================================================
  // SIGNATURE PRODUCT SELECT
  // =========================================================

  const selectSignatureProduct = (index, product) => {
    setSignatureData((prev) => {
      const updated = [...prev.products];

      if (product) {
        updated[index] = product;
      } else {
        updated.splice(index, 1);
      }

      return {
        ...prev,
        products: updated,
      };
    });
  };

  // =========================================================
  // EDIT PRODUCT SELECT
  // =========================================================

  const selectEditProduct = (index, product) => {
    setEditData((prev) => {
      const updated = [...prev.products];

      if (product) {
        updated[index] = product;
      } else {
        updated.splice(index, 1);
      }

      return {
        ...prev,
        products: updated,
      };
    });
  };

  // =========================================================
  // SAVE HERO
  // =========================================================

  const saveHero = async () => {
    try {
      setSaving(true);

      const body = {
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        products: heroData.products
          .filter(Boolean)
          .map((product) => product._id),
      };

      const res = await fetch(`${API}/website/hero`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to save Hero section");
      }

      alert("Hero updated successfully.");

      await fetchWebsite();
    } catch (error) {
      console.error("Save Hero error:", error);
      alert("Failed to update Hero.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // SAVE CURATED
  // =========================================================

  const saveCurated = async () => {
    try {
      setSaving(true);

      const body = {
        products: curatedData.products
          .filter(Boolean)
          .map((product) => product._id),
      };

      const res = await fetch(`${API}/website/curated`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to save Curated section");
      }

      alert("Curated section updated successfully.");

      await fetchWebsite();
    } catch (error) {
      console.error("Save Curated error:", error);
      alert("Failed to update Curated section.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // SIGNATURE BANNER PREVIEW
  // =========================================================

  const handleSignatureBannerChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setSignatureBannerFile(file);

    const previewUrl = URL.createObjectURL(file);

    setSignaturePreview(previewUrl);
  };

  // =========================================================
  // SAVE SIGNATURE
  // =========================================================

  const saveSignature = async () => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "products",
        JSON.stringify(
          signatureData.products.filter(Boolean).map((product) => product._id),
        ),
      );

      // Only send image when a new image is selected
      if (signatureBannerFile) {
        formData.append("images", signatureBannerFile);
      }

      // Keep existing banner if no new image selected
      if (!signatureBannerFile && signatureData.banner) {
        formData.append("banner", signatureData.banner);
      }

      const res = await fetch(`${API}/website/signature`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to save Signature section");
      }

      alert("Signature section updated successfully.");

      setSignatureBannerFile(null);
      setSignaturePreview("");

      await fetchWebsite();
    } catch (error) {
      console.error("Save Signature error:", error);
      alert("Failed to update Signature section.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // SAVE EUPHORIA EDIT
  // =========================================================

  const saveEdit = async () => {
    try {
      setSaving(true);

      const body = {
        title: editData.title,
        subtitle: editData.subtitle,
        products: editData.products
          .filter(Boolean)
          .map((product) => product._id),
      };

      const res = await fetch(`${API}/website/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to save Euphoria Edit");
      }

      alert("Euphoria Edit updated successfully.");

      await fetchWebsite();
    } catch (error) {
      console.error("Save Edit error:", error);
      alert("Failed to update Euphoria Edit.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-500">Loading website manager...</p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PRODUCT PREVIEW COMPONENT
  // =========================================================

  const ProductPreview = ({ product }) => {
    if (!product) return null;

    return (
      <div className="mt-4 flex items-center gap-4 border rounded-xl p-3">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        <div className="min-w-0">
          <h3 className="font-semibold truncate">{product.name}</h3>

          <p className="text-gray-500">₹{product.price}</p>
        </div>
      </div>
    );
  };

  // =========================================================
  // PRODUCT SELECT COMPONENT
  // =========================================================

  const ProductSelect = ({ label, index, selectedProduct, onChange }) => {
    return (
      <div>
        <label className="block mb-3 font-medium">{label}</label>

        <select
          className="w-full border rounded-xl px-4 py-3 bg-white"
          value={selectedProduct?._id || ""}
          onChange={(e) => {
            const product = products.find(
              (item) => item._id === e.target.value,
            );

            onChange(index, product);
          }}
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>

        <ProductPreview product={selectedProduct} />
      </div>
    );
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 lg:mb-12"
      >
        <p className="uppercase tracking-[5px] text-xs sm:text-sm text-gray-500">
          Website Manager
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-3">
          Homepage Management
        </h1>

        <p className="text-gray-500 mt-4 max-w-2xl">
          Manage your homepage content, products, collections, banners and
          Euphoria Edit from one place.
        </p>
      </motion.div>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Hero Content */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 sm:p-8"
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
                setHeroData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
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
                setHeroData((prev) => ({
                  ...prev,
                  subtitle: e.target.value,
                }))
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
                setHeroData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Timeless silhouettes..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:border-black"
            />
          </div>
        </motion.div>

        {/* Hero Products */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <FaImage className="text-2xl text-gray-700" />

            <h2 className="text-2xl font-semibold">Select Hero Products</h2>
          </div>

          <div className="space-y-8">
            <ProductSelect
              label="Main Hero Product"
              index={0}
              selectedProduct={heroData.products?.[0]}
              onChange={selectProduct}
            />

            <ProductSelect
              label="Second Hero Product"
              index={1}
              selectedProduct={heroData.products?.[1]}
              onChange={selectProduct}
            />

            <button
              onClick={saveHero}
              disabled={saving}
              className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <FaSave />

              {saving ? "Saving..." : "Save Hero Section"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          CURATED PRODUCTS
      ===================================================== */}

      <div className="mt-10 lg:mt-16 bg-white rounded-3xl shadow-sm border border-gray-200 p-5 sm:p-8">
        <div className="mb-8">
          <p className="uppercase tracking-[5px] text-xs sm:text-sm text-gray-500">
            Homepage
          </p>

          <h2 className="text-3xl font-light mt-2">Curated Products</h2>

          <p className="text-gray-500 mt-2">
            Choose four products for the Curated Essentials section.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[0, 1, 2, 3].map((index) => (
            <ProductSelect
              key={index}
              label={`Product ${index + 1}`}
              index={index}
              selectedProduct={curatedData.products?.[index]}
              onChange={selectCuratedProduct}
            />
          ))}
        </div>

        <button
          onClick={saveCurated}
          disabled={saving}
          className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Curated Section"}
        </button>

        {/* ===================================================
            SIGNATURE COLLECTION
        =================================================== */}

        <div className="mt-12 lg:mt-16 bg-gray-50 rounded-3xl border border-gray-200 p-5 sm:p-8">
          <h2 className="text-3xl font-semibold mb-8">Signature Collection</h2>

          {/* Banner */}

          <div className="mb-8">
            <label className="block mb-3 font-medium">Banner Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleSignatureBannerChange}
              className="w-full border rounded-xl p-3 bg-white"
            />

            {(signaturePreview || signatureData.banner) && (
              <img
                src={signaturePreview || signatureData.banner}
                alt="Signature banner"
                className="mt-4 w-full h-48 sm:h-64 object-cover rounded-2xl"
              />
            )}

            {!signaturePreview && !signatureData.banner && (
              <div className="mt-4 h-48 sm:h-64 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                No Banner Image
              </div>
            )}
          </div>

          {/* Signature Products */}

          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((index) => (
              <ProductSelect
                key={index}
                label={`Product ${index + 1}`}
                index={index}
                selectedProduct={signatureData.products?.[index]}
                onChange={selectSignatureProduct}
              />
            ))}
          </div>

          <button
            onClick={saveSignature}
            disabled={saving}
            className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Signature Section"}
          </button>

          {/* =================================================
              EUPHORIA EDIT
          ================================================= */}

          <div className="mt-12 lg:mt-16 bg-white rounded-3xl border border-gray-200 p-5 sm:p-8">
            <h2 className="text-3xl font-semibold mb-8">Euphoria Edit</h2>

            {/* Subtitle */}

            <div className="mb-6">
              <label className="block mb-2 font-medium">Subtitle</label>

              <input
                type="text"
                value={editData.subtitle}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            {/* Title */}

            <div className="mb-8">
              <label className="block mb-2 font-medium">Title</label>

              <textarea
                rows={3}
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full border rounded-xl px-4 py-3 resize-none"
              />
            </div>

            {/* Products */}

            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((index) => (
                <ProductSelect
                  key={index}
                  label={`Product ${index + 1}`}
                  index={index}
                  selectedProduct={editData.products?.[index]}
                  onChange={selectEditProduct}
                />
              ))}
            </div>

            <button
              onClick={saveEdit}
              disabled={saving}
              className="mt-8 w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Euphoria Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
