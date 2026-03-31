import ss1 from "../../assets/img/collections/ss1.jpg";
import ss2 from "../../assets/img/collections/ss2.jpg";
import ss3 from "../../assets/img/collections/ss3.jpg";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

const products = [
    { id: "p1", name: "Ivory Grace Dress", price: 2499, image: ss1 },
    { id: "p2", name: "Noir Silhouette", price: 1999, image: ss2 },
    { id: "p3", name: "Soft Muse Co-ord", price: 2199, image: ss3 },
];

const CollectionGrid = () => {

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(`${product.name} added to cart 🛒`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">

                    {/* IMAGE */}
                    <div className="relative overflow-hidden rounded-xl">

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[460px] object-cover transition duration-700 group-hover:scale-105"
                        />

                        {/* HOVER BUTTON */}
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="
                            absolute bottom-5 left-1/2 -translate-x-1/2
                            opacity-0 group-hover:opacity-100
                            transition duration-500
                            bg-white/90 backdrop-blur
                            text-black text-sm tracking-wide
                            px-6 py-2 rounded-full
                            shadow-md hover:bg-black hover:text-white
                            "
                        >
                            Add to Cart
                        </button>

                    </div>

                    {/* TEXT */}
                    <div className="mt-5">
                        <h4 className="text-lg font-light">{product.name}</h4>
                        <p className="text-gray-600 mt-1">₹{product.price}</p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default CollectionGrid;