import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useState } from "react";
import axios from "axios";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                "https://euphoria-backend.onrender.com/api/contact",
                {
                    name,
                    email,
                    subject,
                    message,
                }
            );

            if (response.data.success) {
                alert("Message sent successfully!");

                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <section className="bg-[#f8f5f1] min-h-screen py-32 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-24">
                        <p className="uppercase tracking-[0.4em] text-[#8b5e3c] text-sm mb-4">
                            Contact Euphoria
                        </p>

                        <h1 className="text-5xl md:text-7xl font-light text-black leading-tight">
                            Let's Start a
                            <span className="block italic">
                                Conversation
                            </span>
                        </h1>

                        <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
                            Whether it's a question, collaboration,
                            custom order, or simply saying hello,
                            we'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Left Side */}
                        <div className="lg:col-span-4 flex flex-col justify-center">

                            <div className="mb-12">
                                <p className="uppercase text-xs tracking-[0.3em] text-gray-400 mb-3">
                                    Email
                                </p>

                                <p className="text-xl font-light">
                                    kadampratiksha869@gmail.com
                                </p>
                            </div>

                            <div className="mb-12">
                                <p className="uppercase text-xs tracking-[0.3em] text-gray-400 mb-3">
                                    Phone
                                </p>

                                <p className="text-xl font-light">
                                    +91 XXXXX XXXXX
                                </p>
                            </div>

                            <div>
                                <p className="uppercase text-xs tracking-[0.3em] text-gray-400 mb-3">
                                    Location
                                </p>

                                <p className="text-xl font-light">
                                    Pune, Maharashtra
                                </p>
                            </div>
                        </div>

                        {/* Right Side Form */}
                        <div className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-14 shadow-sm border border-gray-100">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-10"
                            >

                                <div className="grid md:grid-cols-2 gap-8">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        className="
                                            w-full
                                            border-b
                                            border-gray-300
                                            py-4
                                            bg-transparent
                                            outline-none
                                            focus:border-black
                                            transition
                                        "
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="
                                            w-full
                                            border-b
                                            border-gray-300
                                            py-4
                                            bg-transparent
                                            outline-none
                                            focus:border-black
                                            transition
                                        "
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) =>
                                        setSubject(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        border-b
                                        border-gray-300
                                        py-4
                                        bg-transparent
                                        outline-none
                                        focus:border-black
                                        transition
                                    "
                                />

                                <textarea
                                    rows="6"
                                    placeholder="Write your message..."
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    required
                                    className="
                                        w-full
                                        border-b
                                        border-gray-300
                                        py-4
                                        bg-transparent
                                        outline-none
                                        resize-none
                                        focus:border-black
                                        transition
                                    "
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        px-10
                                        py-4
                                        rounded-full
                                        bg-black
                                        text-white
                                        hover:bg-[#8b5e3c]
                                        transition-all
                                        duration-300
                                    "
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send Message"}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;