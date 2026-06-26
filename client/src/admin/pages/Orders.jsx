
import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        fetch("https://euphoria-ooqv.onrender.com/api/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        await fetch(
            `https://euphoria-ooqv.onrender.com/api/orders/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            }
        );

        fetchOrders();
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-100 text-green-700";
            case "shipped":
                return "bg-blue-100 text-blue-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Orders
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage customer orders
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 bg-white px-5 py-3 rounded-xl shadow-sm border">
                    <p className="text-sm text-gray-500">
                        Total Orders
                    </p>

                    <h2 className="text-2xl font-bold">
                        {orders.length}
                    </h2>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border overflow-hidden">

                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-4">Customer</th>
                            <th className="text-left p-4">Payment</th>
                            <th className="text-left p-4">Payment ID</th>
                            <th className="text-left p-4">Total</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-4">
                                    {order.userEmail}
                                </td>

                                <td className="p-4">
                                    {order.paymentMethod}
                                </td>

                                <td className="p-4">
                                    {order.paymentId || "N/A"}
                                </td>

                                <td className="p-4 font-semibold">
                                    ₹{order.total}
                                </td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                order._id,
                                                "shipped"
                                            )
                                        }
                                        className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        Ship
                                    </button>

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                order._id,
                                                "delivered"
                                            )
                                        }
                                        className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                                    >
                                        Deliver
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 lg:hidden">

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-2xl p-5 shadow-sm border"
                    >
                        <div className="flex justify-between items-start mb-4">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Customer
                                </p>

                                <h3 className="font-semibold break-all">
                                    {order.userEmail}
                                </h3>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-2 text-sm">

                            <p>
                                <strong>Payment:</strong>{" "}
                                {order.paymentMethod}
                            </p>

                            <p>
                                <strong>Payment ID:</strong>{" "}
                                {order.paymentId || "N/A"}
                            </p>

                            <p>
                                <strong>Total:</strong> ₹
                                {order.total}
                            </p>

                        </div>

                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={() =>
                                    updateStatus(
                                        order._id,
                                        "shipped"
                                    )
                                }
                                className="flex-1 py-2 rounded-xl bg-blue-600 text-white"
                            >
                                Ship
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        order._id,
                                        "delivered"
                                    )
                                }
                                className="flex-1 py-2 rounded-xl bg-green-600 text-white"
                            >
                                Deliver
                            </button>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );

};
export default Orders;

