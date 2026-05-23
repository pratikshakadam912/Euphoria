// Cart.jsx

import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const Cart = () => {

    const {
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

    // TOTAL ITEMS
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // TOTAL PRICE
    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen pt-24 px-4 sm:px-6 md:px-16 bg-[#f7f4f1]">

            <Navbar />

            {/* PAGE TITLE */}
            <div className="mb-8">

                <h1 className="text-2xl md:text-4xl font-light tracking-widest">
                    Your Cart
                </h1>

                <p className="text-gray-500 mt-2 text-sm">
                    {totalItems} item{totalItems > 1 && "s"} added
                </p>

            </div>

            {/* EMPTY CART */}
            {cart.length === 0 ? (

                <div className="flex flex-col items-center justify-center mt-20 text-center">

                    <p className="text-gray-500 text-base md:text-lg mb-6">
                        Your cart is currently empty
                    </p>

                    <Link
                        to="/collection"
                        className="
                            px-6 py-3
                            border border-black
                            text-sm tracking-widest uppercase
                            hover:bg-black hover:text-white
                            transition
                        "
                    >
                        Continue Shopping
                    </Link>

                </div>

            ) : (

                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10">

                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-6">

                        {cart.map((item) => (

                            <div
                                key={item.id}
                                className="
                                    flex items-center justify-between
                                    border-b border-gray-200
                                    pb-5
                                "
                            >

                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-4">

                                    {/* PRODUCT IMAGE */}
                                    <img
                                        src={
                                            item.images
                                                ? item.images[0]
                                                : item.image
                                        }
                                        alt={item.name}
                                        className="
                                            w-20 h-24
                                            sm:w-24 sm:h-32
                                            object-cover
                                            rounded-xl
                                        "
                                    />

                                    {/* PRODUCT INFO */}
                                    <div>

                                        {/* NAME */}
                                        <h3 className="text-base md:text-lg font-light">
                                            {item.name}
                                        </h3>

                                        {/* PRICE */}
                                        <p className="text-gray-500 text-sm mt-1">
                                            ₹{item.price}
                                        </p>

                                        {/* QUANTITY CONTROLS */}
                                        <div className="flex items-center gap-3 mt-4">

                                            {/* MINUS */}
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                                className="
                                                    w-8 h-8
                                                    rounded-full
                                                    border border-gray-300
                                                    hover:bg-black
                                                    hover:text-white
                                                    transition
                                                "
                                            >
                                                -
                                            </button>

                                            {/* QUANTITY */}
                                            <span className="text-sm font-medium min-w-[20px] text-center">
                                                {item.quantity}
                                            </span>

                                            {/* PLUS */}
                                            <button
                                                onClick={() =>
                                                    addToCart(item)
                                                }
                                                className="
                                                    w-8 h-8
                                                    rounded-full
                                                    border border-gray-300
                                                    hover:bg-black
                                                    hover:text-white
                                                    transition
                                                "
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                </div>

                                {/* RIGHT SIDE */}
                                <div className="text-right">

                                    {/* TOTAL */}
                                    <p className="text-base md:text-lg font-medium">
                                        ₹{item.price * item.quantity}
                                    </p>

                                    {/* REMOVE */}
                                    <button
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                        className="
                                            text-xs sm:text-sm
                                            text-gray-400
                                            hover:text-black
                                            transition
                                            mt-3
                                        "
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* ORDER SUMMARY */}
                    <div
                        className="
                            border
                            p-6 sm:p-8
                            h-fit
                            bg-white
                            rounded-3xl
                            shadow-sm
                        "
                    >

                        <h2 className="text-lg md:text-xl font-light mb-6 tracking-wide">
                            Order Summary
                        </h2>

                        {/* ITEMS */}
                        <div className="flex justify-between text-gray-600 mb-4">

                            <span>Items</span>

                            <span>{totalItems}</span>

                        </div>

                        {/* SUBTOTAL */}
                        <div className="flex justify-between text-gray-600 mb-4">

                            <span>Subtotal</span>

                            <span>₹{totalPrice}</span>

                        </div>

                        {/* SHIPPING */}
                        <div className="flex justify-between text-gray-600 mb-6">

                            <span>Shipping</span>

                            <span>Free</span>

                        </div>

                        {/* TOTAL */}
                        <div className="flex justify-between text-lg mb-8 font-medium">

                            <span>Total</span>

                            <span>₹{totalPrice}</span>

                        </div>

                        {/* CHECKOUT */}
                        <Link to="/checkout">

                            <button
                                className="
                                    w-full py-3
                                    bg-black text-white
                                    text-sm tracking-widest
                                    rounded-full
                                    hover:opacity-90
                                    transition
                                "
                            >
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