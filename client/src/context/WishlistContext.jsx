import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

const API_URL = "https://euphoria-ooqv.onrender.com";

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);

  // ======================================================
  // GET CURRENT USER
  // ======================================================

  const getUser = () => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      console.error("User loading error:", error);

      return null;
    }
  };

  // ======================================================
  // FETCH WISHLIST
  // ======================================================

  const fetchWishlist = async () => {
    const user = getUser();

    if (!user?.uid) {
      setWishlist([]);

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/wishlist/user/${user.uid}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load wishlist");
      }

      setWishlist(data);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // LOAD WISHLIST
  // ======================================================

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ======================================================
  // ADD
  // ======================================================

  const addToWishlist = async (product) => {
    const user = getUser();

    if (!user?.uid) {
      alert("Please login to save products");

      return false;
    }

    const productId = product.id || product._id;

    try {
      const response = await fetch(`${API_URL}/api/wishlist`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.uid,

          productId,

          name: product.name,

          price: Number(product.price) || 0,

          image: product.image || product.images?.[0] || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add to wishlist");
      }

      await fetchWishlist();

      return true;
    } catch (error) {
      console.error("Add wishlist error:", error);

      alert(error.message || "Could not add to wishlist");

      return false;
    }
  };

  // ======================================================
  // REMOVE
  // ======================================================

  const removeFromWishlist = async (productId) => {
    const user = getUser();

    if (!user?.uid) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/wishlist/${user.uid}/${productId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not remove wishlist item");
      }

      setWishlist((current) =>
        current.filter((item) => item.productId !== productId),
      );
    } catch (error) {
      console.error("Remove wishlist error:", error);

      alert(error.message || "Could not remove item");
    }
  };

  // ======================================================
  // TOGGLE
  // ======================================================

  const toggleWishlist = async (product) => {
    const productId = product.id || product._id;

    const exists = wishlist.some((item) => item.productId === productId);

    if (exists) {
      await removeFromWishlist(productId);

      return false;
    } else {
      return await addToWishlist(product);
    }
  };

  // ======================================================
  // CHECK
  // ======================================================

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,

        loading,

        addToWishlist,

        removeFromWishlist,

        toggleWishlist,

        isInWishlist,

        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
