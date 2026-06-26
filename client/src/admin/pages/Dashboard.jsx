import { useEffect, useState } from "react";
import {
    FaShoppingCart,
    FaBox,
    FaUsers,
    FaRupeeSign,
} from "react-icons/fa";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, usersRes, ordersRes] =
                    await Promise.all([
                        fetch(
                            "https://euphoria-ooqv.onrender.com/api/products"
                        ),
                        fetch(
                            "https://euphoria-ooqv.onrender.com/api/users"
                        ),
                        fetch(
                            "https://euphoria-ooqv.onrender.com/api/orders"
                        ),
                    ]);

                const productsData = await productsRes.json();
                const usersData = await usersRes.json();
                const ordersData = await ordersRes.json();

                setProducts(productsData);
                setUsers(usersData);
                setOrders(ordersData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.total || 0),
        0
    );

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-xl text-gray-500">
                    Loading Dashboard...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f8f8] p-4 md:p-8">

            {/* Header */}
            <div className="mb-10">
                <p className="uppercase tracking-[4px] text-gray-500 text-sm">
                    Euphoria Admin
                </p>

                <h1 className="text-4xl md:text-5xl font-light mt-2">
                    Dashboard
                </h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Orders
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {orders.length}
                            </h2>
                        </div>

                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
                            <FaShoppingCart />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Products
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {products.length}
                            </h2>
                        </div>

                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
                            <FaBox />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Users
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {users.length}
                            </h2>
                        </div>

                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
                            <FaUsers />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Revenue
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                ₹{totalRevenue}
                            </h2>
                        </div>

                        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
                            <FaRupeeSign />
                        </div>
                    </div>
                </div>

            </div>

            {/* Recent Orders */}
            <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        Recent Orders
                    </h2>
                </div>

                {orders.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        No orders found
                    </div>
                ) : (
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>
                                    <th className="text-left px-6 py-4">
                                        Customer
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Payment
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Total
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Status
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {orders
                                    .slice()
                                    .reverse()
                                    .slice(0, 8)
                                    .map((order) => (
                                        <tr
                                            key={order._id}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">
                                                {order.userEmail}
                                            </td>

                                            <td className="px-6 py-4">
                                                {order.paymentMethod}
                                            </td>

                                            <td className="px-6 py-4">
                                                ₹{order.total}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        text-xs
                                                        font-medium
                                                        ${order.status ===
                                                            "delivered"
                                                            ? "bg-green-100 text-green-700"
                                                            : order.status ===
                                                                "shipped"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }
                                                    `}
                                                >
                                                    {order.status}
                                                </span>

                                            </td>

                                        </tr>
                                    ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Dashboard;