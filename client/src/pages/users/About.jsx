
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import about1 from "../../assets/img/about1.jpg";
import about2 from "../../assets/img/about2.jpg";

const About = () => {
    return (
        <>
            <Navbar />

            {/* HERO */}
            <section className="bg-[#f7f5f2] py-32 text-center">
                <h1 className="text-5xl md:text-6xl font-serif text-black tracking-wide mb-4">
                    About EUPHORIA
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                    EUPHORIA is a curated fashion brand, redefining elegance, individuality, and confidence
                    through every carefully crafted piece.
                </p>
            </section>

            {/* ABOUT SECTIONS */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* LEFT IMAGE */}
                <div className="overflow-hidden rounded-3xl shadow-xl group">
                    <img
                        src={about1}
                        alt="Our Story"
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
                    />
                </div>

                {/* RIGHT TEXT */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-light text-black">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Founded with a vision to combine contemporary fashion with timeless elegance,
                        EUPHORIA creates pieces that speak to modern individuals seeking sophistication
                        and style. Each collection embodies creativity, craftsmanship, and the essence
                        of luxury.
                    </p>
                </div>
            </section>

            {/* SECOND SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* LEFT TEXT */}
                <div className="space-y-6 order-2 md:order-1">
                    <h2 className="text-3xl font-light text-black">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To inspire confidence and individuality, EUPHORIA is committed to creating
                        fashion that not only looks exquisite but feels exceptional. Our brand is a
                        celebration of elegance, modernity, and the art of dressing with intention.
                    </p>
                </div>

                {/* RIGHT IMAGE */}
                <div className="overflow-hidden rounded-3xl shadow-xl group order-1 md:order-2">
                    <img
                        src={about2}
                        alt="Our Vision"
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
                    />
                </div>
            </section>

            {/* BRAND QUOTE / CALL TO ACTION */}
            <section className="bg-[#f7f5f2] py-32 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
                    “Fashion is the ultimate expression of individuality.”
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
                    Explore our collections and discover the essence of EUPHORIA.
                </p>
            </section>

            <Footer />
        </>
    );
};

export default About;
