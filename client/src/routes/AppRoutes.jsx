import { Routes, Route } from "react-router-dom";


// USER PAGES
import Home from "../pages/users/home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import About from "../pages/users/About";
import Collection from "../pages/users/Collection";
import Contact from "../pages/users/Contact";
import Cart from "../pages/users/Cart";
import Checkout from "../pages/users/Checkout";

// ADMIN PAGES
import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import Homepage from "../admin/pages/Homepage";
import Orders from "../admin/pages/Orders";
import Users from "../admin/pages/Users";



const AppRoutes = () => {
    return (
        <Routes>
            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="orders" element={<Orders />} />
                <Route path="Users" element={<Users />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;