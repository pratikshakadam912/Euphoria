import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import {
  FiArrowLeft,
  FiMapPin,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiCheck,
} from "react-icons/fi";

const API_URL = "https://euphoria-ooqv.onrender.com";

const emptyAddress = {
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
};

const Addresses = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyAddress);

  // ======================================================
  // GET USER
  // ======================================================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");

      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error(error);

      navigate("/login");
    }
  }, [navigate]);

  // ======================================================
  // FETCH ADDRESSES
  // ======================================================

  useEffect(() => {
    if (!user?.uid) return;

    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/addresses/user/${user.uid}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load addresses");
      }

      setAddresses(data);
    } catch (error) {
      console.error("Address fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // FORM CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================================================
  // OPEN ADD FORM
  // ======================================================

  const openAddForm = () => {
    setEditingId(null);

    setForm({
      ...emptyAddress,

      email: user?.email || "",
    });

    setShowForm(true);
  };

  // ======================================================
  // OPEN EDIT FORM
  // ======================================================

  const openEditForm = (address) => {
    setEditingId(address._id);

    setForm({
      label: address.label || "home",

      fullName: address.fullName || "",

      email: address.email || "",

      phone: address.phone || "",

      addressLine: address.addressLine || "",

      city: address.city || "",

      state: address.state || "",

      postalCode: address.postalCode || "",

      country: address.country || "India",

      isDefault: address.isDefault || false,
    });

    setShowForm(true);
  };

  // ======================================================
  // SAVE ADDRESS
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) return;

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/api/addresses/${editingId}`
        : `${API_URL}/api/addresses`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          userId: user.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save address");
      }

      setShowForm(false);

      setEditingId(null);

      setForm(emptyAddress);

      await fetchAddresses();
    } catch (error) {
      console.error("Save address error:", error);

      alert(error.message || "Could not save address");
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/addresses/${id}`, {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete address");
      }

      await fetchAddresses();
    } catch (error) {
      console.error("Delete address error:", error);

      alert(error.message || "Could not delete address");
    }
  };

  // ======================================================
  // SET DEFAULT
  // ======================================================

  const handleSetDefault = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/addresses/${id}/default`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not set default address");
      }

      await fetchAddresses();
    } catch (error) {
      console.error("Default address error:", error);

      alert(error.message || "Could not update default address");
    }
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

            <div className="grid md:grid-cols-2 gap-5 mt-12">
              {[1, 2].map((item) => (
                <div key={item} className="h-64 bg-white rounded-[28px]" />
              ))}
            </div>
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

        <div className="mt-14 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="uppercase tracking-[0.45em] text-[11px] text-[#8b5e3c]">
              Your Euphoria
            </p>

            <h1 className="mt-4 text-5xl md:text-6xl font-light tracking-tight">
              Saved Addresses
            </h1>

            <p className="mt-4 text-gray-500 max-w-lg">
              Manage the addresses you use for your Euphoria deliveries.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm hover:opacity-90 transition"
          >
            <FiPlus />
            Add Address
          </button>
        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        {showForm && (
          <section className="bg-white border border-gray-100 rounded-[28px] p-7 md:p-9 mb-8">
            <div className="flex justify-between items-center mb-7">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                  {editingId ? "Edit" : "New"}
                </p>

                <h2 className="text-2xl font-light mt-2">
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-black"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              <select
                name="label"
                value={form.label}
                onChange={handleChange}
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              >
                <option value="home">Home</option>

                <option value="work">Work</option>

                <option value="other">Other</option>
              </select>

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Phone Number"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="addressLine"
                value={form.addressLine}
                onChange={handleChange}
                required
                placeholder="Address"
                className="md:col-span-2 border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                placeholder="State"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
                placeholder="Postal Code"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="border border-gray-200 p-3 rounded-lg outline-none focus:border-black"
              />

              <label className="md:col-span-2 flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={form.isDefault}
                  onChange={handleChange}
                />

                <span className="text-sm">Make this my default address</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="md:col-span-2 py-3 bg-black text-white rounded-lg disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Address"
                    : "Save Address"}
              </button>
            </form>
          </section>
        )}

        {/* ================================================= */}
        {/* ADDRESS LIST */}
        {/* ================================================= */}

        {addresses.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[32px] p-12 md:p-20 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f8f7f5] flex items-center justify-center text-3xl">
              <FiMapPin />
            </div>

            <h2 className="text-2xl font-light mt-7">No saved addresses</h2>

            <p className="text-gray-500 mt-3">
              Add your first delivery address to make checkout faster.
            </p>

            <button
              onClick={openAddForm}
              className="mt-7 px-7 py-3 bg-black text-white rounded-full text-sm"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.025)]"
              >
                {/* HEADER */}

                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#f8f7f5] flex items-center justify-center">
                      <FiMapPin />
                    </div>

                    <div>
                      <p className="font-medium capitalize">{address.label}</p>

                      {address.isDefault && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                          <FiCheck />
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(address)}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition"
                    >
                      <FiEdit3 />
                    </button>

                    <button
                      onClick={() => handleDelete(address._id)}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                {/* DETAILS */}

                <div className="mt-6 text-sm">
                  <p className="font-medium">{address.fullName}</p>

                  <p className="text-gray-500 mt-2">{address.addressLine}</p>

                  <p className="text-gray-500">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>

                  <p className="text-gray-500 mt-2">{address.phone}</p>

                  {address.email && (
                    <p className="text-gray-500 mt-1">{address.email}</p>
                  )}
                </div>

                {/* DEFAULT BUTTON */}

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    className="mt-6 text-sm font-medium hover:underline"
                  >
                    Make Default
                  </button>
                )}
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

export default Addresses;
