import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    // ✅ EMAIL SIGNUP
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // 🔥 SAVE TO FIRESTORE
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: "user"
            });

            // 🔥 SEND TO BACKEND
            await fetch("https://euphoria-ooqv.onrender.com/api/users/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: user.uid,
                    name: name,
                    email: email
                })
            });

            // ✅ Save in localStorage
            localStorage.setItem(
                "user",
                JSON.stringify({
                    uid: user.uid,
                    email: user.email
                })
            );

            toast.success("Signup successful!");
            navigate("/");

        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ GOOGLE SIGNUP
    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // 🔥 SAVE TO FIRESTORE
            await setDoc(
                doc(db, "users", user.uid),
                {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "user"
                },
                { merge: true }
            );

            // 🔥 SEND TO BACKEND
            await fetch("https://euphoria-ooqv.onrender.com/api/users/save", {
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

            localStorage.setItem(
                "user",
                JSON.stringify({
                    uid: user.uid,
                    email: user.email
                })
            );

            toast.success("Google Signup successful!");
            navigate("/");

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
                        Create Your Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border rounded-xl"
                        />

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

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full p-3 border rounded-xl"
                        />

                        <button className="w-full bg-black text-white p-3 rounded-xl">
                            Sign Up
                        </button>
                    </form>

                    <div className="flex items-center my-5">
                        <hr className="flex-1" />
                        <span className="mx-3 text-sm">OR</span>
                        <hr className="flex-1" />
                    </div>

                    <button
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center gap-3 border p-3 rounded-xl"
                    >
                        <FcGoogle size={24} />
                        Sign up with Google
                    </button>

                    <p className="text-center mt-5">
                        Already have an account? Login
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Signup;