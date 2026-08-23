import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { FaCreditCard } from "react-icons/fa";
import { SiRazorpay, SiGooglepay, SiPaytm } from "react-icons/si";
import { MdDeliveryDining } from "react-icons/md";

const API_URL = "https://euphoria-ooqv.onrender.com";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, clearCart, subtotal } = useCart();

  // ==========================================
  // USER
  // ==========================================

  const [user, setUser] = useState(null);

  // ==========================================
  // ADDRESSES
  // ==========================================

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  // ==========================================
  // PAYMENT
  // ==========================================

  const [payment, setPayment] = useState("razorpay");

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);

  // ==========================================
  // NEW ADDRESS
  // ==========================================

  const [showAddressForm, setShowAddressForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    label: "home",
    fullName: "",
    email: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  // ==========================================
  // GET USER
  // ==========================================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please login first");

      navigate("/login");

      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error("User parsing error:", error);

      localStorage.removeItem("user");

      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // FETCH ADDRESSES
  // ==========================================

  useEffect(() => {
    if (!user?.uid) return;

    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/addresses/user/${user.uid}`);

        if (!res.ok) {
          throw new Error("Failed to load addresses");
        }

        const data = await res.json();

        setAddresses(data);

        // --------------------------------
        // SELECT DEFAULT ADDRESS
        // --------------------------------

        const defaultAddress = data.find((address) => address.isDefault);

        if (defaultAddress) {
          setSelectedAddress(defaultAddress._id);
        } else if (data.length > 0) {
          setSelectedAddress(data[0]._id);
        }
      } catch (error) {
        console.error("Address loading error:", error);
      }
    };

    fetchAddresses();
  }, [user]);

  // ==========================================
  // TOTAL
  // ==========================================

  const total = subtotal;

  // ==========================================
  // NEW ADDRESS INPUT
  // ==========================================

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE NEW ADDRESS
  // ==========================================

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/addresses`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...newAddress,

          userId: user.uid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Could not save address");

        return;
      }

      // --------------------------------
      // ADD TO ADDRESS LIST
      // --------------------------------

      const savedAddress = data.address;

      setAddresses((prev) => {
        if (savedAddress.isDefault) {
          return [
            savedAddress,

            ...prev.map((address) => ({
              ...address,
              isDefault: false,
            })),
          ];
        }

        return [savedAddress, ...prev];
      });

      // --------------------------------
      // SELECT NEW ADDRESS
      // --------------------------------

      setSelectedAddress(savedAddress._id);

      // --------------------------------
      // RESET FORM
      // --------------------------------

      setNewAddress({
        label: "home",
        fullName: "",
        email: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });

      setShowAddressForm(false);
    } catch (error) {
      console.error("Save address error:", error);

      alert("Something went wrong while saving address");
    }
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {
    if (!user?.uid) {
      alert("Please login first");

      navigate("/login");

      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");

      navigate("/cart");

      return;
    }

    if (!selectedAddress) {
      alert("Please select a shipping address");

      return;
    }

    const address = addresses.find((item) => item._id === selectedAddress);

    if (!address) {
      alert("Selected address could not be found");

      return;
    }

    try {
      setLoading(true);

      // ==================================
      // PAYMENT
      // ==================================

      let paymentId = null;

      let isPaid = false;

      // ----------------------------------
      // COD
      // ----------------------------------

      if (payment === "cod") {
        paymentId = null;

        isPaid = false;
      }

      // ----------------------------------
      // MOCK ONLINE PAYMENT
      // ----------------------------------
      else {
        alert("Processing payment...");

        await new Promise((resolve) => setTimeout(resolve, 1500));

        paymentId = "PAY_" + Date.now();

        isPaid = true;
      }

      // ==================================
      // FORMAT PRODUCTS
      // ==================================

      const products = cart.map((item) => ({
        productId: String(item.id || item._id),

        name: item.name,

        price: Number(item.price),

        quantity: Number(item.quantity || 1),

        image: item.image || "",

        size: item.size || null,

        color: item.color || null,

        variant: item.variant || null,
      }));

      // ==================================
      // CREATE ORDER
      // ==================================

      const res = await fetch(`${API_URL}/api/orders/create`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.uid,

          userEmail: user.email,

          products,

          total,

          shippingAddress: {
            fullName: address.fullName,

            email: address.email || user.email || "",

            phone: address.phone,

            addressLine: address.addressLine,

            city: address.city,

            state: address.state,

            postalCode: address.postalCode,

            country: address.country || "India",
          },

          paymentMethod: payment,

          paymentId,

          isPaid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order creation failed");
      }

      // ==================================
      // SUCCESS
      // ==================================

      clearCart();

      alert(
        payment === "cod"
          ? "Order placed successfully! 📦"
          : "Payment successful! 🎉",
      );

      // ==================================
      // GO TO ORDERS
      // ==================================

      navigate("/orders");
    } catch (error) {
      console.error("Place order error:", error);

      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-24 px-4 md:px-16 bg-[#f6f3ef]">
        <Navbar />

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-10">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* ================================= */}
          {/* LEFT */}
          {/* ================================= */}

          <div className="lg:col-span-2 space-y-8">
            {/* ================================= */}
            {/* SHIPPING ADDRESS */}
            {/* ================================= */}

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-light tracking-wide">
                  Shipping Address
                </h2>

                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="text-sm underline"
                >
                  {showAddressForm ? "Cancel" : "+ Add Address"}
                </button>
              </div>

              {/* ================================= */}
              {/* SAVED ADDRESSES */}
              {/* ================================= */}

              {!showAddressForm && (
                <div className="space-y-4">
                  {addresses.length === 0 ? (
                    <div className="border border-dashed rounded-lg p-6 text-center text-gray-500">
                      No saved addresses.
                      <br />
                      Add an address to continue.
                    </div>
                  ) : (
                    addresses.map((address) => (
                      <div
                        key={address._id}
                        onClick={() => setSelectedAddress(address._id)}
                        className={`border p-5 rounded-lg cursor-pointer transition ${
                          selectedAddress === address._id
                            ? "border-black bg-gray-50"
                            : "hover:border-gray-400"
                        }`}
                      >
                        <div className="flex justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="font-medium capitalize">
                                {address.label}
                              </p>

                              {address.isDefault && (
                                <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-2">{address.fullName}</p>

                            <p className="text-sm text-gray-500 mt-1">
                              {address.addressLine}
                            </p>

                            <p className="text-sm text-gray-500">
                              {address.city}, {address.state} -{" "}
                              {address.postalCode}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              {address.phone}
                            </p>
                          </div>

                          <input
                            type="radio"
                            checked={selectedAddress === address._id}
                            readOnly
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ================================= */}
              {/* NEW ADDRESS FORM */}
              {/* ================================= */}

              {showAddressForm && (
                <form
                  onSubmit={handleSaveAddress}
                  className="grid md:grid-cols-2 gap-5"
                >
                  <select
                    name="label"
                    value={newAddress.label}
                    onChange={handleAddressChange}
                    className="border p-3 rounded-md"
                  >
                    <option value="home">Home</option>

                    <option value="work">Work</option>

                    <option value="other">Other</option>
                  </select>

                  <input
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleAddressChange}
                    required
                    className="border p-3 rounded-md"
                    placeholder="Full Name"
                  />

                  <input
                    name="email"
                    type="email"
                    value={newAddress.email}
                    onChange={handleAddressChange}
                    className="border p-3 rounded-md"
                    placeholder="Email"
                  />

                  <input
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleAddressChange}
                    required
                    className="border p-3 rounded-md"
                    placeholder="Phone Number"
                  />

                  <input
                    name="addressLine"
                    value={newAddress.addressLine}
                    onChange={handleAddressChange}
                    required
                    className="border p-3 rounded-md md:col-span-2"
                    placeholder="Address"
                  />

                  <input
                    name="city"
                    value={newAddress.city}
                    onChange={handleAddressChange}
                    required
                    className="border p-3 rounded-md"
                    placeholder="City"
                  />

                  <input
                    name="state"
                    value={newAddress.state}
                    onChange={handleAddressChange}
                    required
                    className="border p-3 rounded-md"
                    placeholder="State"
                  />

                  <input
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleAddressChange}
                    required
                    className="border p-3 rounded-md"
                    placeholder="Postal Code"
                  />

                  <button
                    type="submit"
                    className="md:col-span-2 py-3 bg-black text-white rounded-md"
                  >
                    Save Address
                  </button>
                </form>
              )}
            </div>

            {/* ================================= */}
            {/* PAYMENT */}
            {/* ================================= */}

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-light mb-6 tracking-wide">
                Payment Method
              </h2>

              <div className="space-y-4">
                {/* RAZORPAY */}

                <div
                  onClick={() => setPayment("razorpay")}
                  className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition ${
                    payment === "razorpay"
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <SiRazorpay size={24} />

                    <div>
                      <p className="font-medium">Razorpay</p>

                      <p className="text-xs text-gray-500">
                        UPI, Cards, NetBanking
                      </p>
                    </div>
                  </div>

                  <input
                    type="radio"
                    checked={payment === "razorpay"}
                    readOnly
                  />
                </div>

                {/* UPI */}

                <div
                  onClick={() => setPayment("upi")}
                  className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition ${
                    payment === "upi"
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <SiGooglepay size={24} />

                    <SiPaytm size={24} />

                    <div>
                      <p className="font-medium">UPI Payment</p>

                      <p className="text-xs text-gray-500">
                        Google Pay / PhonePe / Paytm
                      </p>
                    </div>
                  </div>

                  <input type="radio" checked={payment === "upi"} readOnly />
                </div>

                {/* CARD */}

                <div
                  onClick={() => setPayment("card")}
                  className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition ${
                    payment === "card"
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }`}
                >
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

                <div
                  onClick={() => setPayment("cod")}
                  className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer transition ${
                    payment === "cod"
                      ? "border-black bg-gray-50"
                      : "hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <MdDeliveryDining size={24} />

                    <div>
                      <p className="font-medium">Cash on Delivery</p>

                      <p className="text-xs text-gray-500">
                        Pay when product arrives
                      </p>
                    </div>
                  </div>

                  <input type="radio" checked={payment === "cod"} readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================= */}

          <div className="bg-white p-8 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-light mb-6 tracking-wide">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex justify-between gap-4 text-gray-600"
                >
                  <span>
                    {item.name}

                    {" × "}

                    {item.quantity}
                  </span>

                  <span>
                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-gray-500 mb-3">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <div className="flex justify-between text-lg font-medium mb-6">
              <span>Total</span>

              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || !selectedAddress || cart.length === 0}
              className="w-full py-3 bg-black text-white rounded-md tracking-wide hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : payment === "cod"
                  ? "Place Order"
                  : "Pay Securely"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
