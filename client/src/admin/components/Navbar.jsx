import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
