import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <AppRoutes />
    </WishlistProvider>
  );
}
