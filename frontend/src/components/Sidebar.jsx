import { NavLink } from "react-router-dom";
import { Home, Activity, History, User, Settings, Users, Database, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";


export default function Sidebar() {
  const { user, logout } = useAuth();

  const patientLinks = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/patient/checker", icon: <Activity size={18} />, label: "Symptom Checker" },
    { to: "/patient/history", icon: <History size={18} />, label: "History" },
    { to: "/patient/profile", icon: <User size={18} />, label: "Profile" },
  ];

  const adminLinks = [
    { to: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/admin/patients", icon: <Users size={18} />, label: "Manage Patients" },
    { to: "/admin/model", icon: <Database size={18} />, label: "AI Model" },
    { to: "/admin/logs", icon: <History size={18} />, label: "Logs & Reports" },
  ];

  const links = user?.role === "admin" ? adminLinks : patientLinks;

  return (
    <div className="min-h-screen w-64 bg-white dark:bg-gray-900 shadow-md flex flex-col justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">🩺 AI Health</h1>
        <nav className="space-y-2">
        {links.map((link) => (
  <motion.div whileHover={{ scale: 1.03 }} key={link.to}>
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 transition ${
          isActive ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-200"
        }`
      }
    >
      {link.icon}
      <span>{link.label}</span>
    </NavLink>
  </motion.div>
))}

        </nav>
      </div>

      <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 p-2 w-full rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-gray-800"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
