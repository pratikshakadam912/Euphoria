import { FaShoppingCart, FaBox, FaUsers } from "react-icons/fa";

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* Header */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-gray-500 text-sm">Total Orders</h2>
                            <p className="text-3xl font-bold text-gray-800">120</p>
                        </div>
                        <FaShoppingCart className="text-blue-500 text-3xl" />
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-gray-500 text-sm">Products</h2>
                            <p className="text-3xl font-bold text-gray-800">45</p>
                        </div>
                        <FaBox className="text-green-500 text-3xl" />
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-gray-500 text-sm">Users</h2>
                            <p className="text-3xl font-bold text-gray-800">300</p>
                        </div>
                        <FaUsers className="text-purple-500 text-3xl" />
                    </div>
                </div>

            </div>

            {/* Charts + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* Chart Section (placeholder) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>

                    <div className="h-64 flex items-center justify-center text-gray-400">
                        📊 Chart will go here (Recharts)
                    </div>
                </div>

                {/* Activity */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

                    <ul className="space-y-4 text-sm text-gray-600">
                        <li>✅ New order placed</li>
                        <li>📦 Product added</li>
                        <li>👤 New user registered</li>
                        <li>💰 Payment received</li>
                    </ul>
                </div>

            </div>

            {/* Recent Orders Table */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="border-b text-gray-500 text-sm">
                                <th className="py-2">Customer</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-700">

                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3">Pratiksha</td>
                                <td>Dress</td>
                                <td>
                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                        Delivered
                                    </span>
                                </td>
                                <td>22 Mar 2026</td>
                            </tr>

                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3">Rahul</td>
                                <td>Shoes</td>
                                <td>
                                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                                        Pending
                                    </span>
                                </td>
                                <td>21 Mar 2026</td>
                            </tr>

                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3">Anjali</td>
                                <td>Bag</td>
                                <td>
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                                        Cancelled
                                    </span>
                                </td>
                                <td>20 Mar 2026</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default Dashboard;