import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useState } from "react";
import axios from "axios";

const API_URL = "https://euphoria-ooqv.onrender.com/api/contact";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(API_URL, {
        name,
        email,
        subject,
        message,
      });

      if (response.data?.success) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(
          response.data?.message ||
            "Unable to send your message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);

      const backendMessage =
        error.response?.data?.message || error.response?.data?.error;

      alert(
        backendMessage || "Failed to send message. Please try again later.",
      );
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
              Let's Start a<span className="block italic">Conversation</span>
            </h1>

            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
              Whether it's a question, collaboration, custom order, or simply
              saying hello, we'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Side */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="mb-12">
                <p className="uppercase text-xs tracking-[0.3em] text-gray-400 mb-3">
                  Email
                </p>

                <a
                  href="mailto:kadampratiksha869@gmail.com"
                  className="text-xl font-light hover:text-[#8b5e3c] transition"
                >
                  kadampratiksha869@gmail.com
                </a>
              </div>

              <div className="mb-12">
                <p className="uppercase text-xs tracking-[0.3em] text-gray-400 mb-3">
                  Phone
                </p>

                <p className="text-xl font-light text-gray-500">
                  Phone support coming soon
                </p>
              </div>

              <div>
                <p className="uppercase text-xs tracking-[0.3em] text-gray-400 mb-3">
                  Location
                </p>

                <p className="text-xl font-light">Pune, Maharashtra</p>
              </div>
            </div>

            {/* Right Side Form */}
            <div className="lg:col-span-8 bg-white rounded-[40px] p-8 md:p-14 shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    disabled={loading}
                    className="
                                            w-full
                                            border-b
                                            border-gray-300
                                            py-4
                                            bg-transparent
                                            outline-none
                                            focus:border-black
                                            transition
                                            disabled:opacity-50
                                        "
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    disabled={loading}
                    className="
                                            w-full
                                            border-b
                                            border-gray-300
                                            py-4
                                            bg-transparent
                                            outline-none
                                            focus:border-black
                                            transition
                                            disabled:opacity-50
                                        "
                  />
                </div>

                {/* Subject */}
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  disabled={loading}
                  className="
                                        w-full
                                        border-b
                                        border-gray-300
                                        py-4
                                        bg-transparent
                                        outline-none
                                        focus:border-black
                                        transition
                                        disabled:opacity-50
                                    "
                />

                {/* Message */}
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={2000}
                  disabled={loading}
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
                                        disabled:opacity-50
                                    "
                />

                {/* Submit */}
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
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                    "
                >
                  {loading ? "Sending..." : "Send Message"}
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
