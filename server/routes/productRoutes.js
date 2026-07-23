import express from "express";
import multer from "multer";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", upload.array("images", 10), createProduct);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
