import Website from "../models/Website.js";

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
    const section = await Website.findOneAndUpdate(
      {
        section: req.params.section,
      },
      req.body,
      {
        new: true,
        upsert: true,
      },
    );

    res.json(section);
  } catch (error) {
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
