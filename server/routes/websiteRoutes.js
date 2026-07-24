import express from "express";
import multer from "multer";

import {
  getWebsite,
  getSection,
  saveSection,
  deleteSection,
} from "../controllers/websiteController.js";

const router = express.Router();

// Multer Memory Storage

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

// Routes

router.get("/", getWebsite);

router.get("/:section", getSection);

// Upload multiple homepage images
router.put("/:section", upload.array("images", 20), saveSection);

router.delete("/:section", deleteSection);

export default router;
