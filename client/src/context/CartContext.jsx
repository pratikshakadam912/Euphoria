import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const CartContext = createContext();

// ======================================================
// CART STORAGE KEY
// ======================================================

const getCartStorageKey = (user) => {
  if (user?.uid) {
    return `cart_${user.uid}`;
  }

  return "cart_guest";
};

// ======================================================
// CREATE UNIQUE CART ITEM ID
// ======================================================

const createCartItemId = (product) => {
  const productId = product.id || product._id;
  const size = product.size || "no-size";
  const color = product.color || "no-color";
  const variant = product.variant || "no-variant";

  return `${productId}-${size}-${color}-${variant}`;
};

// ======================================================
// CART PROVIDER
// ======================================================

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const [cart, setCart] = useState([]);

  // ======================================================
  // LISTEN TO FIREBASE AUTH
  // ======================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ======================================================
  // LOAD CORRECT CART WHEN USER CHANGES
  // ======================================================

  useEffect(() => {
    // Firebase has not finished checking authentication yet
    if (user === undefined) {
      return;
    }

    try {
      const storageKey = getCartStorageKey(user);

      const savedCart = localStorage.getItem(storageKey);

      if (!savedCart) {
        setCart([]);
        return;
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        setCart([]);
        return;
      }

      setCart(parsedCart);
    } catch (error) {
      console.error("Cart loading error:", error);
      setCart([]);
    }
  }, [user]);

  // ======================================================
  // SAVE CURRENT USER'S CART
  // ======================================================

  useEffect(() => {
    // Don't save anything until Firebase knows
    // whether a user is logged in.
    if (user === undefined) {
      return;
    }

    try {
      const storageKey = getCartStorageKey(user);

      localStorage.setItem(storageKey, JSON.stringify(cart));
    } catch (error) {
      console.error("Cart saving error:", error);
    }
  }, [cart, user]);

  // ======================================================
  // ADD TO CART
  // ======================================================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productId = product.id || product._id;

      const size = product.size || null;
      const color = product.color || null;
      const variant = product.variant || null;

      const cartItemId = createCartItemId({
        id: productId,
        size,
        color,
        variant,
      });

      // Check if exact same product/variant exists
      const existingItem = currentCart.find(
        (item) => item.cartItemId === cartItemId,
      );

      // ==================================================
      // EXISTING ITEM
      // ==================================================

      if (existingItem) {
        return currentCart.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // ==================================================
      // NEW ITEM
      // ==================================================

      return [
        ...currentCart,
        {
          cartItemId,

          id: productId,

          name: product.name,

          price: Number(product.price) || 0,

          image: product.image || product.images?.[0] || "",

          size,

          color,

          variant,

          quantity: Number(product.quantity) || 1,
        },
      ];
    });
  };

  // ======================================================
  // INCREASE QUANTITY
  // ======================================================

  const increaseQuantity = (cartItemId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // ======================================================
  // DECREASE QUANTITY
  // ======================================================

  const decreaseQuantity = (cartItemId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // ======================================================
  // REMOVE ITEM
  // ======================================================

  const removeFromCart = (cartItemId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  // ======================================================
  // CLEAR CART
  // ======================================================

  const clearCart = () => {
    setCart([]);
  };

  // ======================================================
  // TOTAL ITEMS
  // ======================================================

  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  // ======================================================
  // SUBTOTAL
  // ======================================================

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  // ======================================================
  // PROVIDER
  // ======================================================

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ======================================================
// USE CART
// ======================================================

export const useCart = () => useContext(CartContext);
