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

  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(null);

  // =====================================================
  // ADDRESSES
  // =====================================================

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);

  // =====================================================
  // PAYMENT
  // =====================================================

  const [payment, setPayment] = useState("razorpay");

  // =====================================================
  // LOADING
  // =====================================================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // ADDRESS FORM
  // =====================================================

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

  // =====================================================
  // GET USER
  // =====================================================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("Please login first.");
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

  // =====================================================
  // FETCH USER ADDRESSES
  // =====================================================

  useEffect(() => {
    if (!user?.uid) return;

    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/addresses/user/${user.uid}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();

        const addressList = Array.isArray(data) ? data : data.addresses || [];

        setAddresses(addressList);

        // ---------------------------------------------
        // DEFAULT ADDRESS
        // ---------------------------------------------

        const defaultAddress = addressList.find((address) => address.isDefault);

        if (defaultAddress) {
          setSelectedAddress(defaultAddress._id);
        } else if (addressList.length > 0) {
          setSelectedAddress(addressList[0]._id);
        }
      } catch (error) {
        console.error("Address loading error:", error);
      }
    };

    fetchAddresses();
  }, [user]);

  // =====================================================
  // ADDRESS INPUT
  // =====================================================

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setNewAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE ADDRESS
  // =====================================================

  const handleSaveAddress = async (event) => {
    event.preventDefault();

    if (!user?.uid) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/addresses`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...newAddress,
          userId: user.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save address");
      }

      const savedAddress = data.address || data;

      setAddresses((previous) => {
        if (savedAddress.isDefault) {
          return [
            savedAddress,

            ...previous.map((address) => ({
              ...address,
              isDefault: false,
            })),
          ];
        }

        return [savedAddress, ...previous];
      });

      setSelectedAddress(savedAddress._id);

      // ---------------------------------------------
      // RESET FORM
      // ---------------------------------------------

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

      alert("Address saved successfully.");
    } catch (error) {
      console.error("Save address error:", error);

      alert(error.message || "Something went wrong while saving the address.");
    }
  };

  // =====================================================
  // TOTAL
  // =====================================================

  const total = Number(subtotal || 0);

  // =====================================================
  // CREATE ORDER
  // =====================================================

  const handlePlaceOrder = async () => {
    if (loading) return;

    // ---------------------------------------------
    // USER CHECK
    // ---------------------------------------------

    if (!user?.uid) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // ---------------------------------------------
    // CART CHECK
    // ---------------------------------------------

    if (!cart || cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    // ---------------------------------------------
    // ADDRESS CHECK
    // ---------------------------------------------

    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }

    const address = addresses.find((item) => item._id === selectedAddress);

    if (!address) {
      alert("Selected address could not be found.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // PAYMENT
      // =================================================

      let paymentId = null;
      let isPaid = false;

      // ---------------------------------------------
      // COD
      // ---------------------------------------------

      if (payment === "cod") {
        paymentId = null;
        isPaid = false;
      }

      // ---------------------------------------------
      // MOCK ONLINE PAYMENT
      // ---------------------------------------------
      else {
        alert("Processing payment...");

        await new Promise((resolve) => setTimeout(resolve, 1500));

        paymentId = "PAY_" + Date.now();

        isPaid = true;
      }

      // =================================================
      // FORMAT CART PRODUCTS
      // =================================================

      const products = cart.map((item) => ({
        productId: String(item.id || item._id || ""),

        name: item.name || "",

        price: Number(item.price || 0),

        quantity: Number(item.quantity || 1),

        image: item.image || item.images?.[0] || "",

        size: item.size || null,

        color: item.color || null,

        variant: item.variant || null,
      }));

      // =================================================
      // SHIPPING ADDRESS SNAPSHOT
      // =================================================
      //
      // IMPORTANT:
      // We copy the address into the order.
      //
      // This means if the user later changes their
      // saved address, the old order still has the
      // original delivery address.
      //
      // =================================================

      const shippingAddress = {
        fullName: address.fullName || "",

        email: address.email || user.email || "",

        phone: address.phone || "",

        addressLine: address.addressLine || "",

        city: address.city || "",

        state: address.state || "",

        postalCode: address.postalCode || "",

        country: address.country || "India",
      };

      // =================================================
      // ORDER DATA
      // =================================================

      const orderData = {
        userId: user.uid,

        userEmail: user.email || "",

        products,

        total,

        status: "pending",

        shippingAddress,

        paymentMethod: payment,

        paymentId,

        isPaid,

        refundStatus: "none",
      };

      // =================================================
      // CREATE ORDER
      // =================================================

      const response = await fetch(`${API_URL}/api/orders/create`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(data.message || "Order creation failed.");
      }

      // =================================================
      // GET CREATED ORDER
      // =================================================

      const createdOrder = data.order;

      // =================================================
      // CLEAR CART
      // =================================================

      clearCart();

      // =================================================
      // SUCCESS MESSAGE
      // =================================================

      alert(
        payment === "cod"
          ? "Order placed successfully! 📦"
          : "Payment successful! 🎉",
      );

      // =================================================
      // GO TO ORDER TRACKING
      // =================================================

      if (createdOrder?._id) {
        navigate(`/orders/${createdOrder._id}`);
      } else {
        navigate("/orders");
      }
    } catch (error) {
      console.error("Place order error:", error);

      alert(error.message || "Something went wrong while placing your order.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (!loading && (!cart || cart.length === 0)) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-[#f6f3ef] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-light">Your cart is empty</h1>

            <p className="text-gray-500 mt-3">
              Add something beautiful before checking out.
            </p>

            <button
              onClick={() => navigate("/collection")}
              className="mt-7 px-7 py-3 bg-black text-white rounded-full"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <div className="min-h-screen bg-[#f6f3ef]">
        <Navbar />

        <main className="pt-32 pb-20 px-4 md:px-10 lg:px-16">
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="max-w-7xl mx-auto mb-12">
            <p className="uppercase tracking-[0.4em] text-xs text-gray-400">
              Euphoria
            </p>

            <h1 className="text-4xl md:text-5xl font-light tracking-wide mt-3">
              Secure Checkout
            </h1>

            <p className="text-gray-500 mt-3">Complete your order securely.</p>
          </div>

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div className="lg:col-span-2 space-y-8">
              {/* ================================================= */}
              {/* SHIPPING ADDRESS */}
              {/* ================================================= */}

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                  <div>
                    <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                      Step 1
                    </p>

                    <h2 className="text-2xl font-light mt-2">
                      Shipping Address
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="px-5 py-2.5 rounded-full border border-gray-200 text-sm hover:bg-black hover:text-white hover:border-black transition"
                  >
                    {showAddressForm ? "Cancel" : "+ Add Address"}
                  </button>
                </div>

                {/* ================================================= */}
                {/* SAVED ADDRESSES */}
                {/* ================================================= */}

                {!showAddressForm && (
                  <div className="space-y-4">
                    {addresses.length === 0 ? (
                      <div className="border border-dashed border-gray-300 rounded-2xl p-8 text-center">
                        <p className="text-gray-500">
                          You don't have a saved address yet.
                        </p>

                        <button
                          onClick={() => setShowAddressForm(true)}
                          className="mt-4 underline text-sm"
                        >
                          Add your first address
                        </button>
                      </div>
                    ) : (
                      addresses.map((address) => (
                        <div
                          key={address._id}
                          onClick={() => setSelectedAddress(address._id)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            selectedAddress === address._id
                              ? "border-black bg-gray-50"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <div className="flex justify-between gap-5">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium capitalize">
                                  {address.label}
                                </span>

                                {address.isDefault && (
                                  <span className="text-[10px] uppercase tracking-wider bg-black text-white px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>

                              <p className="mt-3 font-medium">
                                {address.fullName}
                              </p>

                              <p className="text-sm text-gray-500 mt-1">
                                {address.addressLine}
                              </p>

                              <p className="text-sm text-gray-500">
                                {address.city}, {address.state} -{" "}
                                {address.postalCode}
                              </p>

                              <p className="text-sm text-gray-500 mt-2">
                                {address.phone}
                              </p>
                            </div>

                            <input
                              type="radio"
                              checked={selectedAddress === address._id}
                              readOnly
                              className="mt-1"
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* ================================================= */}
                {/* NEW ADDRESS */}
                {/* ================================================= */}

                {showAddressForm && (
                  <form
                    onSubmit={handleSaveAddress}
                    className="grid md:grid-cols-2 gap-5"
                  >
                    <select
                      name="label"
                      value={newAddress.label}
                      onChange={handleAddressChange}
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
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
                      placeholder="Full Name"
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <input
                      name="email"
                      type="email"
                      value={newAddress.email}
                      onChange={handleAddressChange}
                      placeholder="Email"
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <input
                      name="phone"
                      value={newAddress.phone}
                      onChange={handleAddressChange}
                      required
                      placeholder="Phone Number"
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <input
                      name="addressLine"
                      value={newAddress.addressLine}
                      onChange={handleAddressChange}
                      required
                      placeholder="Address"
                      className="md:col-span-2 border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <input
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      required
                      placeholder="City"
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <input
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      required
                      placeholder="State"
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <input
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleAddressChange}
                      required
                      placeholder="Postal Code"
                      className="border border-gray-200 p-3.5 rounded-xl outline-none focus:border-black"
                    />

                    <button
                      type="submit"
                      className="md:col-span-2 bg-black text-white py-3.5 rounded-xl hover:opacity-90 transition"
                    >
                      Save Address
                    </button>
                  </form>
                )}
              </section>

              {/* ================================================= */}
              {/* PAYMENT */}
              {/* ================================================= */}

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="mb-7">
                  <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                    Step 2
                  </p>

                  <h2 className="text-2xl font-light mt-2">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  {/* RAZORPAY */}

                  <PaymentOption
                    active={payment === "razorpay"}
                    onClick={() => setPayment("razorpay")}
                    icon={<SiRazorpay size={24} />}
                    title="Razorpay"
                    description="UPI, Cards, NetBanking"
                  />

                  {/* UPI */}

                  <PaymentOption
                    active={payment === "upi"}
                    onClick={() => setPayment("upi")}
                    icon={
                      <div className="flex gap-2">
                        <SiGooglepay size={22} />

                        <SiPaytm size={22} />
                      </div>
                    }
                    title="UPI Payment"
                    description="Google Pay / PhonePe / Paytm"
                  />

                  {/* CARD */}

                  <PaymentOption
                    active={payment === "card"}
                    onClick={() => setPayment("card")}
                    icon={<FaCreditCard size={22} />}
                    title="Credit / Debit Card"
                    description="Visa, Mastercard"
                  />

                  {/* COD */}

                  <PaymentOption
                    active={payment === "cod"}
                    onClick={() => setPayment("cod")}
                    icon={<MdDeliveryDining size={25} />}
                    title="Cash on Delivery"
                    description="Pay when your order arrives"
                  />
                </div>
              </section>
            </div>

            {/* ================================================= */}
            {/* ORDER SUMMARY */}
            {/* ================================================= */}

            <aside className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 h-fit lg:sticky lg:top-28">
              <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                Your Order
              </p>

              <h2 className="text-2xl font-light mt-2 mb-7">Order Summary</h2>

              {/* PRODUCTS */}

              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>

                      <p className="text-sm text-gray-500 mt-1">
                        Qty: {item.quantity}
                      </p>

                      {item.size && (
                        <p className="text-xs text-gray-400 mt-1">
                          Size: {item.size}
                        </p>
                      )}

                      <p className="text-sm mt-2">
                        ₹
                        {(
                          Number(item.price) * Number(item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DIVIDER */}

              <div className="border-t border-gray-100 my-7" />

              {/* SHIPPING */}

              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>

                <span className="text-green-600">Free</span>
              </div>

              {/* TOTAL */}

              <div className="flex justify-between text-xl font-medium mt-5">
                <span>Total</span>

                <span>₹{total.toFixed(2)}</span>
              </div>

              {/* BUTTON */}

              <button
                onClick={handlePlaceOrder}
                disabled={loading || !selectedAddress || cart.length === 0}
                className="w-full mt-7 py-4 bg-black text-white rounded-full tracking-wide hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : payment === "cod"
                    ? "Place Order"
                    : "Pay Securely"}
              </button>

              {!selectedAddress && (
                <p className="text-xs text-red-500 text-center mt-3">
                  Select a shipping address to continue.
                </p>
              )}

              <p className="text-[11px] text-gray-400 text-center mt-5 leading-relaxed">
                By placing this order, you agree to Euphoria's terms and
                conditions.
              </p>
            </aside>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

// =====================================================
// PAYMENT OPTION COMPONENT
// =====================================================

const PaymentOption = ({ active, onClick, icon, title, description }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
        active
          ? "border-black bg-gray-50"
          : "border-gray-200 hover:border-gray-400"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#f6f3ef] flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div>
          <p className="font-medium">{title}</p>

          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
      </div>

      <input type="radio" checked={active} onChange={() => {}} />
    </div>
  );
};

export default Checkout;
