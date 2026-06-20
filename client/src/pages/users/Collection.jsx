
import Footer from "../../components/common/Footer";
import { useState } from "react";


import Navbar from "../../components/common/Navbar";
import CollectionHero from "../../components/Collection/CollectionHero";
import CollectionGrid from "../../components/Collection/CollectionGrid";
import CollectionSidebar from "../../components/Collection/CollectionSidebar";

const Collection = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    return (
        <>
            <Navbar />

            <CollectionHero />

            <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-16">

                {/* SIDEBAR */}
                <div className="md:col-span-1">
                    <CollectionSidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                {/* PRODUCTS */}
                <div className="md:col-span-3">
                    <CollectionGrid
                        selectedCategory={selectedCategory}
                    />
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Collection;
