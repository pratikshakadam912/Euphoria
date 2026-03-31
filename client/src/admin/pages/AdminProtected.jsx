import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminProtected;