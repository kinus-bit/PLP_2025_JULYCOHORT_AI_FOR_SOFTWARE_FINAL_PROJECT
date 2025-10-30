import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <AppRoutes />
        <Toaster position="top-center"/>
      </div>
     
    </BrowserRouter>
  );
}
