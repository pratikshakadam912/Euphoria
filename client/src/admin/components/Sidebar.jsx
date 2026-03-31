import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-black text-white h-screen p-5">

            <h1 className="text-2xl font-bold mb-8">Admin</h1>

            <ul className="space-y-4">
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/homepage">Homepage</Link></li>
            </ul>

        </div>
    );
};

export default Sidebar;