const Navbar = () => {
    return (
        <div className="bg-white shadow p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <button className="bg-black text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
};

export default Navbar;