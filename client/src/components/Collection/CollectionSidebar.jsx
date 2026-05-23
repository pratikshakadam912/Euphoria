import { useState } from "react";
import { Menu, X } from "lucide-react";

const CollectionSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* MOBILE FILTER BUTTON */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 border px-4 py-2 rounded-full"
                >
                    <Menu size={18} />
                    Filters
                </button>
            </div>

            {/* OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed lg:sticky top-0 lg:top-28 left-0
                    h-screen lg:h-auto
                    w-[280px]
                    bg-white
                    z-50
                    p-6
                    space-y-12
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* CLOSE BUTTON MOBILE */}
                <div className="flex justify-between items-center lg:hidden">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                {/* CATEGORY */}
                <div>
                    <h3 className="uppercase tracking-widest text-sm text-gray-500 mb-4">
                        Categories
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        {[
                            "All",
                            "Signature",
                            "Dresses",
                            "Co-ords",
                            "Limited Edition",
                        ].map((item) => (
                            <li
                                key={item}
                                className="cursor-pointer hover:text-black transition"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* PRICE */}
                <div>
                    <h3 className="uppercase tracking-widest text-sm text-gray-500 mb-4">
                        Price
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        <li className="cursor-pointer hover:text-black">
                            Below ₹999
                        </li>

                        <li className="cursor-pointer hover:text-black">
                            ₹1000 – ₹1999
                        </li>

                        <li className="cursor-pointer hover:text-black">
                            ₹2000+
                        </li>
                    </ul>
                </div>

                {/* SORT */}
                <div>
                    <h3 className="uppercase tracking-widest text-sm text-gray-500 mb-4">
                        Sort By
                    </h3>

                    <select className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none">
                        <option>Newest First</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>
            </aside>
        </>
    );
};

export default CollectionSidebar;