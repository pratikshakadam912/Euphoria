import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";


import { FcGoogle } from "react-icons/fc"; // Google icon
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            toast.success("Login successfull")

            navigate("/");


            console.log("User logged in:", userCredential.user);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            await setDoc(
                doc(db, "users", user.uid),
                {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                },
                { merge: true } // IMPORTANT
            );

            toast.success("Google Login successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <>
            <Navbar />

            {/* MAIN LOGIN SECTION */}
            <section className="min-h-[90vh] flex items-center justify-center bg-[#f7f5f2] py-20">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">

                    <h2 className="text-3xl font-light text-center text-black mb-6">
                        Login to Your Account
                    </h2>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-[#8b5e3c] transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* OR separator */}
                    <div className="flex items-center my-5">
                        <hr className="flex-1 border-gray-300" />
                        <span className="mx-3 text-gray-500 text-sm">OR</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>

                    {/* Google login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:shadow-md transition"
                    >
                        <FcGoogle size={24} />
                        <span className="text-gray-700 font-medium">Login with Google</span>
                    </button>

                    {/* Signup link */}
                    <p className="text-center text-gray-500 text-sm mt-5">
                        Don’t have an account?{" "}
                        <span className="text-black cursor-pointer hover:underline">

                            <Link to="/signup">Sign Up</Link>
                        </span>
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Login;
