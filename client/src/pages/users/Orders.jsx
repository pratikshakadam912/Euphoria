import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import {
  FiArrowLeft,
  FiPackage,
  FiChevronRight,
  FiShoppingBag,
} from "react-icons/fi";

const API_URL = "https://euphoria-ooqv.onrender.com";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ======================================================
  // FETCH USER ORDERS
  // ======================================================

  useEffect(() => {
    const fetchOrders = async () => {
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

        const response = await fetch(`${API_URL}/api/orders/user/${user.uid}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load orders");
        }

        setOrders(data);
      } catch (err) {
        console.error("Orders loading error:", err);

        setError(err.message || "Unable to load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // ======================================================
  // STATUS STYLE
  // ======================================================

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";

      case "confirmed":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-100";

      case "delivered":
        return "bg-green-50 text-green-700 border-green-100";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-100";

      case "refunded":
        return "bg-gray-100 text-gray-700 border-gray-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  // ======================================================
  // STATUS LABEL
  // ======================================================

  const getStatusLabel = (status) => {
    if (!status) return "Pending";

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // ======================================================
  // DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

            <div className="h-12 bg-gray-200 rounded w-72 mt-10" />

            <div className="h-4 bg-gray-200 rounded w-96 mt-5" />

            <div className="mt-12 space-y-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-48 bg-white rounded-[28px] border border-gray-100"
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f7f5]">
        <Navbar />

        <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
          >
            <FiArrowLeft />
            Back to Account
          </Link>

          <div className="mt-16 bg-white rounded-[28px] border border-red-100 p-10 text-center">
            <p className="text-red-500">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-black text-white rounded-full text-sm"
            >
              Try Again
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
        >
          <FiArrowLeft />
          Back to Account
        </Link>

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mt-14 mb-12">
          <p className="uppercase tracking-[0.45em] text-[11px] text-[#8b5e3c]">
            Your Euphoria
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-light tracking-tight">
            My Orders
          </h1>

          <p className="mt-4 text-gray-500 max-w-lg leading-relaxed">
            View your purchases, check order status and track your Euphoria
            deliveries.
          </p>
        </div>

        {/* ================================================= */}
        {/* EMPTY ORDERS */}
        {/* ================================================= */}

        {orders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[32px] p-12 md:p-20 text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f8f7f5] flex items-center justify-center text-3xl">
              <FiShoppingBag />
            </div>

            <h2 className="text-2xl font-light mt-7">No orders yet</h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              You haven't placed an order with Euphoria yet. Your purchases will
              appear here.
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center justify-center mt-8 px-7 py-3 bg-black text-white rounded-full text-sm hover:opacity-90 transition"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          /* ================================================= */
          /* ORDER LIST */
          /* ================================================= */

          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-100 rounded-[28px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.025)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition"
              >
                {/* ================================= */}
                {/* ORDER HEADER */}
                {/* ================================= */}

                <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      Order
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1.5 rounded-full border text-xs font-medium ${getStatusStyle(order.status)}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>

                    <span className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>

                {/* ================================= */}
                {/* ORDER CONTENT */}
                {/* ================================= */}

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* PRODUCTS */}

                    <div className="flex items-center">
                      <div className="flex">
                        {order.products?.slice(0, 3).map((product, index) => (
                          <div
                            key={`${product.productId}-${index}`}
                            className={`w-20 h-24 md:w-24 md:h-28 rounded-xl overflow-hidden bg-[#f8f7f5] border border-white ${
                              index > 0 ? "-ml-4" : ""
                            }`}
                          >
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <FiPackage />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="ml-6">
                        <p className="font-medium">
                          {order.products
                            ?.slice(0, 2)
                            .map((product) => product.name)
                            .join(", ")}
                        </p>

                        {order.products?.length > 2 && (
                          <p className="text-sm text-gray-500 mt-1">
                            +{order.products.length - 2} more item
                            {order.products.length - 2 > 1 ? "s" : ""}
                          </p>
                        )}

                        <p className="text-sm text-gray-500 mt-2">
                          {order.products?.reduce(
                            (total, item) => total + Number(item.quantity || 0),
                            0,
                          )}{" "}
                          item
                          {order.products?.reduce(
                            (total, item) => total + Number(item.quantity || 0),
                            0,
                          ) !== 1
                            ? "s"
                            : ""}
                        </p>
                      </div>
                    </div>

                    {/* TOTAL + VIEW */}

                    <div className="flex items-center justify-between md:justify-end gap-8">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                          Total
                        </p>

                        <p className="text-xl font-medium mt-1">
                          ₹{Number(order.total || 0).toFixed(2)}
                        </p>
                      </div>

                      <Link
                        to={`/orders/${order._id}`}
                        className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition"
                      >
                        <FiChevronRight />
                      </Link>
                    </div>
                  </div>

                  {/* ================================= */}
                  {/* TRACK BUTTON */}
                  {/* ================================= */}

                  <div className="mt-7 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <FiPackage />

                      <span>
                        {order.status === "delivered"
                          ? "Your order has been delivered."
                          : order.status === "cancelled"
                            ? "This order has been cancelled."
                            : "Your order is being processed."}
                      </span>
                    </div>

                    <Link
                      to={`/orders/${order._id}`}
                      className="text-sm font-medium hover:underline"
                    >
                      View Order & Track →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

export default Orders;
