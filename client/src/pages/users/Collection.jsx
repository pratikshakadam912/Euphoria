
import Footer from "../../components/common/Footer";



import Navbar from "../../components/common/Navbar";
import CollectionHero from "../../components/Collection/CollectionHero";
import CollectionGrid from "../../components/Collection/CollectionGrid";
import CollectionSidebar from "../../components/Collection/CollectionSidebar";

const Collection = () => {
    return (
        <>
            <Navbar />

            <CollectionHero />

            <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-16">

                {/* SIDEBAR */}
                <div className="md:col-span-1">
                    <CollectionSidebar />
                </div>

                {/* PRODUCTS */}
                <div className="md:col-span-3">
                    <CollectionGrid />
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Collection;
