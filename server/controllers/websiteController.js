import Website from "../models/Website.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

// Get all website sections
export const getWebsite = async (req, res) => {
  try {
    const sections = await Website.find().populate("products");

    res.json(sections);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one section
export const getSection = async (req, res) => {
  try {
    const section = await Website.findOne({
      section: req.params.section,
    }).populate("products");

    res.json(section);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create or Update
export const saveSection = async (req, res) => {
  try {
    let imageUrls = [];

    // Upload images to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "euphoria-homepage",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        imageUrls.push(result.secure_url);
      }
    }

    const section = await Website.findOneAndUpdate(
      {
        section: req.params.section,
      },
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,

        buttonOne: req.body.buttonOne ? JSON.parse(req.body.buttonOne) : {},

        buttonTwo: req.body.buttonTwo ? JSON.parse(req.body.buttonTwo) : {},

        products: req.body.products ? JSON.parse(req.body.products) : [],

        images:
          imageUrls.length > 0
            ? imageUrls
            : req.body.images
              ? JSON.parse(req.body.images)
              : [],

        banner: imageUrls.length > 0 ? imageUrls[0] : req.body.banner || "",
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.json(section);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete section
export const deleteSection = async (req, res) => {
  try {
    await Website.findOneAndDelete({
      section: req.params.section,
    });

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
