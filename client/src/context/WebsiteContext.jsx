import { createContext, useContext, useEffect, useState } from "react";

const WebsiteContext = createContext(null);

export const WebsiteProvider = ({ children }) => {
  const [website, setWebsite] = useState({
    hero: null,
    curated: null,
    signature: null,
    edit: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const res = await fetch(
          "https://euphoria-ooqv.onrender.com/api/website",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch website data");
        }

        const data = await res.json();

        // Backend returns an array of sections
        const sections = Array.isArray(data) ? data : [];

        setWebsite({
          hero: sections.find((item) => item.section === "hero") || null,

          curated: sections.find((item) => item.section === "curated") || null,

          signature:
            sections.find((item) => item.section === "signature") || null,

          edit: sections.find((item) => item.section === "edit") || null,
        });
      } catch (error) {
        console.error("Website API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, []);

  return (
    <WebsiteContext.Provider value={{ website, loading }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);

  if (!context) {
    throw new Error("useWebsite must be used inside WebsiteProvider");
  }

  return context;
};
