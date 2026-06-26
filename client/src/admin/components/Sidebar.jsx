import {
    FaHome,
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaImages,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ mobile = false }) => {
    const location = useLocation();

    const menus = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaHome />,
        },
        {
            name: "Products",
            path: "/admin/products",
            icon: <FaBox />,
        },
        {
            name: "Orders",
            path: "/admin/orders",
            icon: <FaShoppingBag />,
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <FaUsers />,
        },
        {
            name: "Homepage",
            path: "/admin/homepage",
            icon: <FaImages />,
        },
    ];

    // Mobile Bottom Navigation
    if (mobile) {
        return (
            <div className="bg-white border-t shadow-lg">
                <div className="grid grid-cols-5">

                    {menus.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                flex flex-col items-center
                                py-3 text-xs transition
                                ${location.pathname === item.path
                                    ? "text-black"
                                    : "text-gray-400"
                                }
                            `}
                        >
                            <span className="text-lg mb-1">
                                {item.icon}
                            </span>

                            {item.name}
                        </Link>
                    ))}

                </div>
            </div>
        );
    }

    // Desktop Sidebar
    return (
        <aside
            className="
                fixed left-0 top-0
                h-screen w-72
                bg-white
                border-r
                border-gray-200
                shadow-sm
                p-6
            "
        >
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-black">
                    Euphoria
                </h1>

                <p className="text-gray-400 text-sm">
                    Admin Panel
                </p>
            </div>

            <nav className="space-y-3">

                {menus.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
                            flex items-center gap-4
                            px-4 py-3
                            rounded-xl
                            transition-all
                            duration-300
                            ${location.pathname === item.path
                                ? "bg-black text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }
                        `}
                    >
                        <span className="text-lg">
                            {item.icon}
                        </span>

                        <span>{item.name}</span>
                    </Link>
                ))}

            </nav>
        </aside>
    );
};

export default Sidebar;