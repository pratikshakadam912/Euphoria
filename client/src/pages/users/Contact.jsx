import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useState } from "react";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiSend,
} from "react-icons/fi";

import contactbg from "../../assets/img/contactbg.jpg";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log({
            name,
            email,
            message,
        });

        alert("Message sent successfully!");

        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <>
            <Navbar />

            <section
                className="relative min-h-screen flex items-center justify-center py-20 px-6"
                style={{
                    backgroundImage: `url(${contactbg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 max-w-6xl w-full">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">

                        {/* LEFT SIDE */}
                        <div className="text-white">
                            <p className="uppercase tracking-[4px] text-sm text-gray-300 mb-3">
                                Contact Us
                            </p>

                            <h1 className="text-5xl font-light leading-tight mb-6">
                                We'd Love To
                                <span className="block font-semibold">
                                    Hear From You
                                </span>
                            </h1>

                            <p className="text-gray-300 mb-10 max-w-md">
                                Have questions about our collections,
                                orders, or collaborations? Reach out
                                and our team will get back to you as
                                soon as possible.
                            </p>

                            <div className="space-y-6">

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        <FiMail size={20} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Email
                                        </p>

                                        <p>
                                            support@yourbrand.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        <FiPhone size={20} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Phone
                                        </p>

                                        <p>
                                            +91 98765 43210
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                        <FiMapPin size={20} />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Location
                                        </p>

                                        <p>
                                            Bangalore, Karnataka
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE FORM */}
                        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                            <h2 className="text-3xl text-white font-light mb-8">
                                Send a Message
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
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
                                        px-5
                                        py-4
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/20
                                        text-white
                                        placeholder-gray-300
                                        focus:outline-none
                                        focus:border-white
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
                                        px-5
                                        py-4
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/20
                                        text-white
                                        placeholder-gray-300
                                        focus:outline-none
                                        focus:border-white
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
                                        px-5
                                        py-4
                                        rounded-xl
                                        bg-white/10
                                        border
                                        border-white/20
                                        text-white
                                        placeholder-gray-300
                                        focus:outline-none
                                        focus:border-white
                                        resize-none
                                    "
                                />

                                <button
                                    type="submit"
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        py-4
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-[#8b5e3c]
                                        to-[#c79a74]
                                        text-white
                                        font-medium
                                        hover:scale-[1.02]
                                        transition-all
                                        duration-300
                                    "
                                >
                                    <FiSend />
                                    Send Message
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