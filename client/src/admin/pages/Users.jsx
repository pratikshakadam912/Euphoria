import { useEffect, useState } from "react";
import { FaUsers, FaEnvelope, FaUser } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://euphoria-ooqv.onrender.com/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">

            {/* Header */}
            <div className="mb-8">
                <p className="text-sm uppercase tracking-[4px] text-gray-500">
                    Euphoria Admin
                </p>

                <h1 className="text-3xl md:text-5xl font-light text-black mt-2">
                    Users Management
                </h1>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 border border-gray-100">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-gray-500 text-sm">
                            Total Registered Users
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            {users.length}
                        </h2>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
                        <FaUsers size={26} />
                    </div>

                </div>

            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">

                <div className="px-6 py-5 border-b">
                    <h2 className="text-xl font-semibold">
                        All Users
                    </h2>
                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>
                                <th className="text-left px-6 py-4 text-gray-500 text-sm">
                                    User
                                </th>

                                <th className="text-left px-6 py-4 text-gray-500 text-sm">
                                    Email
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-4">

                                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                                                    <FaUser />
                                                </div>

                                                <div>
                                                    <h3 className="font-medium text-gray-800">
                                                        {user.name}
                                                    </h3>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-5">

                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaEnvelope />
                                                {user.email}
                                            </div>

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">

                {users.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 text-center text-gray-400">
                        No users found
                    </div>
                ) : (
                    users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
                        >

                            <div className="flex items-center gap-4 mb-4">

                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                                    <FaUser />
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {user.name}
                                    </h3>
                                </div>

                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <FaEnvelope />
                                {user.email}
                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default Users;