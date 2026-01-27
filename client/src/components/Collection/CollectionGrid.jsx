import ss1 from "../../assets/img/collections/ss1.jpg";
import ss2 from "../../assets/img/collections/ss2.jpg";
import ss3 from "../../assets/img/collections/ss3.jpg";

const products = [
    { id: 1, name: "Ivory Grace Dress", price: 2499, image: ss1 },
    { id: 2, name: "Noir Silhouette", price: 1999, image: ss2 },
    { id: 3, name: "Soft Muse Co-ord", price: 2199, image: ss3 },
];

const CollectionGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">

                    {/* IMAGE */}
                    <div className="overflow-hidden rounded-xl">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[460px] object-cover transition duration-700 group-hover:scale-105"
                        />
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
