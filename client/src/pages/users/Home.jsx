import { useEffect, useState } from "react";

import Hero from "../../components/common/Hero";
import ProductSection from "../../components/product/ProductSection";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import SignatureCollection from "../../components/product/SignatureCollection";
import EuphoriaEdit from "../../components/product/EuphoriaEdits";

export default function Home() {
  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await fetch(
          "https://euphoria-ooqv.onrender.com/api/website",
        );

        if (!res.ok) {
          throw new Error("Failed to load website data");
        }

        const data = await res.json();

        setWebsiteData(data);
      } catch (error) {
        console.error("Website API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gray-500">
            Loading Euphoria
          </p>
        </div>
      </div>
    );
  }

  /*
    Backend returns:

    [
      {
        section: "hero",
        ...
      },
      {
        section: "curated",
        ...
      },
      {
        section: "signature",
        ...
      },
      {
        section: "edit",
        ...
      }
    ]
  */

  const heroData = websiteData?.find((item) => item.section === "hero") || null;

  const curatedData =
    websiteData?.find((item) => item.section === "curated") || null;

  const signatureData =
    websiteData?.find((item) => item.section === "signature") || null;

  const editData = websiteData?.find((item) => item.section === "edit") || null;

  return (
    <>
      <Navbar />

      <Hero heroData={heroData} />

      <ProductSection curatedData={curatedData} />

      <SignatureCollection signatureData={signatureData} />

      <EuphoriaEdit editData={editData} />

      <Footer />
    </>
  );
}
