import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#f8f8f8]">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            {/* Main Area */}
            <div className="lg:ml-72 flex flex-col min-h-screen">

                <Navbar />

                <main
                    className="
                        flex-1
                        p-4
                        sm:p-6
                        lg:p-8
                        pb-24
                        lg:pb-8
                    "
                >
                    <Outlet />
                </main>

            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
                <Sidebar mobile />
            </div>

        </div>
    );
};

export default AdminLayout;