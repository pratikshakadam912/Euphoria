import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 md:px-16 bg-[#f7f4f1]">

            {/* PAGE TITLE */}
            <h1 className="text-2xl md:text-4xl font-light tracking-widest mb-8">
                Your Cart
            </h1>

            {/* EMPTY CART */}
            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center">

                    <p className="text-gray-500 text-base md:text-lg mb-6">
                        Your cart is currently empty
                    </p>

                    <Link
                        to="/collection"
                        className="px-6 py-3 border border-black text-sm tracking-widest uppercase hover:bg-black hover:text-white transition"
                    >
                        Continue Shopping
                    </Link>

                </div>
            ) : (

                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">

                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-6">

                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b pb-5"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-24 sm:w-24 sm:h-32 object-cover rounded"
                                    />

                                    <div>
                                        <h3 className="text-base md:text-lg font-light">
                                            {item.name}
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-1">
                                            ₹{item.price}
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="text-xs sm:text-sm text-gray-400 hover:text-black transition"
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="border p-6 sm:p-8 h-fit bg-white rounded-lg">

                        <h2 className="text-lg md:text-xl font-light mb-6 tracking-wide">
                            Order Summary
                        </h2>

                        <div className="flex justify-between text-gray-600 mb-4">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="flex justify-between text-gray-600 mb-6">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between text-lg mb-8">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>



                        <Link to="/checkout">
                            <button className="w-full py-3 bg-black text-white text-sm tracking-widest">
                                Checkout
                            </button>
                        </Link>
                    </div>

                </div>
            )}

        </div>
    );
};

export default Cart;