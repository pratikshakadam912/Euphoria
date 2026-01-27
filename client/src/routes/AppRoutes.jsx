import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/users/home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import About from "../pages/users/About";
import Collection from "../pages/users/Collection";
import Contact from "../pages/users/contact";







const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>

    );
};

export default AppRoutes;
