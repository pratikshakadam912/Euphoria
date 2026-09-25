import { useEffect, useState } from "react";

const API_URL = "https://euphoria-ooqv.onrender.com";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH ALL ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/orders`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders.");
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch orders error:", error);

      setError(error.message || "Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      setError("");

      const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status.");
      }

      // Update immediately from backend response
      if (data.order) {
        setOrders((currentOrders) =>
          currentOrders.map((order) => (order._id === id ? data.order : order)),
        );
      } else {
        // Fallback
        await fetchOrders();
      }
    } catch (error) {
      console.error("Update order status error:", error);

      setError(error.message || "Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // CANCEL ORDER
  // =====================================================

  const handleCancelOrder = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    updateStatus(id, "cancelled");
  };

  // =====================================================
  // STATUS COLOR
  // =====================================================

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "refunded":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // =====================================================
  // PAYMENT STATUS
  // =====================================================

  const getPaymentStatus = (order) => {
    if (order.isPaid) {
      return "Paid";
    }

    if (order.paymentMethod === "cod") {
      return "Cash on Delivery";
    }

    return "Payment Pending";
  };

  // =====================================================
  // PAYMENT STATUS COLOR
  // =====================================================

  const getPaymentStatusColor = (order) => {
    if (order.isPaid) {
      return "text-green-600";
    }

    if (order.paymentMethod === "cod") {
      return "text-orange-600";
    }

    return "text-gray-500";
  };

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const getTotalItems = (order) => {
    if (!Array.isArray(order.products)) {
      return 0;
    }

    return order.products.reduce(
      (total, product) => total + Number(product.quantity || 0),
      0,
    );
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // STATUS ACTIONS
  // =====================================================

  const renderStatusActions = (order) => {
    const isUpdating = updatingId === order._id;

    // ================================================
    // PENDING → CONFIRMED / CANCELLED
    // ================================================

    if (order.status === "pending") {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(order._id, "confirmed")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdating ? "Updating..." : "Confirm"}
          </button>

          <button
            disabled={isUpdating}
            onClick={() => handleCancelOrder(order._id)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdating ? "Updating..." : "Cancel"}
          </button>
        </div>
      );
    }

    // ================================================
    // CONFIRMED → SHIPPED / CANCELLED
    // ================================================

    if (order.status === "confirmed") {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(order._id, "shipped")}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdating ? "Updating..." : "Ship"}
          </button>

          <button
            disabled={isUpdating}
            onClick={() => handleCancelOrder(order._id)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdating ? "Updating..." : "Cancel"}
          </button>
        </div>
      );
    }

    // ================================================
    // SHIPPED → DELIVERED / CANCELLED
    // ================================================

    if (order.status === "shipped") {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            disabled={isUpdating}
            onClick={() => updateStatus(order._id, "delivered")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdating ? "Updating..." : "Deliver"}
          </button>

          <button
            disabled={isUpdating}
            onClick={() => handleCancelOrder(order._id)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdating ? "Updating..." : "Cancel"}
          </button>
        </div>
      );
    }

    // ================================================
    // COMPLETED
    // ================================================

    if (order.status === "delivered") {
      return (
        <span className="text-sm text-green-600 font-medium">Completed</span>
      );
    }

    // ================================================
    // CANCELLED
    // ================================================

    if (order.status === "cancelled") {
      return (
        <span className="text-sm text-red-600 font-medium">Cancelled</span>
      );
    }

    // ================================================
    // REFUNDED
    // ================================================

    if (order.status === "refunded") {
      return (
        <span className="text-sm text-gray-500 font-medium">Refunded</span>
      );
    }

    return null;
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

          <p className="text-gray-500 mt-1">Manage customer orders</p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-10 text-center">
          <div className="animate-pulse text-gray-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

          <p className="text-gray-500 mt-1">Manage customer orders</p>
        </div>

        <div className="bg-white px-5 py-3 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">Total Orders</p>

          <h2 className="text-2xl font-bold">{orders.length}</h2>
        </div>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm">{error}</p>

          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ================================================= */}
      {/* EMPTY */}
      {/* ================================================= */}

      {orders.length === 0 && !error && (
        <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800">No orders yet</h2>

          <p className="text-gray-500 mt-2">
            Customer orders will appear here.
          </p>
        </div>
      )}

      {/* ================================================= */}
      {/* DESKTOP TABLE */}
      {/* ================================================= */}

      {orders.length > 0 && (
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Customer
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Order
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Payment
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Total
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="text-left p-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* CUSTOMER */}

                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900 break-all">
                          {order.shippingAddress?.fullName || "Customer"}
                        </p>

                        <p className="text-sm text-gray-500 break-all mt-1">
                          {order.userEmail}
                        </p>
                      </div>
                    </td>

                    {/* ORDER */}

                    <td className="p-4">
                      <p className="font-medium text-gray-900">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {getTotalItems(order)}{" "}
                        {getTotalItems(order) === 1 ? "item" : "items"}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </td>

                    {/* PAYMENT */}

                    <td className="p-4">
                      <p className="font-medium uppercase text-sm">
                        {order.paymentMethod || "—"}
                      </p>

                      <p
                        className={`text-sm mt-1 font-medium ${getPaymentStatusColor(
                          order,
                        )}`}
                      >
                        {getPaymentStatus(order)}
                      </p>

                      {order.paymentId && (
                        <p className="text-xs text-gray-400 mt-1 max-w-[160px] break-all">
                          {order.paymentId}
                        </p>
                      )}
                    </td>

                    {/* TOTAL */}

                    <td className="p-4">
                      <p className="font-semibold text-gray-900">
                        ₹{Number(order.total || 0).toFixed(2)}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">{renderStatusActions(order)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* MOBILE CARDS */}
      {/* ================================================= */}

      {orders.length > 0 && (
        <div className="grid gap-4 lg:hidden">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl p-5 shadow-sm border"
            >
              {/* HEADER */}

              <div className="flex justify-between items-start gap-4 mb-5">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Customer
                  </p>

                  <h3 className="font-semibold text-gray-900 mt-1 break-all">
                    {order.shippingAddress?.fullName || "Customer"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 break-all">
                    {order.userEmail}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize shrink-0 ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* ORDER INFO */}

              <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
                <div>
                  <p className="text-gray-400">Order</p>

                  <p className="font-medium mt-1">
                    #{order._id?.slice(-8).toUpperCase()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Date</p>

                  <p className="font-medium mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Items</p>

                  <p className="font-medium mt-1">{getTotalItems(order)}</p>
                </div>

                <div>
                  <p className="text-gray-400">Total</p>

                  <p className="font-semibold mt-1">
                    ₹{Number(order.total || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* PAYMENT */}

              <div className="border-t border-gray-100 mt-5 pt-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Payment</span>

                  <span className="font-medium uppercase">
                    {order.paymentMethod || "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm mt-2">
                  <span className="text-gray-500">Payment Status</span>

                  <span
                    className={`font-medium ${getPaymentStatusColor(order)}`}
                  >
                    {getPaymentStatus(order)}
                  </span>
                </div>

                {order.paymentId && (
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm">Payment ID</p>

                    <p className="text-xs text-gray-400 mt-1 break-all">
                      {order.paymentId}
                    </p>
                  </div>
                )}
              </div>

              {/* SHIPPING ADDRESS */}

              {order.shippingAddress && (
                <div className="border-t border-gray-100 mt-5 pt-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">
                    Shipping Address
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    {order.shippingAddress.addressLine}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    - {order.shippingAddress.postalCode}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.shippingAddress.phone}
                  </p>
                </div>
              )}

              {/* ACTION */}

              <div className="border-t border-gray-100 mt-5 pt-5">
                {renderStatusActions(order)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
