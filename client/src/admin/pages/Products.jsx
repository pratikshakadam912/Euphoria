import React, { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    fabric: "",
    description: "",
    category: "",
    collection: "",
    sizes: "",
    images: "",
  });

  // 🔄 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://euphoria-ooqv.onrender.com/api/products",
      );
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 📝 Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ➕ Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("https://euphoria-ooqv.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          sizes: formData.sizes.split(",").map((size) => size.trim()),
          images: formData.images.split(",").map((img) => img.trim()),
        }),
      });

      setFormData({
        name: "",
        price: "",
        fabric: "",
        description: "",
        category: "",
        collection: "",
        sizes: "",
        images: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Delete Product
  const deleteProduct = async (id) => {
    try {
      await fetch(`https://euphoria-ooqv.onrender.com/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] p-8">
      {/* Header */}
      <div className="mb-10">
        <p className="uppercase tracking-[0.35em] text-sm text-gray-500">
          Admin Dashboard
        </p>

        <h1 className="text-5xl font-light mt-2">Product Management</h1>

        <p className="text-gray-500 mt-3">
          Add, organize and manage your luxury collections.
        </p>
      </div>

      {/* Form + Preview */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Form */}

        <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-medium mb-8">Add New Product</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Category</option>
              <option value="signature">Signature</option>
              <option value="dresses">Dresses</option>
              <option value="co-ords">Co-ords</option>
              <option value="limited-edition">Limited Edition</option>
            </select>

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setFormData({
                  ...formData,
                  images: e.target.files,
                })
              }
            />

            <input
              type="text"
              name="fabric"
              placeholder="Fabric"
              value={formData.fabric}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              type="text"
              name="collection"
              placeholder="Collection"
              value={formData.collection}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              name="sizes"
              placeholder="S,M,L,XL"
              value={formData.sizes}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Image Preview */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>

          {formData.images ? (
            <img
              src={formData.images.split(",")[0]}
              alt="preview"
              className="h-40 object-contain rounded"
            />
          ) : (
            <p className="text-gray-400">Image preview will appear here</p>
          )}
        </div>
      </div>

      {/* Product Table */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">All Products</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-2">Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Fabric</th>
                <th>Action</th>
                <th>Collection</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      {p.images?.length > 0 && (
                        <img
                          src={p.images[0]}
                          alt=""
                          className="h-12 w-12 object-cover rounded"
                        />
                      )}
                    </td>

                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.category}</td>
                    <td>{p.fabric}</td>
                    <td>{p.collection}</td>

                    <td>
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
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
