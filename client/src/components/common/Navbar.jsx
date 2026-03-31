import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useUserProfile from "../../hooks/useUserProfile";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import { FiUser } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
    const location = useLocation();
    const { cart } = useCart();
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collection", path: "/collection" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const { user } = useAuth();
    const profile = useUserProfile(user);

    const [open, setOpen] = useState(false);        // profile dropdown
    const [mobileOpen, setMobileOpen] = useState(false); // mobile menu

    const handleLogout = async () => {
        await signOut(auth);
        setOpen(false);
        setMobileOpen(false);
    };

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#f7f4f1]/80 border-b border-black/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* BRAND */}
                    <Link to="/" className="text-2xl tracking-widest font-light text-black">
                        EUPHORIA
                    </Link>

                    {/* DESKTOP MENU */}
                    <ul className="hidden md:flex gap-12 text-sm uppercase tracking-wider text-gray-700">
                        {navLinks.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.name} className="relative">
                                    <Link
                                        to={item.path}
                                        className={`transition hover:text-black ${isActive ? "text-black" : ""
                                            }`}
                                    >
                                        {item.name}
                                        <span
                                            className={`absolute left-0 -bottom-2 h-[1.5px] bg-black transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-5">

                        {/* CART ICON */}
                        <Link to="/cart" className="relative">
                            <FiShoppingBag size={22} />

                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        {/* PROFILE */}

                        {/* MOBILE MENU ICON */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileOpen(true)}
                        >
                            <HiOutlineMenuAlt3 size={26} />
                        </button>

                        {/* PROFILE */}
                        <div className="relative">
                            <div
                                onClick={() => setOpen(!open)}
                                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer select-none"
                            >
                                {user && profile?.email
                                    ? profile.email.charAt(0).toUpperCase()
                                    : <FiUser size={18} />}
                            </div>

                            {/* PROFILE DROPDOWN */}
                            {open && (
                                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border p-4 space-y-4">
                                    {user && profile ? (
                                        <>
                                            <p className="text-sm text-gray-600">Signed in as</p>
                                            <p className="font-medium text-black">
                                                {profile.name}
                                            </p>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full py-2 text-sm rounded-lg border hover:bg-black hover:text-white transition"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            to="/login"
                                            onClick={() => setOpen(false)}
                                            className="block text-center py-2 text-sm rounded-lg border hover:bg-black hover:text-white transition"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-[#f7f4f1] flex flex-col items-center justify-center space-y-8 text-lg uppercase tracking-wider">

                    <button
                        className="absolute top-6 right-6"
                        onClick={() => setMobileOpen(false)}
                    >
                        <HiX size={28} />
                    </button>

                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-800 hover:text-black transition"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {!user && (
                        <Link
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className="mt-4 px-6 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
                        >
                            Login
                        </Link>
                    )}

                    {user && (
                        <button
                            onClick={handleLogout}
                            className="mt-4 px-6 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;
