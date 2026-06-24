import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/contact",
                formData
            );

            if (response.data.success) {
                alert("Message sent successfully!");

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            }
        } catch (error) {
            console.error(error);
            alert("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[#f8f5f1] min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-14">
                    <p className="uppercase tracking-[0.3em] text-[#8b5e3c] text-sm">
                        Contact Us
                    </p>

                    <h1 className="text-5xl md:text-6xl font-light mt-4">
                        We'd Love To Hear
                        <span className="block italic">
                            From You
                        </span>
                    </h1>

                    <p className="mt-6 text-gray-600">
                        Have a question, suggestion, or business inquiry?
                        Send us a message.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-[2rem] shadow-lg p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-2 gap-6">

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border border-gray-200 rounded-xl p-4 outline-none focus:border-black"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border border-gray-200 rounded-xl p-4 outline-none focus:border-black"
                        />
                    </div>

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full mt-6 border border-gray-200 rounded-xl p-4 outline-none focus:border-black"
                    />

                    <textarea
                        name="message"
                        rows="6"
                        placeholder="Your Message..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full mt-6 border border-gray-200 rounded-xl p-4 outline-none focus:border-black resize-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 bg-black text-white px-8 py-4 rounded-full hover:bg-[#8b5e3c] transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

            </div>
        </section>
    );
};

export default Contact;