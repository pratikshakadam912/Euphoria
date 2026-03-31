const Homepage = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Homepage Control</h1>

            <input type="file" className="mb-4" />

            <input
                type="text"
                placeholder="Hero Text"
                className="border p-2 w-full mb-4"
            />

            <button className="bg-black text-white px-4 py-2 rounded">
                Save Changes
            </button>
        </div>
    );
};

export default Homepage;