import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

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
  // ==================================================
  // LOAD CART
  // ==================================================

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart;
    } catch (error) {
      console.error("Cart loading error:", error);

      return [];
    }
  });

  // ==================================================
  // SAVE CART
  // ==================================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ==================================================
  // ADD TO CART
  // ==================================================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productId = product.id || product._id;

      const size = product.size || null;

      const color = product.color || null;

      const variant = product.variant || null;

      // ------------------------------------------
      // CREATE UNIQUE ID FOR THIS CART LINE
      // ------------------------------------------

      const cartItemId = createCartItemId({
        id: productId,
        size,
        color,
        variant,
      });

      // ------------------------------------------
      // CHECK SAME VARIANT
      // ------------------------------------------

      const existingItem = currentCart.find(
        (item) => item.cartItemId === cartItemId,
      );

      // ------------------------------------------
      // SAME PRODUCT + SAME VARIANT
      // ------------------------------------------

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

      // ------------------------------------------
      // NEW CART ITEM
      // ------------------------------------------

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

  // ==================================================
  // INCREASE QUANTITY
  // ==================================================

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

  // ==================================================
  // DECREASE QUANTITY
  // ==================================================

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

  // ==================================================
  // REMOVE ITEM
  // ==================================================

  const removeFromCart = (cartItemId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  // ==================================================
  // CLEAR CART
  // ==================================================

  const clearCart = () => {
    setCart([]);
  };

  // ==================================================
  // TOTAL ITEMS
  // ==================================================

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // ==================================================
  // SUBTOTAL
  // ==================================================

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0,
  );

  // ==================================================
  // PROVIDER
  // ==================================================

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
// CUSTOM HOOK
// ======================================================

export const useCart = () => useContext(CartContext);
