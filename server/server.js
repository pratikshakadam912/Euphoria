import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import websiteRoutes from "./routes/websiteRoutes.js";

dotenv.config();

// ✅ CREATE APP
const app = express();

// ✅ CORS (FIXED for frontend connection)
app.use(
  cors({
    origin: "https://euphoria-nine-swart.vercel.app",
    credentials: true,
  }),
);

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ ROUTES
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // ✅ FIXED HERE
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/website", websiteRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Working");
});

// ✅ DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ SERVER (FIXED FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
