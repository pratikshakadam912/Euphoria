import { useState } from "react";
import {
    Minus,
    Plus,
    ShoppingBag,
} from "lucide-react";
import { useParams } from "react-router-dom";

import ss1 from "../../assets/img/collections/ss1.jpg";
import ss2 from "../../assets/img/collections/ss2.jpg";
import ss3 from "../../assets/img/collections/ss3.jpg";

import { useCart } from "../../context/CartContext";
import Navbar from "../../components/common/Navbar";

const products = [
    {
        id: "p1",
        name: "Ivory Grace Dress",
        price: 2499,
        fabric: "Premium Satin",
        description:
            "Elegant satin dress crafted for timeless luxury and refined minimal styling.",
        sizes: ["S", "M", "L"],
        images: [ss1, ss2, ss3],
    },

    {
        id: "p2",
        name: "Noir Silhouette",
        price: 1999,
        fabric: "Cotton Blend",
        description:
            "Modern monochrome outfit designed with effortless elegance and comfort.",
        sizes: ["M", "L", "XL"],
        images: [ss2, ss3, ss1],
    },

    {
        id: "p3",
        name: "Soft Muse Co-ord",
        price: 2199,
        fabric: "Linen",
        description:
            "Relaxed luxury co-ord designed for elevated everyday wear.",
        sizes: ["S", "M"],
        images: [ss3, ss1, ss2],
    },
    {
        id: "2",
        name: "Classic Leather Bag",
        price: 3499,
        fabric: "100% Genuine Leather",
        description:
            "Handcrafted from premium leather for durability and timeless elegance.",
        sizes: ["Small", "Medium", "Large"],
        images: [
            "https://images.unsplash.com/photo-1591561954557-26941169b49e",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
        ],
    },

    {
        id: "3",
        name: "Minimal Wrist Watch",
        price: 5999,
        fabric: "Stainless Steel & Sapphire Glass",
        description:
            "Designed for everyday wear with scratch-resistant glass and precision movement.",
        sizes: ["40mm", "42mm", "44mm"],
        images: [
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        ],
    },

    {
        id: "4",
        name: "Comfort Sneakers",
        price: 4299,
        fabric: "Breathable Mesh & Rubber Sole",
        description:
            "Ultra-lightweight sneakers made for long-lasting comfort and flexibility.",
        sizes: ["UK6", "UK7", "UK8", "UK9"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        ],
    },
];

const ProductDetails = () => {

    const { id } = useParams();

    const {
        cart,
        addToCart,
        decreaseQuantity,
    } = useCart();

    const product = products.find((item) => item.id === id);

    const [selectedImage, setSelectedImage] = useState(
        product?.images[0]
    );

    const [selectedSize, setSelectedSize] = useState("");
    const cartItem = cart.find(
        (item) => item.id === product?.id
    );

    const quantity = cartItem?.quantity || 0;

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                Product Not Found
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

                            {product.images.map((img, index) => (

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
                                            decreaseQuantity(product.id)
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

                            <button
                                className="
            w-full
            h-[58px]
            rounded-full
            border
            border-black
            bg-white
            font-medium
            tracking-[2px]
            hover:bg-black
            hover:text-white
            transition-all
            duration-300
        "
                            >
                                BUY NOW
                            </button>

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