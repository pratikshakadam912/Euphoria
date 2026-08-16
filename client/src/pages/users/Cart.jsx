import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    subtotal,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#f7f4f1]">
      <Navbar />

      {/* ==================================================
                MAIN
            ================================================== */}

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* ==================================================
                        HEADER
                    ================================================== */}

          <div className="mb-12">
            <p
              className="
                            uppercase
                            tracking-[0.35em]
                            text-xs
                            text-[#8b5e3c]
                            mb-4
                        "
            >
              Euphoria
            </p>

            <h1
              className="
                            text-4xl
                            md:text-6xl
                            font-light
                            text-black
                        "
            >
              Your Cart
            </h1>

            <p
              className="
                            mt-4
                            text-gray-500
                            text-sm
                        "
            >
              {totalItems} {totalItems === 1 ? "item" : "items"} selected
            </p>
          </div>

          {/* ==================================================
                        EMPTY CART
                    ================================================== */}

          {cart.length === 0 ? (
            <div
              className="
                            min-h-[50vh]
                            bg-white
                            rounded-[2rem]
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            px-6
                        "
            >
              <div
                className="
                                w-20
                                h-20
                                rounded-full
                                bg-[#f7f4f1]
                                flex
                                items-center
                                justify-center
                                mb-6
                            "
              >
                <span className="text-3xl">♡</span>
              </div>

              <h2
                className="
                                text-2xl
                                font-light
                                text-black
                            "
              >
                Your cart is empty
              </h2>

              <p
                className="
                                text-gray-500
                                mt-3
                                max-w-md
                                text-sm
                                leading-relaxed
                            "
              >
                Discover pieces designed for effortless elegance and timeless
                style.
              </p>

              <Link
                to="/collection"
                className="
                                    mt-8
                                    px-8
                                    py-4
                                    rounded-full
                                    bg-black
                                    text-white
                                    text-xs
                                    uppercase
                                    tracking-[0.2em]
                                    hover:bg-[#8b5e3c]
                                    transition
                                "
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div
              className="
                            grid
                            grid-cols-1
                            lg:grid-cols-[1fr_380px]
                            gap-10
                            items-start
                        "
            >
              {/* ==================================================
                                CART ITEMS
                            ================================================== */}

              <div className="space-y-5">
                {cart.map((item) => (
                  <article
                    key={item.cartItemId}
                    className="
                                            bg-white
                                            rounded-[2rem]
                                            p-4
                                            sm:p-6
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
                                                IMAGE
                                            ================================== */}

                      <Link
                        to={`/product/${item.id}`}
                        className="
                                                    shrink-0
                                                "
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                                                        w-28
                                                        h-36
                                                        sm:w-36
                                                        sm:h-44
                                                        object-cover
                                                        rounded-[1.5rem]
                                                    "
                        />
                      </Link>

                      {/* ==================================
                                                DETAILS
                                            ================================== */}

                      <div
                        className="
                                                flex-1
                                                min-w-0
                                                flex
                                                flex-col
                                            "
                      >
                        {/* PRODUCT NAME */}

                        <Link to={`/product/${item.id}`}>
                          <h2
                            className="
                                                        text-lg
                                                        sm:text-xl
                                                        font-light
                                                        text-black
                                                        hover:underline
                                                    "
                          >
                            {item.name}
                          </h2>
                        </Link>

                        {/* PRICE */}

                        <p
                          className="
                                                    mt-2
                                                    text-sm
                                                    text-gray-500
                                                "
                        >
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </p>

                        {/* ==================================
                                                    VARIANT DETAILS
                                                ================================== */}

                        <div
                          className="
                                                    flex
                                                    flex-wrap
                                                    gap-x-6
                                                    gap-y-2
                                                    mt-4
                                                "
                        >
                          {item.size && (
                            <div>
                              <p
                                className="
                                                                text-[10px]
                                                                uppercase
                                                                tracking-[0.2em]
                                                                text-gray-400
                                                            "
                              >
                                Size
                              </p>

                              <p
                                className="
                                                                text-sm
                                                                mt-1
                                                            "
                              >
                                {item.size}
                              </p>
                            </div>
                          )}

                          {item.color && (
                            <div>
                              <p
                                className="
                                                                text-[10px]
                                                                uppercase
                                                                tracking-[0.2em]
                                                                text-gray-400
                                                            "
                              >
                                Color
                              </p>

                              <p
                                className="
                                                                text-sm
                                                                mt-1
                                                            "
                              >
                                {item.color}
                              </p>
                            </div>
                          )}

                          {item.variant && (
                            <div>
                              <p
                                className="
                                                                text-[10px]
                                                                uppercase
                                                                tracking-[0.2em]
                                                                text-gray-400
                                                            "
                              >
                                Variant
                              </p>

                              <p
                                className="
                                                                text-sm
                                                                mt-1
                                                            "
                              >
                                {item.variant}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* ==================================
                                                    BOTTOM CONTROLS
                                                ================================== */}

                        <div
                          className="
                                                    mt-auto
                                                    pt-5
                                                    flex
                                                    items-center
                                                    gap-4
                                                    flex-wrap
                                                "
                        >
                          {/* QUANTITY */}

                          <div
                            className="
                                                        flex
                                                        items-center
                                                        border
                                                        border-gray-200
                                                        rounded-full
                                                        h-10
                                                    "
                          >
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.cartItemId)}
                              className="
                                                                w-10
                                                                h-full
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-lg
                                                                hover:bg-black
                                                                hover:text-white
                                                                rounded-full
                                                                transition
                                                            "
                            >
                              −
                            </button>

                            <span
                              className="
                                                            w-8
                                                            text-center
                                                            text-sm
                                                        "
                            >
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.cartItemId)}
                              className="
                                                                w-10
                                                                h-full
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-lg
                                                                hover:bg-black
                                                                hover:text-white
                                                                rounded-full
                                                                transition
                                                            "
                            >
                              +
                            </button>
                          </div>

                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="
                                                            text-xs
                                                            uppercase
                                                            tracking-[0.15em]
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
                                                hidden
                                                sm:block
                                                text-right
                                                shrink-0
                                            "
                      >
                        <p
                          className="
                                                    text-lg
                                                    font-medium
                                                "
                        >
                          ₹
                          {(Number(item.price) * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                    </div>

                    {/* MOBILE TOTAL */}

                    <div
                      className="
                                            sm:hidden
                                            border-t
                                            border-gray-100
                                            mt-5
                                            pt-4
                                            flex
                                            justify-between
                                            text-sm
                                        "
                    >
                      <span className="text-gray-400">Item Total</span>

                      <span className="font-medium">
                        ₹
                        {(Number(item.price) * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    </div>
                  </article>
                ))}

                {/* ==================================================
                                    SHIPPING MESSAGE
                                ================================================== */}

                <div
                  className="
                                    bg-white
                                    rounded-[1.5rem]
                                    px-6
                                    py-5
                                    flex
                                    items-center
                                    gap-4
                                "
                >
                  <div
                    className="
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-[#f7f4f1]
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                    "
                  >
                    ✓
                  </div>

                  <div>
                    <p
                      className="
                                            text-sm
                                            font-medium
                                        "
                    >
                      Complimentary shipping
                    </p>

                    <p
                      className="
                                            text-xs
                                            text-gray-500
                                            mt-1
                                        "
                    >
                      Your order qualifies for free shipping.
                    </p>
                  </div>
                </div>
              </div>

              {/* ==================================================
                                ORDER SUMMARY
                            ================================================== */}

              <aside
                className="
                                lg:sticky
                                lg:top-28
                                bg-white
                                rounded-[2rem]
                                p-7
                                sm:p-8
                            "
              >
                <p
                  className="
                                    uppercase
                                    tracking-[0.3em]
                                    text-xs
                                    text-[#8b5e3c]
                                "
                >
                  Summary
                </p>

                <h2
                  className="
                                    text-2xl
                                    font-light
                                    mt-3
                                    mb-8
                                "
                >
                  Order Details
                </h2>

                {/* ITEMS */}

                <div
                  className="
                                    flex
                                    justify-between
                                    text-sm
                                    mb-4
                                "
                >
                  <span className="text-gray-500">Items</span>

                  <span>{totalItems}</span>
                </div>

                {/* SUBTOTAL */}

                <div
                  className="
                                    flex
                                    justify-between
                                    text-sm
                                    mb-4
                                "
                >
                  <span className="text-gray-500">Subtotal</span>

                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {/* SHIPPING */}

                <div
                  className="
                                    flex
                                    justify-between
                                    text-sm
                                    mb-7
                                "
                >
                  <span className="text-gray-500">Shipping</span>

                  <span>Free</span>
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
                                        items-end
                                    "
                  >
                    <span
                      className="
                                            text-base
                                            text-gray-500
                                        "
                    >
                      Total
                    </span>

                    <span
                      className="
                                            text-2xl
                                            font-medium
                                        "
                    >
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p
                    className="
                                        text-[11px]
                                        text-gray-400
                                        mt-2
                                    "
                  >
                    Inclusive of all applicable taxes
                  </p>
                </div>

                {/* CHECKOUT */}

                <Link
                  to="/checkout"
                  className="
                                        mt-8
                                        w-full
                                        h-14
                                        rounded-full
                                        bg-black
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        text-xs
                                        uppercase
                                        tracking-[0.2em]
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
                                        mt-5
                                        block
                                        text-center
                                        text-sm
                                        text-gray-500
                                        hover:text-black
                                        transition
                                    "
                >
                  Continue Shopping
                </Link>

                {/* TRUST */}

                <div
                  className="
                                    mt-8
                                    pt-6
                                    border-t
                                    border-gray-100
                                    text-center
                                "
                >
                  <p
                    className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-gray-400
                                    "
                  >
                    Secure Checkout
                  </p>

                  <p
                    className="
                                        text-xs
                                        text-gray-400
                                        mt-2
                                    "
                  >
                    Your order is safely protected.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
