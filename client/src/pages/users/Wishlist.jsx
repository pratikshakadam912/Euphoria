import { Link } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import { FiArrowLeft, FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";

import { useWishlist } from "../../context/WishlistContext";

import { useCart } from "../../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({
      id: item.productId,

      name: item.name,

      price: item.price,

      image: item.image,

      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-black">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 lg:px-10 pt-32 pb-20">
        {/* BACK */}

        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
        >
          <FiArrowLeft />
          Back to Account
        </Link>

        {/* HEADER */}

        <div className="mt-14 mb-12">
          <p className="uppercase tracking-[0.45em] text-[11px] text-[#8b5e3c]">
            Your Euphoria
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-light tracking-tight">
            Wishlist
          </h1>

          <p className="mt-4 text-gray-500">Pieces you've saved for later.</p>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading your wishlist...</p>
          </div>
        ) : wishlist.length === 0 ? (
          /* EMPTY */

          <div className="bg-white border border-gray-100 rounded-[32px] p-12 md:p-20 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f8f7f5] flex items-center justify-center text-3xl">
              <FiHeart />
            </div>

            <h2 className="text-2xl font-light mt-7">Your wishlist is empty</h2>

            <p className="text-gray-500 mt-3">
              Save pieces you love and they'll appear here.
            </p>

            <Link
              to="/collection"
              className="inline-flex mt-7 px-7 py-3 bg-black text-white rounded-full text-sm"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          /* PRODUCTS */

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-100 rounded-[28px] overflow-hidden group"
              >
                {/* IMAGE */}

                <Link to={`/product/${item.productId}`} className="block">
                  <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                </Link>

                {/* DETAILS */}

                <div className="p-6">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="font-medium">{item.name}</h3>
                      </Link>

                      <p className="text-gray-500 mt-2">₹{item.price}</p>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-red-500 hover:bg-red-50 transition shrink-0"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full mt-5 py-3 bg-black text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    <FiShoppingBag />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-xs tracking-[0.25em] uppercase text-gray-300">
            Euphoria
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Crafted for those who wear their own story.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
