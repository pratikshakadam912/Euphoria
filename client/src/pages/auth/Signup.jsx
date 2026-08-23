import { useState } from "react";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { FcGoogle } from "react-icons/fc";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../../firebase/firebaseConfig";

import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

const API_URL = "https://euphoria-ooqv.onrender.com";

const Signup = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // EMAIL SIGNUP
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // CREATE FIREBASE ACCOUNT
      // =================================================

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const firebaseUser = userCredential.user;

      // =================================================
      // SAVE USER TO MONGODB
      // =================================================

      const response = await fetch(`${API_URL}/api/users/signup`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          uid: firebaseUser.uid,
          name: name.trim(),
          email: firebaseUser.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user profile.");
      }

      // =================================================
      // SAVE USER LOCALLY
      // =================================================

      const savedUser = {
        uid: firebaseUser.uid,
        name: name.trim(),
        email: firebaseUser.email,
        role: data.user?.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(savedUser));

      // =================================================
      // SUCCESS
      // =================================================

      toast.success("Account created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(error?.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE SIGNUP / LOGIN
  // =====================================================

  const handleGoogleSignup = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // =================================================
      // FIREBASE GOOGLE AUTH
      // =================================================

      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      // =================================================
      // SAVE / CREATE USER IN MONGODB
      // =================================================

      const response = await fetch(`${API_URL}/api/users/signup`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Euphoria User",
          email: firebaseUser.email,
        }),
      });

      const data = await response.json();

      // =================================================
      // EXISTING GOOGLE USER
      // =================================================

      if (!response.ok) {
        // If the account already exists, fetch the existing
        // MongoDB user instead of treating Google login as failed.

        if (response.status === 400) {
          const existingUserResponse = await fetch(
            `${API_URL}/api/users/uid/${firebaseUser.uid}`,
          );

          const existingUserData = await existingUserResponse.json();

          if (existingUserResponse.ok) {
            const existingUser = existingUserData;

            localStorage.setItem(
              "user",
              JSON.stringify({
                uid: firebaseUser.uid,
                name:
                  existingUser.name ||
                  firebaseUser.displayName ||
                  "Euphoria User",
                email: existingUser.email || firebaseUser.email,
                role: existingUser.role || "user",
              }),
            );

            toast.success("Welcome back!");

            navigate("/");

            return;
          }
        }

        throw new Error(data.message || "Failed to create user profile.");
      }

      // =================================================
      // SAVE USER LOCALLY
      // =================================================

      const savedUser = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || data.user?.name || "Euphoria User",
        email: firebaseUser.email,
        role: data.user?.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(savedUser));

      // =================================================
      // SUCCESS
      // =================================================

      toast.success("Google signup successful!");

      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);

      toast.error(error?.message || "Unable to continue with Google.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <Navbar />

      <section className="min-h-[90vh] flex items-center justify-center bg-[#f7f5f2] py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          {/* HEADER */}

          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b5e3c]">
              Euphoria
            </p>

            <h2 className="text-3xl font-light mt-3">Create Your Account</h2>

            <p className="text-sm text-gray-500 mt-3">
              Join Euphoria and discover your style.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3.5 border border-gray-200 rounded-xl outline-none focus:border-black transition disabled:bg-gray-100"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3.5 border border-gray-200 rounded-xl outline-none focus:border-black transition disabled:bg-gray-100"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3.5 border border-gray-200 rounded-xl outline-none focus:border-black transition disabled:bg-gray-100"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3.5 border border-gray-200 rounded-xl outline-none focus:border-black transition disabled:bg-gray-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-3.5 rounded-xl hover:bg-[#8b5e3c] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* DIVIDER */}

          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-200" />

            <span className="mx-3 text-xs text-gray-400">OR</span>

            <hr className="flex-1 border-gray-200" />
          </div>

          {/* GOOGLE */}

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 p-3.5 rounded-xl hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={22} />

            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          {/* LOGIN */}

          <p className="text-center text-sm text-gray-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Signup;
