import { useEffect, useState } from "react";
import {
    Minus,
    Plus,
    ShoppingBag,
} from "lucide-react";
import { useParams } from "react-router-dom";




import { useCart } from "../../context/CartContext";
import Navbar from "../../components/common/Navbar";


const ProductDetails = () => {

    const { id } = useParams();

    const {
        cart,
        addToCart,
        decreaseQuantity,
    } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(
                    `https://euphoria-ooqv.onrender.com/api/products/${id}`
                );

                const data = await res.json();

                setProduct(data);

                if (data.images?.length) {
                    setSelectedImage(data.images[0]);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const cartItem = cart.find(
        (item) => item._id === product?._id
    );

    const quantity = cartItem?.quantity || 0;

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                Product Not Found
            </div>
        );
    }
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (

        <div className="bg-[#f8f7f5] min-h-screen">

            <Navbar />

            <div className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-10
                pt-24
                pb-10
                lg:pt-32
                lg:pb-16
            ">

                <div className="
                    grid
                    lg:grid-cols-2
                    gap-6
                    lg:gap-20
                    items-start
                ">

                    {/* LEFT SIDE */}
                    <div>

                        {/* MAIN IMAGE */}
                        <div className="
                            bg-white
                            rounded-[22px]
                            overflow-hidden
                            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                        ">

                            <img
                                src={selectedImage}
                                alt={product.name}

                                className="
                                w-full
                                 h-[340px]
                                 sm:h-[500px]
                                 lg:h-[720px]
                                  object-cover
                                    "
                            />

                        </div>

                        {/* THUMBNAILS */}
                        <div className="
    flex
    gap-2
    mt-4
    overflow-x-auto
    pb-2
">

                            {product.images?.map((img, index) => (

                                <button
                                    key={index}
                                    onClick={() =>
                                        setSelectedImage(img)
                                    }
                                    className={`
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        transition
                                        ${selectedImage === img
                                            ? "border-black"
                                            : "border-transparent"
                                        }
                                    `}
                                >

                                    <img
                                        src={img}
                                        alt=""
                                        className="
                                            w-[54px]
                                            h-[68px]
                                            sm:w-[72px]
                                            sm:h-[88px]
                                            object-cover
                                        "
                                    />

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="
                        pt-2
                        lg:pt-8
                    ">

                        {/* COLLECTION */}
                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[4px]
                            text-gray-500
                        ">
                            Euphoria Luxury
                        </p>

                        {/* TITLE */}
                        <h1 className="
                            text-[26px]
                            sm:text-[40px]
                            lg:text-[54px]
                            leading-[1.05]
                            font-extralight
                            mt-3
                        ">
                            {product.name}
                        </h1>

                        {/* PRICE */}
                        <div className="
                            flex
                            items-center
                            gap-2
                            mt-5
                        ">

                            <p className="
                                text-[22px]
                                sm:text-[30px]
                                font-light
                            ">
                                ₹{product.price}
                            </p>

                            <span className="
                                text-[10px]
                                bg-black
                                text-white
                                px-3
                                py-1
                                rounded-full
                                tracking-[2px]
                            ">
                                READY TO SHIP
                            </span>

                        </div>

                        {/* DESCRIPTION */}
                        <p className="
                            mt-5
                            text-[14px]
                            leading-[1.9]
                            text-gray-600
                            max-w-lg
                        ">
                            {product.description}
                        </p>

                        {/* DETAILS CARDS */}
                        <div className="
                            mt-8
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-3
                        ">

                            <div className="
                                bg-white
                                rounded-2xl
                                p-3.5
                                border border-gray-100
                            ">

                                <p className="
                                    text-[10px]
                                    uppercase
                                    tracking-[3px]
                                    text-gray-400
                                ">
                                    Fabric
                                </p>

                                <h3 className="
                                    mt-2
                                    text-[14px]
                                    font-medium
                                ">
                                    {product.fabric}
                                </h3>

                            </div>

                            <div className="
                                bg-white
                                rounded-2xl
                                p-3.5
                                border border-gray-100
                            ">

                                <p className="
                                    text-[10px]
                                    uppercase
                                    tracking-[3px]
                                    text-gray-400
                                ">
                                    Delivery
                                </p>

                                <h3 className="
                                    mt-2
                                    text-[14px]
                                    font-medium
                                ">
                                    4-6 Days
                                </h3>

                            </div>

                        </div>

                        {/* SIZE */}
                        <div className="mt-10">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-4
                            ">

                                <p className="
                                    text-[11px]
                                    uppercase
                                    tracking-[3px]
                                    text-gray-500
                                ">
                                    Select Size
                                </p>

                                <button className="
                                    text-[13px]
                                    text-gray-500
                                ">
                                    Size Guide
                                </button>

                            </div>

                            <div className="
                                flex
                                gap-3
                                flex-wrap
                            ">

                                {product.sizes.map((size) => (

                                    <button
                                        key={size}
                                        onClick={() =>
                                            setSelectedSize(size)
                                        }
                                        className={`
                                            w-[44px]
                                            h-[44px]
                                            sm:w-[50px]
                                            sm:h-[50px]
                                            rounded-full
                                            text-[12px]
                                            font-medium
                                            transition-all
                                            duration-300
                                            border
                                            ${selectedSize === size
                                                ? "bg-black text-white border-black"
                                                : "bg-white border-gray-200 hover:border-black"
                                            }
                                        `}
                                    >
                                        {size}
                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="mt-10 space-y-4">

                            {quantity > 0 ? (

                                <div
                                    className="
                w-full
                h-[58px]
                rounded-full
                bg-black
                flex
                items-center
                justify-center
                gap-6
                text-white
                shadow-lg
            "
                                >
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(product._id)
                                        }
                                        className="
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                    hover:scale-110
                    transition
                "
                                    >
                                        <Minus size={18} />
                                    </button>

                                    <span className="text-lg font-semibold">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                        className="
                    w-10
                    h-10
                    rounded-full
                    bg-white
                    text-black
                    flex
                    items-center
                    justify-center
                    hover:scale-110
                    transition
                "
                                    >
                                        <Plus size={18} />
                                    </button>

                                </div>

                            ) : (

                                <button
                                    onClick={() =>
                                        addToCart(product)
                                    }
                                    className="
                w-full
                h-[58px]
                rounded-full
                bg-black
                text-white
                font-medium
                tracking-[2px]
                flex
                items-center
                justify-center
                gap-2
                hover:bg-neutral-800
                transition-all
                duration-300
            "
                                >
                                    <ShoppingBag size={18} />
                                    ADD TO CART
                                </button>

                            )}


                        </div>

                        {/* EXTRA INFO */}
                        <div className="
                            mt-8
                            border-t
                            border-gray-200
                            pt-6
                            space-y-4
                        ">

                            <div className="
                                flex
                                justify-between
                                text-[13px]
                            ">
                                <span className="text-gray-500">
                                    Free Shipping
                                </span>

                                <span>
                                    Available
                                </span>
                            </div>

                            <div className="
                                flex
                                justify-between
                                text-[13px]
                            ">
                                <span className="text-gray-500">
                                    Return Policy
                                </span>

                                <span>
                                    7 Days
                                </span>
                            </div>

                            <div className="
                                flex
                                justify-between
                                text-[13px]
                            ">
                                <span className="text-gray-500">
                                    Category
                                </span>

                                <span>
                                    Luxury Wear
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;