import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import {
  FiArrowLeft,
  FiPackage,
  FiCheck,
  FiClock,
  FiTruck,
  FiMapPin,
  FiCreditCard,
  FiXCircle,
} from "react-icons/fi";

const API_URL = "https://euphoria-ooqv.onrender.com";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // FETCH ORDER
  // ======================================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(savedUser);

        if (!user?.uid) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/api/orders/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load order");
        }

        // Security check on frontend
        if (data.userId && data.userId !== user.uid) {
          throw new Error("You are not authorized to view this order.");
        }

        setOrder(data);
      } catch (err) {
        console.error("Order details error:", err);

        setError(err.message || "Unable to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  // ======================================================
  // DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ======================================================
  // DATE + TIME
  // ======================================================

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ======================================================
  // STATUS
  // ======================================================

  const getStatus = () => {
    return order?.status?.toLowerCase() || "pending";
  };

  // ======================================================
  // TRACKING STEPS
  // ======================================================

  const trackingSteps = [
    {
      key: "pending",
      title: "Order Placed",
      description: "Your order has been received.",
      icon: FiClock,
    },
    {
      key: "confirmed",
      title: "Order Confirmed",
      description: "Your order has been confirmed by Euphoria.",
      icon: FiCheck,
    },
    {
      key: "shipped",
      title: "Shipped",
      description: "Your order is on its way.",
      icon: FiTruck,
    },
    {
      key: "delivered",
      title: "Delivered",
      description: "Your order has been delivered.",
      icon: FiPackage,
    },
  ];

  const getStepState = (stepKey) => {
    const currentStatus = getStatus();

    const orderSequence = ["pending", "confirmed", "shipped", "delivered"];

    const currentIndex = orderSequence.indexOf(currentStatus);

    const stepIndex = orderSequence.indexOf(stepKey);

    if (currentStatus === "cancelled") {
      return "cancelled";
    }

    if (stepIndex < currentIndex) {
      return "completed";
    }

    if (stepIndex === currentIndex) {
      return "current";
    }

    return "upcoming";
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f5]">
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32" />

            <div className="h-12 bg-gray-200 rounded w-80 mt-10" />

            <div className="h-4 bg-gray-200 rounded w-96 mt-5" />

            <div className="mt-12 h-64 bg-white rounded-[30px]" />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f8f7f5]">
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
          >
            <FiArrowLeft />
            Back to Orders
          </Link>

          <div className="mt-16 bg-white rounded-[30px] border border-red-100 p-10 text-center">
            <FiXCircle className="mx-auto text-4xl text-red-400" />

            <h2 className="text-2xl font-light mt-5">Unable to load order</h2>

            <p className="text-gray-500 mt-3">{error || "Order not found."}</p>

            <Link
              to="/orders"
              className="inline-flex mt-7 px-7 py-3 bg-black text-white rounded-full text-sm"
            >
              Back to Orders
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const status = getStatus();

  const isCancelled = status === "cancelled";

  const isRefunded = status === "refunded";

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
        >
          <FiArrowLeft />
          Back to Orders
        </Link>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mt-12 mb-10">
          <p className="uppercase tracking-[0.4em] text-[11px] text-[#8b5e3c]">
            Order Details
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <h1 className="mt-4 text-4xl md:text-5xl font-light">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>

              <p className="mt-3 text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>

            <div
              className={`inline-flex w-fit px-4 py-2 rounded-full text-sm font-medium ${
                status === "delivered"
                  ? "bg-green-100 text-green-700"
                  : status === "shipped"
                    ? "bg-purple-100 text-purple-700"
                    : status === "confirmed"
                      ? "bg-blue-100 text-blue-700"
                      : status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* CANCELLED / REFUNDED */}
        {/* ================================================= */}

        {isCancelled && (
          <div className="bg-red-50 border border-red-100 rounded-[28px] p-6 mb-8">
            <div className="flex items-start gap-4">
              <FiXCircle className="text-red-500 text-xl mt-1" />

              <div>
                <h3 className="font-medium text-red-700">Order Cancelled</h3>

                <p className="text-sm text-red-600 mt-1">
                  This order has been cancelled.
                </p>
              </div>
            </div>
          </div>
        )}

        {isRefunded && (
          <div className="bg-gray-100 border border-gray-200 rounded-[28px] p-6 mb-8">
            <div className="flex items-start gap-4">
              <FiCheck className="text-gray-700 text-xl mt-1" />

              <div>
                <h3 className="font-medium">Refund Processed</h3>

                <p className="text-sm text-gray-500 mt-1">
                  Your refund has been processed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* TRACKING */}
        {/* ================================================= */}

        {!isCancelled && (
          <section className="bg-white border border-gray-100 rounded-[32px] p-7 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3 mb-10">
              <FiTruck className="text-xl" />

              <div>
                <h2 className="text-2xl font-light">Track your order</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Follow your Euphoria delivery.
                </p>
              </div>
            </div>

            <div className="relative">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                const state = getStepState(step.key);

                return (
                  <div
                    key={step.key}
                    className="relative flex gap-5 pb-10 last:pb-0"
                  >
                    {/* CONNECTING LINE */}

                    {index !== trackingSteps.length - 1 && (
                      <div
                        className={`absolute left-[19px] top-10 w-[2px] h-full ${
                          state === "completed" ? "bg-black" : "bg-gray-200"
                        }`}
                      />
                    )}

                    {/* ICON */}

                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        state === "completed"
                          ? "bg-black text-white"
                          : state === "current"
                            ? "bg-black text-white ring-8 ring-gray-100"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    {/* CONTENT */}

                    <div className="pt-1">
                      <h3
                        className={`font-medium ${
                          state === "upcoming" ? "text-gray-400" : ""
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p
                        className={`text-sm mt-1 ${
                          state === "upcoming"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        {step.description}
                      </p>

                      {state === "current" && (
                        <p className="text-xs text-black mt-2 uppercase tracking-[0.15em]">
                          Current Status
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        <section className="mt-8 bg-white border border-gray-100 rounded-[32px] overflow-hidden">
          <div className="px-7 md:px-10 py-6 border-b border-gray-100">
            <h2 className="text-2xl font-light">Items</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {order.products?.map((product, index) => (
              <div
                key={`${product.productId}-${index}`}
                className="px-7 md:px-10 py-6 flex gap-5"
              >
                <div className="w-24 h-28 rounded-2xl overflow-hidden bg-[#f8f7f5] shrink-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FiPackage size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>

                    {product.size && (
                      <p className="text-sm text-gray-500 mt-2">
                        Size: {product.size}
                      </p>
                    )}

                    {product.color && (
                      <p className="text-sm text-gray-500">
                        Color: {product.color}
                      </p>
                    )}

                    {product.variant && (
                      <p className="text-sm text-gray-500">
                        Variant: {product.variant}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mt-2">
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-medium">
                      ₹
                      {(
                        Number(product.price || 0) *
                        Number(product.quantity || 1)
                      ).toFixed(2)}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      ₹{Number(product.price || 0).toFixed(2)} each
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================= */}
        {/* SHIPPING + PAYMENT */}
        {/* ================================================= */}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* SHIPPING */}

          <section className="bg-white border border-gray-100 rounded-[30px] p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FiMapPin />

              <h2 className="text-xl font-light">Shipping Address</h2>
            </div>

            {order.shippingAddress ? (
              <div className="text-sm text-gray-600 leading-7">
                <p className="font-medium text-gray-900">
                  {order.shippingAddress.fullName}
                </p>

                <p>{order.shippingAddress.addressLine}</p>

                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.postalCode}
                </p>

                <p>{order.shippingAddress.country || "India"}</p>

                <p className="mt-2">{order.shippingAddress.phone}</p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                Shipping address unavailable.
              </p>
            )}
          </section>

          {/* PAYMENT */}

          <section className="bg-white border border-gray-100 rounded-[30px] p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FiCreditCard />

              <h2 className="text-xl font-light">Payment</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-5">
                <span className="text-gray-500">Method</span>

                <span className="font-medium uppercase">
                  {order.paymentMethod || "—"}
                </span>
              </div>

              <div className="flex justify-between gap-5">
                <span className="text-gray-500">Payment Status</span>

                <span
                  className={
                    order.isPaid
                      ? "text-green-600 font-medium"
                      : "text-gray-600 font-medium"
                  }
                >
                  {order.isPaid ? "Paid" : "Cash on Delivery"}
                </span>
              </div>

              {order.paymentId && (
                <div className="flex justify-between gap-5">
                  <span className="text-gray-500">Payment ID</span>

                  <span className="font-medium text-right break-all">
                    {order.paymentId}
                  </span>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 flex justify-between text-lg">
                <span>Total</span>

                <span className="font-medium">
                  ₹{Number(order.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* ================================================= */}
        {/* ORDER INFORMATION */}
        {/* ================================================= */}

        <section className="mt-8 bg-white border border-gray-100 rounded-[30px] p-7 md:p-8">
          <h2 className="text-xl font-light mb-6">Order Information</h2>

          <div className="grid sm:grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-gray-400 uppercase tracking-[0.15em] text-xs">
                Order ID
              </p>

              <p className="mt-2 break-all">{order._id}</p>
            </div>

            <div>
              <p className="text-gray-400 uppercase tracking-[0.15em] text-xs">
                Order Date
              </p>

              <p className="mt-2">{formatDateTime(order.createdAt)}</p>
            </div>

            {order.updatedAt && (
              <div>
                <p className="text-gray-400 uppercase tracking-[0.15em] text-xs">
                  Last Updated
                </p>

                <p className="mt-2">{formatDateTime(order.updatedAt)}</p>
              </div>
            )}

            <div>
              <p className="text-gray-400 uppercase tracking-[0.15em] text-xs">
                Customer
              </p>

              <p className="mt-2 break-all">{order.userEmail || "—"}</p>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* BACK BUTTON */}
        {/* ================================================= */}

        <div className="mt-10">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full text-sm hover:bg-black hover:text-white hover:border-black transition"
          >
            <FiArrowLeft />
            Back to My Orders
          </Link>
        </div>

        {/* ================================================= */}
        {/* FOOTER NOTE */}
        {/* ================================================= */}

        <div className="text-center mt-16">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-300">
            Euphoria
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Crafted for those who wear their own story.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderDetails;
