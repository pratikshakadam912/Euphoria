import React, { useEffect, useState } from "react";

const categories = ["signature", "dresses", "co-ords", "limited-edition"];

const collections = ["summer", "winter", "new-arrival"];

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [imagePreview, setImagePreview] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    fabric: "",
    description: "",
    category: "",
    collection: "",
    stock: 0,
    featured: false,
    sizes: [],
    images: [],
  });

  // ===========================
  // Fetch Products
  // ===========================

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

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===========================
  // Input Change
  // ===========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===========================
  // Size Select
  // ===========================

  const toggleSize = (size) => {
    if (formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  // ===========================
  // Image Upload
  // ===========================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: files,
    });

    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreview(previews);
  };

  // ===========================
  // Remove Image
  // ===========================

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreview = [...imagePreview];

    newImages.splice(index, 1);
    newPreview.splice(index, 1);

    setFormData({
      ...formData,
      images: newImages,
    });

    setImagePreview(newPreview);
  };

  // ===========================
  // Submit Product
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("fabric", formData.fabric);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("collection", formData.collection);
      data.append("stock", formData.stock);
      data.append("featured", formData.featured);
      data.append("sizes", JSON.stringify(formData.sizes));

      formData.images.forEach((img) => {
        data.append("images", img);
      });

      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/products",
        {
          method: "POST",
          body: data,
        },
      );

      if (!res.ok) {
        throw new Error("Failed to Add Product");
      }

      alert("Product Added Successfully");

      setFormData({
        name: "",
        price: "",
        fabric: "",
        description: "",
        category: "",
        collection: "",
        stock: 0,
        featured: false,
        sizes: [],
        images: [],
      });

      setImagePreview([]);

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }

    setLoading(false);
  };

  // ===========================
  // Delete Product
  // ===========================

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`https://euphoria-ooqv.onrender.com/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // ===========================
  // Filter Products
  // ===========================

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      filterCategory === "all" ? true : product.category === filterCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#f6f3ef] px-6 lg:px-10 py-8">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-10">
        <div>
          <p className="uppercase tracking-[0.35em] text-xs text-gray-500">
            Euphoria Admin
          </p>

          <h1 className="text-4xl lg:text-5xl font-light mt-2">
            Product Management
          </h1>

          <p className="text-gray-500 mt-3">
            Add and manage your luxury fashion collections.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm px-6 py-5 border border-gray-100">
          <p className="text-sm text-gray-500">Total Products</p>

          <h2 className="text-4xl font-semibold mt-2">{products.length}</h2>
        </div>
      </div>

      {/* ================= FORM + PREVIEW ================= */}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ================= FORM ================= */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold mb-8">Add New Product</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            {/* Product Name */}

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              required
            />

            {/* Price */}

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              required
            />

            {/* Category */}

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              required
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Collection */}

            <select
              name="collection"
              value={formData.collection}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              required
            >
              <option value="">Select Collection</option>

              {collections.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Fabric */}

            <input
              type="text"
              name="fabric"
              placeholder="Fabric"
              value={formData.fabric}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            {/* Stock */}

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            {/* Description */}

            <textarea
              name="description"
              rows={5}
              placeholder="Product Description..."
              value={formData.description}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 md:col-span-2 resize-none"
            />

            {/* Sizes */}

            <div className="md:col-span-2">
              <p className="font-medium mb-3">Available Sizes</p>

              <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-5 py-2 rounded-full border transition

                  ${
                    formData.sizes.includes(size)
                      ? "bg-black text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />

              <label>Featured Product</label>
            </div>

            {/* Upload */}

            <div className="md:col-span-2">
              <label className="block mb-3 font-medium">Product Images</label>

              <label className="border-2 border-dashed rounded-2xl p-8 flex flex-col justify-center items-center cursor-pointer hover:border-black transition">
                <span className="text-4xl mb-3">📸</span>

                <p className="font-medium">Browse Images</p>

                <p className="text-gray-500 text-sm mt-1">
                  Upload multiple product images
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Preview Images */}

            {imagePreview.length > 0 && (
              <div className="md:col-span-2">
                <p className="font-medium mb-4">
                  Selected Images ({imagePreview.length})
                </p>

                <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreview.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt=""
                        className="rounded-xl h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-black text-white rounded-xl py-4 text-lg hover:bg-gray-900 transition"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </form>
        </div>

        {/* ================= LIVE PREVIEW ================= */}

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 h-fit sticky top-8">
          <h2 className="text-xl font-semibold mb-5">Live Preview</h2>

          {imagePreview.length > 0 ? (
            <img
              src={imagePreview[0]}
              alt=""
              className="rounded-2xl w-full h-[350px] object-cover"
            />
          ) : (
            <div className="h-[350px] rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
              No Image Selected
            </div>
          )}

          <div className="mt-5">
            <h3 className="text-2xl font-semibold">
              {formData.name || "Product Name"}
            </h3>

            <p className="mt-2 text-gray-500">{formData.fabric || "Fabric"}</p>

            <p className="mt-4 text-2xl font-bold">₹{formData.price || 0}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        {/* Top Bar */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold">All Products</h2>

            <p className="text-gray-500 mt-1">Manage your product catalog</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-4 py-3 w-64"
            />

            {/* Filter */}

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Table */}

        <div className="overflow-x-auto rounded-2xl border">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">Image</th>

                <th className="text-left px-6 py-4">Product</th>

                <th className="text-left px-6 py-4">Price</th>

                <th className="text-left px-6 py-4">Category</th>

                <th className="text-left px-6 py-4">Collection</th>

                <th className="text-left px-6 py-4">Stock</th>

                <th className="text-left px-6 py-4">Featured</th>

                <th className="text-center px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-16 text-gray-400">
                    No Products Found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Image */}

                    <td className="px-6 py-4">
                      {product.images?.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                          📷
                        </div>
                      )}
                    </td>

                    {/* Name */}

                    <td className="px-6 py-4">
                      <div className="font-semibold">{product.name}</div>

                      <div className="text-sm text-gray-500">
                        {product.fabric}
                      </div>
                    </td>

                    {/* Price */}

                    <td className="px-6 py-4 font-semibold">
                      ₹{product.price}
                    </td>

                    {/* Category */}

                    <td className="px-6 py-4 capitalize">{product.category}</td>

                    {/* Collection */}

                    <td className="px-6 py-4 capitalize">
                      {product.collection}
                    </td>

                    {/* Stock */}

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock} Left
                      </span>
                    </td>

                    {/* Featured */}

                    <td className="px-6 py-4">
                      {product.featured ? (
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                          Featured
                        </span>
                      ) : (
                        <span className="text-gray-400"></span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl">
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
