import express from "express";

import {
  getWebsite,
  getSection,
  saveSection,
  deleteSection,
} from "../controllers/websiteController.js";

const router = express.Router();

router.get("/", getWebsite);

router.get("/:section", getSection);

router.put("/:section", saveSection);

router.delete("/:section", deleteSection);

export default router;
