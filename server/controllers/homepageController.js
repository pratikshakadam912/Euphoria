import Product from "../models/Product.js";
import Website from "../models/Website.js";

export const getHomepageData = async (req, res) => {
  try {
    const [website, products] = await Promise.all([
      Website.findOne().populate(
        "hero.products curated.products signature.products edit.products",
      ),
      Product.find().sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      website: website || {
        hero: {
          title: "",
          subtitle: "",
          description: "",
          products: [],
        },
        curated: {
          products: [],
        },
        signature: {
          banner: "",
          products: [],
        },
        edit: {
          title: "",
          subtitle: "",
          products: [],
        },
      },

      products,
    });
  } catch (error) {
    console.error("Homepage API Error:", error);

    res.status(500).json({
      message: "Failed to load homepage data",
    });
  }
};
