const ProductCard = ({ product, quantity, onIncrease, onDecrease, onAddToCart }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md">

            <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-lg"
            />

            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-3">
                <button
                    onClick={() => onDecrease(product.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    -
                </button>

                <span>{quantity}</span>

                <button
                    onClick={() => onIncrease(product.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    +
                </button>
            </div>

            {/* Add to Cart */}
            <button
                onClick={() => onAddToCart(product, quantity)} // 🔥 VERY IMPORTANT
                className="mt-4 w-full bg-black text-white py-2 rounded"
            >
                Add to Cart
            </button>

        </div>
    );
};

export default ProductCard;