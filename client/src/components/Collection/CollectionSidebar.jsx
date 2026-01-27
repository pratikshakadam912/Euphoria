const CollectionSidebar = () => {
    return (
        <aside className="space-y-12 sticky top-28">

            {/* CATEGORY */}
            <div>
                <h3 className="uppercase tracking-widest text-sm text-gray-500 mb-4">
                    Categories
                </h3>
                <ul className="space-y-3 text-gray-700">
                    {["All", "Signature", "Dresses", "Co-ords", "Limited Edition"].map(
                        (item) => (
                            <li
                                key={item}
                                className="cursor-pointer hover:text-black transition"
                            >
                                {item}
                            </li>
                        )
                    )}
                </ul>
            </div>

            {/* PRICE */}
            <div>
                <h3 className="uppercase tracking-widest text-sm text-gray-500 mb-4">
                    Price
                </h3>
                <ul className="space-y-3 text-gray-700">
                    <li className="cursor-pointer hover:text-black">Below ₹999</li>
                    <li className="cursor-pointer hover:text-black">₹1000 – ₹1999</li>
                    <li className="cursor-pointer hover:text-black">₹2000+</li>
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
    );
};

export default CollectionSidebar;
