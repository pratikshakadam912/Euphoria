import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaShoppingCart,
  FaBox,
  FaUsers,
  FaRupeeSign,
  FaSyncAlt,
  FaExclamationTriangle,
  FaArrowUp,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const API_URL = "https://euphoria-ooqv.onrender.com/api";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [errors, setErrors] = useState({
    products: "",
    users: "",
    orders: "",
  });

  // =========================================================
  // HELPERS
  // =========================================================

  const getArrayData = (data) => {
    if (Array.isArray(data)) return data;

    if (Array.isArray(data?.products)) return data.products;
    if (Array.isArray(data?.users)) return data.users;
    if (Array.isArray(data?.orders)) return data.orders;
    if (Array.isArray(data?.data)) return data.data;

    return [];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getOrderStatus = (order) => {
    return String(order?.status || "pending").toLowerCase();
  };

  const getCustomerName = (order) => {
    return (
      order?.userName ||
      order?.customerName ||
      order?.name ||
      order?.user?.name ||
      order?.user?.username ||
      order?.userEmail ||
      order?.email ||
      "Guest Customer"
    );
  };

  const getCustomerEmail = (order) => {
    return order?.userEmail || order?.email || order?.user?.email || "No email";
  };

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

  const fetchDashboardData = useCallback(async () => {
    setErrors({
      products: "",
      users: "",
      orders: "",
    });

    try {
      const results = await Promise.allSettled([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/orders`),
      ]);

      // =====================================================
      // PRODUCTS
      // =====================================================

      if (results[0].status === "fulfilled") {
        try {
          const response = results[0].value;

          if (!response.ok) {
            throw new Error(`Products API error: ${response.status}`);
          }

          const data = await response.json();

          setProducts(getArrayData(data));
        } catch (error) {
          console.error("Products error:", error);

          setErrors((prev) => ({
            ...prev,
            products: "Unable to load products",
          }));

          setProducts([]);
        }
      } else {
        console.error("Products request failed:", results[0].reason);

        setErrors((prev) => ({
          ...prev,
          products: "Unable to connect to products API",
        }));

        setProducts([]);
      }

      // =====================================================
      // USERS
      // =====================================================

      if (results[1].status === "fulfilled") {
        try {
          const response = results[1].value;

          if (!response.ok) {
            throw new Error(`Users API error: ${response.status}`);
          }

          const data = await response.json();

          setUsers(getArrayData(data));
        } catch (error) {
          console.error("Users error:", error);

          setErrors((prev) => ({
            ...prev,
            users: "Unable to load users",
          }));

          setUsers([]);
        }
      } else {
        console.error("Users request failed:", results[1].reason);

        setErrors((prev) => ({
          ...prev,
          users: "Unable to connect to users API",
        }));

        setUsers([]);
      }

      // =====================================================
      // ORDERS
      // =====================================================

      if (results[2].status === "fulfilled") {
        try {
          const response = results[2].value;

          if (!response.ok) {
            throw new Error(`Orders API error: ${response.status}`);
          }

          const data = await response.json();

          setOrders(getArrayData(data));
        } catch (error) {
          console.error("Orders error:", error);

          setErrors((prev) => ({
            ...prev,
            orders: "Unable to load orders",
          }));

          setOrders([]);
        }
      } else {
        console.error("Orders request failed:", results[2].reason);

        setErrors((prev) => ({
          ...prev,
          orders: "Unable to connect to orders API",
        }));

        setOrders([]);
      }
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // =========================================================
  // REFRESH
  // =========================================================

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
  };

  // =========================================================
  // ORDER STATISTICS
  // =========================================================

  const orderStats = useMemo(() => {
    let pending = 0;
    let processing = 0;
    let shipped = 0;
    let delivered = 0;
    let cancelled = 0;

    orders.forEach((order) => {
      const status = getOrderStatus(order);

      if (status === "pending") {
        pending++;
      } else if (status === "processing" || status === "confirmed") {
        processing++;
      } else if (status === "shipped") {
        shipped++;
      } else if (status === "delivered") {
        delivered++;
      } else if (status === "cancelled" || status === "canceled") {
        cancelled++;
      }
    });

    return {
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
    };
  }, [orders]);

  // =========================================================
  // REVENUE
  // =========================================================

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => {
      const status = getOrderStatus(order);

      // Don't count cancelled orders as revenue
      if (status === "cancelled" || status === "canceled") {
        return sum;
      }

      const total =
        Number(order?.total) ||
        Number(order?.totalAmount) ||
        Number(order?.amount) ||
        0;

      return sum + total;
    }, 0);
  }, [orders]);

  // =========================================================
  // AVERAGE ORDER VALUE
  // =========================================================

  const averageOrderValue = useMemo(() => {
    const validOrders = orders.filter((order) => {
      const status = getOrderStatus(order);

      return status !== "cancelled" && status !== "canceled";
    });

    if (validOrders.length === 0) {
      return 0;
    }

    return totalRevenue / validOrders.length;
  }, [orders, totalRevenue]);

  // =========================================================
  // LOW STOCK PRODUCTS
  // =========================================================

  const lowStockProducts = useMemo(() => {
    return products
      .filter((product) => {
        const stock = Number(product?.stock);

        return !Number.isNaN(stock) && stock <= 5;
      })
      .sort((a, b) => Number(a.stock || 0) - Number(b.stock || 0))
      .slice(0, 6);
  }, [products]);

  // =========================================================
  // RECENT ORDERS
  // =========================================================

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(
          a?.createdAt || a?.createdDate || a?.date || 0,
        ).getTime();

        const dateB = new Date(
          b?.createdAt || b?.createdDate || b?.date || 0,
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 8);
  }, [orders]);

  // =========================================================
  // STATUS UI
  // =========================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
      case "confirmed":
        return "bg-purple-100 text-purple-700";

      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 md:p-8">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="uppercase tracking-[4px] text-gray-500 text-sm">
            Euphoria Admin
          </p>

          <h1 className="text-4xl md:text-5xl font-light mt-2">Dashboard</h1>

          <p className="text-gray-500 mt-3">
            Monitor your store, orders, customers and revenue.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
        >
          <FaSyncAlt className={refreshing ? "animate-spin" : ""} />

          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* =====================================================
          API WARNINGS
      ===================================================== */}

      {(errors.products || errors.users || errors.orders) && (
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-600 mt-1" />

            <div>
              <h3 className="font-semibold text-yellow-800">
                Some dashboard data could not be loaded
              </h3>

              <div className="text-sm text-yellow-700 mt-2 space-y-1">
                {errors.products && <p>• Products: {errors.products}</p>}

                {errors.users && <p>• Users: {errors.users}</p>}

                {errors.orders && <p>• Orders: {errors.orders}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN STATS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* ORDERS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>

              <h2 className="text-3xl font-bold mt-2">{orders.length}</h2>

              <p className="text-sm text-gray-400 mt-2">All orders</p>
            </div>

            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
              <FaShoppingCart />
            </div>
          </div>
        </div>

        {/* PRODUCTS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Products</p>

              <h2 className="text-3xl font-bold mt-2">{products.length}</h2>

              <p className="text-sm text-gray-400 mt-2">In catalog</p>
            </div>

            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
              <FaBox />
            </div>
          </div>
        </div>

        {/* USERS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Customers</p>

              <h2 className="text-3xl font-bold mt-2">{users.length}</h2>

              <p className="text-sm text-gray-400 mt-2">Registered users</p>
            </div>

            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
              <FaUsers />
            </div>
          </div>
        </div>

        {/* REVENUE */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>

              <h2 className="text-2xl md:text-3xl font-bold mt-2">
                {formatCurrency(totalRevenue)}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Excluding cancelled orders
              </p>
            </div>

            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
              <FaRupeeSign />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ORDER STATUS
      ===================================================== */}

      <div className="mt-8">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold">Order Overview</h2>

          <p className="text-gray-500 mt-1">Current status of your orders.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Pending */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <FaClock />
              </div>

              <div>
                <p className="text-gray-500 text-sm">Pending</p>

                <p className="text-2xl font-bold">{orderStats.pending}</p>
              </div>
            </div>
          </div>

          {/* Processing */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <FaArrowUp />
              </div>

              <div>
                <p className="text-gray-500 text-sm">Processing</p>

                <p className="text-2xl font-bold">{orderStats.processing}</p>
              </div>
            </div>
          </div>

          {/* Shipped */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FaTruck />
              </div>

              <div>
                <p className="text-gray-500 text-sm">Shipped</p>

                <p className="text-2xl font-bold">{orderStats.shipped}</p>
              </div>
            </div>
          </div>

          {/* Delivered */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                <FaCheckCircle />
              </div>

              <div>
                <p className="text-gray-500 text-sm">Delivered</p>

                <p className="text-2xl font-bold">{orderStats.delivered}</p>
              </div>
            </div>
          </div>

          {/* Cancelled */}

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                <FaTimesCircle />
              </div>

              <div>
                <p className="text-gray-500 text-sm">Cancelled</p>

                <p className="text-2xl font-bold">{orderStats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          REVENUE + AVERAGE ORDER
      ===================================================== */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-black text-white rounded-3xl p-7">
          <p className="text-gray-400 text-sm">Total Revenue</p>

          <h2 className="text-4xl font-semibold mt-3">
            {formatCurrency(totalRevenue)}
          </h2>

          <p className="text-gray-400 mt-3">
            Based on {orders.length} total order
            {orders.length === 1 ? "" : "s"}.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Average Order Value</p>

          <h2 className="text-4xl font-semibold mt-3">
            {formatCurrency(averageOrderValue)}
          </h2>

          <p className="text-gray-400 mt-3">
            Average value of non-cancelled orders.
          </p>
        </div>
      </div>

      {/* =====================================================
          RECENT ORDERS
      ===================================================== */}

      <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Recent Orders</h2>

            <p className="text-gray-500 text-sm mt-1">
              Latest orders from your store.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Showing {recentOrders.length} of {orders.length}
          </div>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-12 text-center">
            <FaShoppingCart className="mx-auto text-4xl text-gray-300" />

            <p className="text-gray-500 mt-4">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Payment
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Total
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => {
                  const status = getOrderStatus(order);

                  const total =
                    Number(order?.total) ||
                    Number(order?.totalAmount) ||
                    Number(order?.amount) ||
                    0;

                  return (
                    <tr
                      key={order?._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Customer */}

                      <td className="px-6 py-4">
                        <div className="font-medium">
                          {getCustomerName(order)}
                        </div>

                        <div className="text-sm text-gray-500">
                          {getCustomerEmail(order)}
                        </div>
                      </td>

                      {/* Payment */}

                      <td className="px-6 py-4">
                        <span className="capitalize">
                          {order?.paymentMethod ||
                            order?.payment?.method ||
                            "—"}
                        </span>
                      </td>

                      {/* Total */}

                      <td className="px-6 py-4 font-semibold">
                        {formatCurrency(total)}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
                            status,
                          )}`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Date */}

                      <td className="px-6 py-4 text-gray-500">
                        {formatDate(
                          order?.createdAt || order?.createdDate || order?.date,
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          LOW STOCK
      ===================================================== */}

      <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Low Stock Products</h2>

          <p className="text-gray-500 text-sm mt-1">
            Products that need attention.
          </p>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="p-10 text-center">
            <FaCheckCircle className="mx-auto text-4xl text-green-500" />

            <p className="text-gray-500 mt-4">
              All products have healthy stock levels.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {lowStockProducts.map((product) => (
              <div
                key={product?._id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {product?.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <FaBox className="text-gray-400" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {product?.name || "Unnamed Product"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {product?.category || "No category"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <FaExclamationTriangle className="text-red-500" />

                  <span
                    className={`font-semibold ${
                      Number(product?.stock || 0) === 0
                        ? "text-red-600"
                        : "text-orange-600"
                    }`}
                  >
                    {Number(product?.stock || 0) === 0
                      ? "Out of stock"
                      : `${product.stock} left`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
