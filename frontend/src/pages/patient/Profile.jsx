import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // toast.success("Profile saved successfully!!")
    toast.custom(() => (
      <div className="bg-emerald-600 text-white font-medium px-4 py-3 rounded-lg shadow-lg">
        ✅ Profile updated successfully!
      </div>
    ))
  };

  return (
    <DashboardLayout className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <PageTransition>
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          className="w-full p-2 border mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border mb-3 rounded"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Save Changes
        </button>
      </form>
      </PageTransition>
       
    </DashboardLayout>
      
    
  );
}
