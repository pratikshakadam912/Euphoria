import React from "react";


import Hero from "../../components/common/Hero";
import ProductSection from "../../components/product/ProductSection";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SignatureCollection from "../../components/product/SignatureCollection";
import EuphoriaEdit from "../../components/product/EuphoriaEdits";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ProductSection />
            <SignatureCollection />
            <EuphoriaEdit />
            <Footer />
        </>
    );
}
