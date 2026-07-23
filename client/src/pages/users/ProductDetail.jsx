import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { cart, addToCart, decreaseQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://euphoria-ooqv.onrender.com/api/products/${id}`,
        );

        const data = await res.json();

        setProduct(data);

        if (data.images?.length) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const cartItem = cart.find((item) => item._id === product?._id);

  const quantity = cartItem?.quantity || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>

          <p className="mt-6 tracking-[4px] uppercase text-xs text-gray-500">
            Loading Product
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* LEFT SIDE */}

          <div>
            {/* MAIN IMAGE */}

            <div className="bg-white rounded-[30px] overflow-hidden shadow-xl">
              <img
                src={selectedImage || product.images?.[0]}
                alt={product.name}
                loading="lazy"
                className="
                  w-full
                  h-[350px]
                  sm:h-[500px]
                  lg:h-[760px]
                  object-cover
                  transition-all
                  duration-500
                "
              />
            </div>

            {/* THUMBNAILS */}

            <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
              {product.images?.length > 0 ? (
                product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`
                        flex-shrink-0
                        rounded-2xl
                        overflow-hidden
                        border-2
                        transition-all
                        duration-300
                        ${
                          selectedImage === img
                            ? "border-black scale-105"
                            : "border-gray-200 hover:border-black"
                        }
                    `}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      loading="lazy"
                      className="
                        w-20
                        h-24
                        sm:w-24
                        sm:h-28
                        object-cover
                      "
                    />
                  </button>
                ))
              ) : (
                <div className="w-full h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Images Available
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="pt-2 lg:pt-8">
            {/* COLLECTION */}

            <p className="uppercase tracking-[5px] text-xs text-gray-500">
              Euphoria Luxury Collection
            </p>

            {/* PRODUCT NAME */}

            <h1 className="text-4xl lg:text-6xl font-extralight mt-4 leading-tight">
              {product.name}
            </h1>

            {/* PRICE */}

            <div className="flex items-center gap-4 mt-8">
              <h2 className="text-3xl lg:text-4xl font-light">
                ₹{product.price}
              </h2>

              <span className="bg-black text-white text-xs tracking-[3px] px-4 py-2 rounded-full">
                READY TO SHIP
              </span>
            </div>

            {/* DESCRIPTION */}

            <p className="mt-8 text-gray-600 leading-8 text-[15px]">
              {product.description}
            </p>

            {/* PRODUCT INFO */}

            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <p className="uppercase tracking-[3px] text-gray-400 text-xs">
                  Fabric
                </p>

                <h3 className="mt-3 font-medium text-lg">
                  {product.fabric || "Premium Fabric"}
                </h3>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <p className="uppercase tracking-[3px] text-gray-400 text-xs">
                  Delivery
                </p>

                <h3 className="mt-3 font-medium text-lg">
                  4 - 6 Business Days
                </h3>
              </div>
            </div>

            {/* SIZE */}

            <div className="mt-12">
              <div className="flex justify-between items-center mb-5">
                <h3 className="uppercase tracking-[4px] text-xs text-gray-500">
                  Select Size
                </h3>

                <button className="text-sm text-gray-500 hover:text-black transition">
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-14
                      h-14
                      rounded-full
                      border
                      transition-all
                      duration-300
                      font-medium
                      ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300 hover:border-black"
                      }
                  `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CART */}

            <div className="mt-12">
              {quantity > 0 ? (
                <div className="h-16 rounded-full bg-black text-white flex items-center justify-center gap-8 shadow-xl">
                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="text-xl font-semibold">{quantity}</span>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="
                  w-full
                  h-16
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  gap-3
                  tracking-[2px]
                  hover:bg-neutral-900
                  transition-all
                  duration-300
                  shadow-lg
                "
                >
                  <ShoppingBag size={20} />
                  ADD TO CART
                </button>
              )}
            </div>

            {/* EXTRA INFORMATION */}

            <div className="mt-12 space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-gray-700" />

                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-gray-500">
                      On all prepaid orders
                    </p>
                  </div>
                </div>

                <span className="text-green-600 font-medium">Available</span>
              </div>

              <div className="bg-white rounded-3xl p-5 border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-gray-700" />

                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-500">7 Day Return Policy</p>
                  </div>
                </div>

                <span className="text-black">Secure</span>
              </div>
            </div>

            {/* PRODUCT DETAILS */}

            <div className="mt-12 border-t border-gray-200 pt-8 space-y-5">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>

                <span className="capitalize font-medium">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Collection</span>

                <span className="capitalize font-medium">
                  {product.collection}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Fabric</span>

                <span className="font-medium">{product.fabric}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Stock</span>

                <span
                  className={`font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} Available`
                    : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
