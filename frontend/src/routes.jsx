import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PatientDashboard from "./pages/patient/PatientDashboard";
import SymptomChecker from "./pages/patient/SymptomChecker";
import History from "./pages/patient/History";
import Profile from "./pages/patient/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManagePatients from "./pages/admin/ManagePatients";
import ManageModel from "./pages/admin/ManageModel";
import LogsReports from "./pages/admin/LogsReports";
import { useAuth } from "./context/AuthContext";
import { AnimatePresence } from "framer-motion";


export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <AnimatePresence mode='wait'>
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Patient */}
      {user?.role === "patient" && (
        <>
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/checker" element={<SymptomChecker />} />
          <Route path="/patient/history" element={<History />} />
          <Route path="/patient/profile" element={<Profile />} />
        </>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/patients" element={<ManagePatients />} />
          <Route path="/admin/model" element={<ManageModel />} />
          <Route path="/admin/logs" element={<LogsReports />} />
        </>
      )}

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </AnimatePresence>
    
  );
}
