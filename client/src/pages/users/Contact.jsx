import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useState } from "react";
import contactbg from "../../assets/img/contactbg.jpg";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, message });
        // TODO: send to backend or email
    };

    return (
        <>
            <Navbar />

            {/* HERO / BG IMAGE */}
            <section
                className="min-h-[80vh] flex items-center justify-center"
                style={{
                    backgroundImage: `url(${contactbg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl max-w-md w-full p-10">
                    <h2 className="text-3xl font-light text-center text-black mb-6">
                        Get in Touch
                    </h2>

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
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={5}
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
                        />

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-xl hover:bg-[#8b5e3c] transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
