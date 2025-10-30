import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
      // toast("Login successfull!",{className:"text-green-500"})
      toast.custom(() => (
        <div className="bg-emerald-600 text-white font-medium px-4 py-3 rounded-lg shadow-lg">
          ✅ login successfully!
        </div>
      ))
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleLogin} className=" shadow-lg rounded-xl p-6 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded"/>
        <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
        <p className="text-center text-gray-600 mb-3">
          Demo only — use these accounts:
        </p>
        <ul className="text-sm text-gray-700">
          <li><b>Admin:</b> admin@gmail.com / admin123</li>
          <li><b>Patient:</b> patient@gmail.com / patient123</li>
        </ul>
      </form>

    </div>
  );
}
