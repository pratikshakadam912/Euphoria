import React, { useEffect, useState } from "react";

const Product = () => {
    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
    });

    // 🔄 Fetch Products
    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/products");
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
            await fetch("http://localhost:5000/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setFormData({
                name: "",
                price: "",
                description: "",
                category: "",
                stock: "",
                image: "",
            });

            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    // ❌ Delete Product
    const deleteProduct = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: "DELETE",
            });
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Product Management
            </h1>

            {/* Form + Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Form */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Add Product</h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border p-2 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={handleChange}
                            className="border p-2 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                    {formData.image ? (
                        <img
                            src={formData.image}
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
                                <th>Stock</th>
                                <th>Action</th>
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
                                            {p.image && (
                                                <img
                                                    src={p.image}
                                                    alt=""
                                                    className="h-12 w-12 object-cover rounded"
                                                />
                                            )}
                                        </td>

                                        <td>{p.name}</td>
                                        <td>₹{p.price}</td>
                                        <td>{p.category}</td>
                                        <td>
                                            <span className={`px-2 py-1 rounded text-sm ${p.stock > 0
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                }`}>
                                                {p.stock}
                                            </span>
                                        </td>

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