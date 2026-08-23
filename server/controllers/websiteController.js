import Website from "../models/Website.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

// ======================================================
// GET ALL WEBSITE SECTIONS
// ======================================================

export const getWebsite = async (req, res) => {
  try {
    const sections = await Website.find()
      .populate(
        "products",
        "name price images fabric description category collection stock featured",
      )
      .lean();

    res.status(200).json(sections);
  } catch (error) {
    console.error("Get website error:", error);

    res.status(500).json({
      message: "Failed to fetch website sections",
      error: error.message,
    });
  }
};

// ======================================================
// GET SINGLE WEBSITE SECTION
// ======================================================

export const getSection = async (req, res) => {
  try {
    const section = await Website.findOne({
      section: req.params.section,
    }).populate(
      "products",
      "name price images fabric description category collection stock featured",
    );

    if (!section) {
      return res.status(404).json({
        message: "Website section not found",
      });
    }

    res.status(200).json(section);
  } catch (error) {
    console.error("Get section error:", error);

    res.status(500).json({
      message: "Failed to fetch website section",
      error: error.message,
    });
  }
};

// ======================================================
// CREATE / UPDATE WEBSITE SECTION
// ======================================================

export const saveSection = async (req, res) => {
  try {
    const { section } = req.params;

    // --------------------------------------------
    // Existing banner
    // --------------------------------------------

    let banner = req.body.banner || "";

    // --------------------------------------------
    // Upload new banner to Cloudinary
    // --------------------------------------------

    if (req.files && req.files.length > 0) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "euphoria-website",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        streamifier.createReadStream(req.files[0].buffer).pipe(uploadStream);
      });

      banner = result.secure_url;
    }

    // --------------------------------------------
    // Parse Products
    // --------------------------------------------

    let products = req.body.products || [];

    if (typeof products === "string") {
      try {
        products = JSON.parse(products);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid products data",
        });
      }
    }

    // --------------------------------------------
    // Parse Button One
    // --------------------------------------------

    let buttonOne = req.body.buttonOne || {};

    if (typeof buttonOne === "string") {
      try {
        buttonOne = JSON.parse(buttonOne);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid buttonOne data",
        });
      }
    }

    // --------------------------------------------
    // Parse Button Two
    // --------------------------------------------

    let buttonTwo = req.body.buttonTwo || {};

    if (typeof buttonTwo === "string") {
      try {
        buttonTwo = JSON.parse(buttonTwo);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid buttonTwo data",
        });
      }
    }

    // --------------------------------------------
    // Prepare update
    // --------------------------------------------

    const updateData = {
      title: req.body.title || "",
      subtitle: req.body.subtitle || "",
      description: req.body.description || "",

      buttonOne,
      buttonTwo,

      products,

      banner,
    };

    // --------------------------------------------
    // Create / Update section
    // --------------------------------------------

    const updatedSection = await Website.findOneAndUpdate(
      {
        section,
      },
      {
        $set: updateData,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    ).populate(
      "products",
      "name price images fabric description category collection stock featured",
    );

    // --------------------------------------------
    // Response
    // --------------------------------------------

    res.status(200).json({
      message: "Website section saved successfully",
      section: updatedSection,
    });
  } catch (error) {
    console.error("Save website section error:", error);

    res.status(500).json({
      message: "Failed to save website section",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE WEBSITE SECTION
// ======================================================

export const deleteSection = async (req, res) => {
  try {
    const deletedSection = await Website.findOneAndDelete({
      section: req.params.section,
    });

    if (!deletedSection) {
      return res.status(404).json({
        message: "Website section not found",
      });
    }

    res.status(200).json({
      message: "Website section deleted successfully",
    });
  } catch (error) {
    console.error("Delete website section error:", error);

    res.status(500).json({
      message: "Failed to delete website section",
      error: error.message,
    });
  }
};
