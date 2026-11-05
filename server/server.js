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
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "https://euphoria-nine-swart.vercel.app",
    credentials: true,
  }),
);

// Middleware
app.use(express.json());

// Health check (doesn't require database connection)
app.get("/", (req, res) => {
  res.send("Euphoria Server Working");
});

// Reuse MongoDB connection across requests
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB(req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  if (!process.env.MONGO_URI) {
    return res.status(500).json({
      message: "MongoDB connection string is missing",
    });
  }

  try {
    if (!cached.promise) {
      cached.promise = mongoose
        .connect(process.env.MONGO_URI)
        .then(() => mongoose)
        .catch((error) => {
          cached.promise = null;
          throw error;
        });
    }

    cached.conn = await cached.promise;
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
}

// Connect database before API requests
app.use("/api", connectDB);

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/website", websiteRoutes);
app.use("/api/payment", paymentRoutes);

// Export app for Vercel
export default app;

// Run local/Render server only outside Vercel
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
