import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ================================
  // LOAD CART FROM LOCAL STORAGE
  // ================================

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // ================================
  // SAVE CART TO LOCAL STORAGE
  // ================================

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ================================
  // ADD TO CART
  // ================================

  const addToCart = (product) => {
    setCart((prevCart) => {
      /*
       * IMPORTANT
       *
       * Same product + same size = same cart item
       *
       * Same product + different size = different cart item
       */

      const existingProduct = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color,
      );

      // ================================
      // PRODUCT ALREADY EXISTS
      // ================================

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      // ================================
      // NEW CART ITEM
      // ================================

      return [
        ...prevCart,

        {
          id: product.id,

          name: product.name,

          price: product.price,

          image: product.image || product.images?.[0] || "",

          // SELECTED OPTIONS
          size: product.size || null,

          color: product.color || null,

          // In case you later add other variants
          variant: product.variant || null,

          quantity: product.quantity || 1,
        },
      ];
    });
  };

  // ================================
  // INCREASE QUANTITY
  // ================================

  const increaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    );
  };

  // ================================
  // DECREASE QUANTITY
  // ================================

  const decreaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  // ================================
  // REMOVE ITEM
  // ================================

  const removeFromCart = (item) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          !(
            cartItem.id === item.id &&
            cartItem.size === item.size &&
            cartItem.color === item.color
          ),
      ),
    );
  };

  // ================================
  // CLEAR CART
  // ================================

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ================================
// CUSTOM HOOK
// ================================

export const useCart = () => useContext(CartContext);
