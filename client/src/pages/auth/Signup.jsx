import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../Firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";






const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                email: email,
            });


            console.log("User signed up:", userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            await setDoc(
                doc(db, "users", user.uid),
                {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                },
                { merge: true }
            );

            console.log("Google user:", user);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <Navbar />

            {/* MAIN SIGNUP SECTION */}
            <section className="min-h-[90vh] flex items-center justify-center bg-[#f7f5f2] py-20">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">

                    <h2 className="text-3xl font-light text-center text-black mb-6">
                        Create Your Account
                    </h2>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
                        />

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-[#8b5e3c] transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* OR separator */}
                    <div className="flex items-center my-5">
                        <hr className="flex-1 border-gray-300" />
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Google signup */}
                    <button
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:shadow-md transition"
                    >
                        <FcGoogle size={24} />
                        <span className="text-gray-700 font-medium">Sign up with Google</span>
                    </button>

                    {/* Login link */}
                    <p className="text-center text-gray-500 text-sm mt-5">
                        Already have an account?{" "}
                        <span className="text-black cursor-pointer hover:underline">
                            Login
                        </span>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Signup;
