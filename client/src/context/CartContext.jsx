// CartContext.jsx

import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    // LOAD CART FROM LOCAL STORAGE
    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    // SAVE CART TO LOCAL STORAGE
    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart));

    }, [cart]);

    // ADD TO CART
    const addToCart = (product) => {

        setCart((prevCart) => {

            // CHECK IF PRODUCT EXISTS
            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );

            // IF EXISTS -> INCREASE QUANTITY
            if (existingProduct) {

                return prevCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            // ADD NEW PRODUCT
            return [
                ...prevCart,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                },
            ];
        });
    };

    // DECREASE QUANTITY
    const decreaseQuantity = (id) => {

        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // REMOVE PRODUCT
    const removeFromCart = (id) => {

        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    };

    // CLEAR CART
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);