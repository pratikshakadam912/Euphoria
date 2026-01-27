import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* TOP SECTION */}
                <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">

                    {/* BRAND */}
                    <div>
                        <h2 className="text-2xl tracking-widest font-light mb-4">
                            EUPHORIA
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Euphoria is a contemporary fashion brand focused on elegance,
                            individuality, and modern luxury.
                        </p>
                    </div>

                    {/* SHOP */}
                    <div>
                        <h3 className="uppercase text-sm tracking-wider mb-4">
                            Shop
                        </h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-white cursor-pointer">New Arrivals</li>
                            <li className="hover:text-white cursor-pointer">Collections</li>
                            <li className="hover:text-white cursor-pointer">Best Sellers</li>
                            <li className="hover:text-white cursor-pointer">Lookbook</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="uppercase text-sm tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-white cursor-pointer">About Us</li>
                            <li className="hover:text-white cursor-pointer">Careers</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        </ul>
                    </div>

                    {/* SOCIAL */}
                    <div>
                        <h3 className="uppercase text-sm tracking-wider mb-4">
                            Follow Us
                        </h3>
                        <div className="flex gap-4">
                            <a className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
                                <FaInstagram size={16} />
                            </a>
                            <a className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
                                <FaFacebookF size={16} />
                            </a>
                            <a className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
                                <FaTwitter size={16} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM SECTION */}
                <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Euphoria. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">
                        Designed with elegance ✨
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
