import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ✅ EMAIL LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // 🔥 SAVE TO FIRESTORE
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: user.email,
                    name: user.displayName || "User",
                    role: "user"
                });
            }

            // 🔥 SEND TO BACKEND
            const saveRes = await fetch("https://euphoria-ooqv.onrender.com/api/user/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: user.uid,
                    name: user.displayName || "User",
                    email: user.email
                })
            });

            if (!saveRes.ok) {
                console.log("Error saving user to backend");
            }

            // 🔥 GET CURRENT USER (FIXED)
            const res = await fetch(
                `https://euphoria-ooqv.onrender.com/api/users/${user.email}`
            );

            if (!res.ok) {
                console.log("Error fetching user");
                return;
            }

            const currentUser = await res.json();

            // ✅ SAVE USER WITH ROLE
            localStorage.setItem(
                "user",
                JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    role: currentUser?.role || "user"
                })
            );

            toast.success("Login successful!");

            // 🚀 REDIRECT BASED ON ROLE
            if (currentUser?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ GOOGLE LOGIN
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            // 🔥 SAVE TO FIRESTORE
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "user"
                });
            }

            // 🔥 SEND TO BACKEND
            const saveRes = await fetch("https://euphoria-ooqv.onrender.com/api/users/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email
                })
            });

            if (!saveRes.ok) {
                console.log("Error saving user to backend");
            }

            // 🔥 GET CURRENT USER (FIXED)
            const res = await fetch(
                `https://euphoria-ooqv.onrender.com/api/users/${user.email}`
            );

            if (!res.ok) {
                console.log("Error fetching user");
                return;
            }

            const currentUser = await res.json();

            // ✅ SAVE USER WITH ROLE
            localStorage.setItem(
                "user",
                JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    role: currentUser?.role || "user"
                })
            );

            toast.success("Google Login successful!");

            // 🚀 REDIRECT BASED ON ROLE
            if (currentUser?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Navbar />

            <section className="min-h-[90vh] flex items-center justify-center bg-[#f7f5f2] py-20">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">

                    <h2 className="text-3xl text-center mb-6">
                        Login to Your Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-xl"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-xl"
                        />

                        <button className="w-full bg-black text-white p-3 rounded-xl">
                            Login
                        </button>
                    </form>

                    <div className="flex items-center my-5">
                        <hr className="flex-1" />
                        <span className="mx-3 text-sm">OR</span>
                        <hr className="flex-1" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border p-3 rounded-xl"
                    >
                        <FcGoogle size={24} />
                        Login with Google
                    </button>

                    <p className="text-center mt-5">
                        Don’t have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Login;