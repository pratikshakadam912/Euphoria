import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">

                <Navbar />

                <div className="p-6 overflow-y-auto">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default AdminLayout;