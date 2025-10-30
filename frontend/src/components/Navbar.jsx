
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link to="/" className="font-bold text-lg">🩺 AI Symptom Checker</Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* <Link to={user.role === "admin" ? "/admin/dashboard" : "/patient/dashboard"}>
              Dashboard
            </Link> */}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="text-gray-400 pointer-events-none cursor-not-allowed">Signup</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}



