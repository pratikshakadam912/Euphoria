// Cart.jsx

import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f7f4f1]">
      {/* ==========================================
                NAVBAR
            ========================================== */}

      <Navbar />

      <main className="pt-32 px-4 sm:px-6 md:px-10 lg:px-16 pb-20">
        {/* ==========================================
                    PAGE HEADER
                ========================================== */}

        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-black">
            Your Cart
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {/* ==========================================
                    EMPTY CART
                ========================================== */}

        {cart.length === 0 ? (
          <div className="max-w-7xl mx-auto">
            <div
              className="
                            min-h-[50vh]
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "
            >
              <div
                className="
                                w-20
                                h-20
                                rounded-full
                                bg-white
                                flex
                                items-center
                                justify-center
                                mb-6
                                shadow-sm
                            "
              >
                <span className="text-3xl">🛍</span>
              </div>

              <h2 className="text-2xl font-light text-black">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mt-3 max-w-md">
                Looks like you haven't added anything to your cart yet.
              </p>

              <Link
                to="/collection"
                className="
                                    mt-8
                                    px-8
                                    py-3
                                    bg-black
                                    text-white
                                    rounded-full
                                    text-sm
                                    tracking-widest
                                    uppercase
                                    hover:bg-[#8b5e3c]
                                    transition
                                "
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* ==========================================
                       CART CONTENT
                    ========================================== */

          <div
            className="
                        max-w-7xl
                        mx-auto
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-10
                    "
          >
            {/* ==========================================
                            CART ITEMS
                        ========================================== */}

            <div
              className="
                            lg:col-span-2
                            space-y-5
                        "
            >
              {cart.map((item, index) => (
                <div
                  key={`
                                        ${item.id}-
                                        ${item.size || "no-size"}-
                                        ${item.color || "no-color"}-
                                        ${index}
                                    `}
                  className="
                                        bg-white
                                        rounded-3xl
                                        p-4
                                        sm:p-6
                                        shadow-sm
                                    "
                >
                  <div
                    className="
                                        flex
                                        gap-4
                                        sm:gap-6
                                    "
                  >
                    {/* ==================================
                                            PRODUCT IMAGE
                                        ================================== */}

                    <Link to={`/product/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                                                    w-24
                                                    h-32
                                                    sm:w-32
                                                    sm:h-40
                                                    object-cover
                                                    rounded-2xl
                                                "
                      />
                    </Link>

                    {/* ==================================
                                            PRODUCT DETAILS
                                        ================================== */}

                    <div
                      className="
                                            flex-1
                                            min-w-0
                                        "
                    >
                      {/* PRODUCT NAME */}

                      <Link to={`/product/${item.id}`}>
                        <h3
                          className="
                                                    text-base
                                                    sm:text-xl
                                                    font-light
                                                    text-black
                                                    hover:underline
                                                "
                        >
                          {item.name}
                        </h3>
                      </Link>

                      {/* PRICE */}

                      <p
                        className="
                                                text-gray-600
                                                text-sm
                                                mt-2
                                            "
                      >
                        ₹{item.price}
                      </p>

                      {/* ==================================
                                                SELECTED SIZE
                                            ================================== */}

                      {item.size && (
                        <div
                          className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    mt-3
                                                "
                        >
                          <span
                            className="
                                                        text-xs
                                                        uppercase
                                                        tracking-wider
                                                        text-gray-400
                                                    "
                          >
                            Size
                          </span>

                          <span
                            className="
                                                        text-sm
                                                        font-medium
                                                        text-black
                                                    "
                          >
                            {item.size}
                          </span>
                        </div>
                      )}

                      {/* ==================================
                                                SELECTED COLOR
                                            ================================== */}

                      {item.color && (
                        <div
                          className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    mt-1
                                                "
                        >
                          <span
                            className="
                                                        text-xs
                                                        uppercase
                                                        tracking-wider
                                                        text-gray-400
                                                    "
                          >
                            Color
                          </span>

                          <span
                            className="
                                                        text-sm
                                                        font-medium
                                                        text-black
                                                    "
                          >
                            {item.color}
                          </span>
                        </div>
                      )}

                      {/* ==================================
                                                VARIANT
                                            ================================== */}

                      {item.variant && (
                        <div
                          className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    mt-1
                                                "
                        >
                          <span
                            className="
                                                        text-xs
                                                        uppercase
                                                        tracking-wider
                                                        text-gray-400
                                                    "
                          >
                            Variant
                          </span>

                          <span
                            className="
                                                        text-sm
                                                        font-medium
                                                        text-black
                                                    "
                          >
                            {item.variant}
                          </span>
                        </div>
                      )}

                      {/* ==================================
                                                QUANTITY + REMOVE
                                            ================================== */}

                      <div
                        className="
                                                flex
                                                items-center
                                                gap-4
                                                mt-5
                                                flex-wrap
                                            "
                      >
                        {/* QUANTITY BOX */}

                        <div
                          className="
                                                    flex
                                                    items-center
                                                    border
                                                    border-gray-200
                                                    rounded-full
                                                    overflow-hidden
                                                "
                        >
                          {/* MINUS */}

                          <button
                            onClick={() => decreaseQuantity(item)}
                            className="
                                                            w-9
                                                            h-9
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-lg
                                                            hover:bg-black
                                                            hover:text-white
                                                            transition
                                                        "
                          >
                            −
                          </button>

                          {/* QUANTITY */}

                          <span
                            className="
                                                        w-8
                                                        text-center
                                                        text-sm
                                                        font-medium
                                                    "
                          >
                            {item.quantity}
                          </span>

                          {/* PLUS */}

                          <button
                            onClick={() => increaseQuantity(item)}
                            className="
                                                            w-9
                                                            h-9
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-lg
                                                            hover:bg-black
                                                            hover:text-white
                                                            transition
                                                        "
                          >
                            +
                          </button>
                        </div>

                        {/* REMOVE */}

                        <button
                          onClick={() => removeFromCart(item)}
                          className="
                                                        text-xs
                                                        uppercase
                                                        tracking-widest
                                                        text-gray-400
                                                        hover:text-black
                                                        transition
                                                    "
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* ==================================
                                            ITEM TOTAL
                                        ================================== */}

                    <div
                      className="
                                            text-right
                                            shrink-0
                                        "
                    >
                      <p
                        className="
                                                text-sm
                                                sm:text-lg
                                                font-medium
                                                text-black
                                            "
                      >
                        ₹
                        {(
                          Number(item.price || 0) * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ==========================================
                            ORDER SUMMARY
                        ========================================== */}

            <div className="lg:col-span-1">
              <div
                className="
                                bg-white
                                rounded-3xl
                                p-6
                                sm:p-8
                                shadow-sm
                                lg:sticky
                                lg:top-28
                            "
              >
                <h2
                  className="
                                    text-xl
                                    sm:text-2xl
                                    font-light
                                    tracking-wide
                                    mb-8
                                "
                >
                  Order Summary
                </h2>

                {/* ITEMS */}

                <div
                  className="
                                    flex
                                    justify-between
                                    text-sm
                                    text-gray-500
                                    mb-4
                                "
                >
                  <span>Items</span>

                  <span>{totalItems}</span>
                </div>

                {/* SUBTOTAL */}

                <div
                  className="
                                    flex
                                    justify-between
                                    text-sm
                                    text-gray-500
                                    mb-4
                                "
                >
                  <span>Subtotal</span>

                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                {/* SHIPPING */}

                <div
                  className="
                                    flex
                                    justify-between
                                    text-sm
                                    text-gray-500
                                    mb-6
                                "
                >
                  <span>Shipping</span>

                  <span className="text-green-600">Free</span>
                </div>

                {/* DIVIDER */}

                <div
                  className="
                                    border-t
                                    border-gray-200
                                    pt-6
                                "
                >
                  <div
                    className="
                                        flex
                                        justify-between
                                        items-center
                                    "
                  >
                    <span
                      className="
                                            text-lg
                                            font-medium
                                        "
                    >
                      Total
                    </span>

                    <span
                      className="
                                            text-xl
                                            font-medium
                                        "
                    >
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* CHECKOUT */}

                <Link
                  to="/checkout"
                  className="
                                        block
                                        w-full
                                        mt-8
                                        py-4
                                        bg-black
                                        text-white
                                        text-center
                                        text-sm
                                        tracking-widest
                                        uppercase
                                        rounded-full
                                        hover:bg-[#8b5e3c]
                                        transition
                                    "
                >
                  Proceed to Checkout
                </Link>

                {/* CONTINUE SHOPPING */}

                <Link
                  to="/collection"
                  className="
                                        block
                                        text-center
                                        mt-5
                                        text-sm
                                        text-gray-500
                                        hover:text-black
                                        transition
                                    "
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
