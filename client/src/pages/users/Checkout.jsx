import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { FaCreditCard } from "react-icons/fa";
import { SiRazorpay, SiGooglepay, SiPaytm } from "react-icons/si";
import { MdDeliveryDining } from "react-icons/md";

const Checkout = () => {

    const { cart, clearCart } = useCart();
    const [payment, setPayment] = useState("razorpay");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // 🔥 PLACE ORDER FUNCTION
    const handlePlaceOrder = async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please login first");
            return;
        }

        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

        try {

            // 🧾 COD
            if (payment === "cod") {

                const res = await fetch("http://localhost:5000/api/orders/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: user.uid,
                        userEmail: user.email,
                        items: cart,
                        total: total,
                        paymentMethod: "cod",
                        status: "pending"
                    })
                });

                if (res.ok) {
                    alert("Order placed (COD) 📦");
                    clearCart();
                    window.location.href = "/";
                }

            }

            // 💳 MOCK PAYMENT
            else {

                alert("Processing Payment...");

                setTimeout(async () => {

                    const res = await fetch("http://localhost:5000/api/orders/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            userId: user.uid,
                            userEmail: user.email,
                            items: cart,
                            total: total,
                            paymentMethod: payment,
                            paymentId: "PAY_" + Date.now(),
                            status: "paid"
                        })
                    });

                    if (res.ok) {
                        alert("Payment Successful 🎉");
                        clearCart();
                        window.location.href = "/";
                    }

                }, 2000);
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };
    return (
        <>
            <div className="min-h-screen pt-24 px-4 md:px-16 bg-[#f6f3ef]">
                <Navbar />

                <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-10">
                    Secure Checkout
                </h1>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* LEFT SECTION */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* SHIPPING */}
                        <div className="bg-white p-8 rounded-xl shadow-sm">

                            <h2 className="text-xl font-light mb-6 tracking-wide">
                                Shipping Details
                            </h2>

                            <div className="grid md:grid-cols-2 gap-5">

                                <input className="border p-3 rounded-md outline-none focus:border-black" placeholder="First Name" />
                                <input className="border p-3 rounded-md outline-none focus:border-black" placeholder="Last Name" />
                                <input className="border p-3 rounded-md outline-none focus:border-black md:col-span-2" placeholder="Email" />
                                <input className="border p-3 rounded-md outline-none focus:border-black md:col-span-2" placeholder="Phone Number" />
                                <input className="border p-3 rounded-md outline-none focus:border-black md:col-span-2" placeholder="Address" />
                                <input className="border p-3 rounded-md outline-none focus:border-black" placeholder="City" />
                                <input className="border p-3 rounded-md outline-none focus:border-black" placeholder="Postal Code" />

                            </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="bg-white p-8 rounded-xl shadow-sm">

                            <h2 className="text-xl font-light mb-6 tracking-wide">
                                Payment Method
                            </h2>

                            <div className="space-y-4">

                                {/* Razorpay */}
                                <div onClick={() => setPayment("razorpay")}
                                    className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition
                                ${payment === "razorpay" ? "border-black bg-gray-50" : "hover:border-gray-400"}`}>
                                    <div className="flex items-center gap-4">
                                        <SiRazorpay size={24} />
                                        <div>
                                            <p className="font-medium">Razorpay</p>
                                            <p className="text-xs text-gray-500">UPI, Cards, NetBanking</p>
                                        </div>
                                    </div>
                                    <input type="radio" checked={payment === "razorpay"} readOnly />
                                </div>

                                {/* UPI */}
                                <div onClick={() => setPayment("upi")}
                                    className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition
                                ${payment === "upi" ? "border-black bg-gray-50" : "hover:border-gray-400"}`}>
                                    <div className="flex items-center gap-4">
                                        <SiGooglepay size={24} />
                                        <SiPaytm size={24} />
                                        <div>
                                            <p className="font-medium">UPI Payment</p>
                                            <p className="text-xs text-gray-500">Google Pay / PhonePe / Paytm</p>
                                        </div>
                                    </div>
                                    <input type="radio" checked={payment === "upi"} readOnly />
                                </div>

                                {/* Card */}
                                <div onClick={() => setPayment("card")}
                                    className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition
                                ${payment === "card" ? "border-black bg-gray-50" : "hover:border-gray-400"}`}>
                                    <div className="flex items-center gap-4">
                                        <FaCreditCard size={22} />
                                        <div>
                                            <p className="font-medium">Credit / Debit Card</p>
                                            <p className="text-xs text-gray-500">Visa, Mastercard</p>
                                        </div>
                                    </div>
                                    <input type="radio" checked={payment === "card"} readOnly />
                                </div>

                                {/* COD */}
                                <div onClick={() => setPayment("cod")}
                                    className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition
                                ${payment === "cod" ? "border-black bg-gray-50" : "hover:border-gray-400"}`}>
                                    <div className="flex items-center gap-4">
                                        <MdDeliveryDining size={24} />
                                        <div>
                                            <p className="font-medium">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500">Pay when product arrives</p>
                                        </div>
                                    </div>
                                    <input type="radio" checked={payment === "cod"} readOnly />
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="bg-white p-8 rounded-xl shadow-sm h-fit">

                        <h2 className="text-xl font-light mb-6 tracking-wide">
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between text-gray-600">
                                    <span>{item.name}</span>
                                    <span>₹{item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-gray-500 mb-3">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="flex justify-between text-lg font-medium mb-6">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        {/* 🔥 WORKING BUTTON */}
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full py-3 bg-black text-white rounded-md tracking-wide hover:opacity-90 transition"
                        >
                            Pay Securely
                        </button>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default Checkout;