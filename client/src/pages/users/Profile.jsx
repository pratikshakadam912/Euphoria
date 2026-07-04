import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import useAuth from "../../hooks/useAuth";
import useUserProfile from "../../hooks/useUserProfile";

import Navbar from "../../components/common/Navbar";

import {
    FiArrowLeft,
    FiUser,
    FiMapPin,
    FiLogOut,
    FiEdit,
    FiPackage,
    FiCheckCircle,
} from "react-icons/fi";

const Profile = () => {
    const { user } = useAuth();
    const profile = useUserProfile(user);

    const handleLogout = async () => {
        await signOut(auth);
    };

    const currentOrder = {
        name: "Luxury Satin Dress",
        price: 2499,
        orderId: "#EP123456",
        status: "Packed",
    };

    const history = [
        {
            id: 1,
            name: "Ivory Grace Dress",
            price: 2499,
            status: "Delivered",
        },
        {
            id: 2,
            name: "Noir Silhouette",
            price: 1999,
            status: "Delivered",
        },
    ];

    const steps = [
        "Order Placed",
        "Payment Confirmed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];

    const activeStep = steps.indexOf(currentOrder.status);

    return (
        <div className="min-h-screen bg-[#f8f7f5]">
            <Navbar />

            <div className="max-w-6xl mx-auto px-5 lg:px-10 pt-28 pb-16">

                {/* Back */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
                >
                    <FiArrowLeft />
                    Back
                </Link>

                {/* Header */}
                <div className="mt-8 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div className="flex items-center gap-5">

                            <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-4xl font-light">
                                {profile?.email
                                    ? profile.email.charAt(0).toUpperCase()
                                    : <FiUser />}
                            </div>

                            <div>
                                <p className="uppercase tracking-[4px] text-xs text-gray-400">
                                    My Account
                                </p>

                                <h1 className="text-3xl font-light mt-2">
                                    {profile?.name || "Guest User"}
                                </h1>

                                <p className="text-gray-500 mt-2">
                                    {profile?.email}
                                </p>
                            </div>

                        </div>

                        <button
                            className="flex items-center gap-2 border px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
                        >
                            <FiEdit />
                            Edit Profile
                        </button>

                    </div>

                </div>

                {/* Current Order */}
                <div className="mt-8 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8">

                    <div className="flex items-center gap-3 mb-8">
                        <FiPackage className="text-2xl" />
                        <h2 className="text-2xl font-light">
                            Current Order
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">

                        <div>

                            <h3 className="text-2xl font-medium">
                                {currentOrder.name}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                {currentOrder.orderId}
                            </p>

                            <p className="text-3xl font-semibold mt-6">
                                ₹{currentOrder.price}
                            </p>

                            <span className="inline-block mt-6 bg-yellow-100 text-yellow-700 px-5 py-2 rounded-full">
                                {currentOrder.status}
                            </span>

                        </div>

                        <div>

                            <h3 className="font-semibold mb-6">
                                Order Tracking
                            </h3>

                            <div className="space-y-5">

                                {steps.map((step, index) => (

                                    <div
                                        key={step}
                                        className="flex items-center gap-4"
                                    >

                                        <div
                                            className={`w-9 h-9 rounded-full flex items-center justify-center
                                            ${index <= activeStep
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                                }`}
                                        >
                                            <FiCheckCircle />
                                        </div>

                                        <p
                                            className={`${index <= activeStep
                                                    ? "text-black font-medium"
                                                    : "text-gray-400"
                                                }`}
                                        >
                                            {step}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Order History */}
                <div className="mt-8 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8">

                    <h2 className="text-2xl font-light mb-8">
                        Order History
                    </h2>

                    <div className="space-y-5">

                        {history.map((item) => (

                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row justify-between md:items-center border rounded-2xl p-5 hover:shadow-md transition"
                            >

                                <div>

                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        ₹{item.price}
                                    </p>

                                </div>

                                <span className="mt-4 md:mt-0 bg-green-100 text-green-700 px-5 py-2 rounded-full">
                                    {item.status}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* Account */}
                <div className="mt-8 bg-white rounded-[30px] border border-gray-100 shadow-sm p-8">

                    <h2 className="text-2xl font-light mb-8">
                        Account
                    </h2>

                    <div className="space-y-4">

                        <button className="w-full flex justify-between items-center border rounded-2xl p-5 hover:bg-gray-50 transition">
                            <div className="flex items-center gap-3">
                                <FiMapPin />
                                Saved Address
                            </div>

                            <span>&gt;</span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full flex justify-between items-center border rounded-2xl p-5 text-red-500 hover:bg-red-50 transition"
                        >
                            <div className="flex items-center gap-3">
                                <FiLogOut />
                                Logout
                            </div>

                            <span>&gt;</span>
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;