import { createContext, useContext, useState } from "react";
import { fakeUsers } from "../data/fakeUsers";
import { toast } from "sonner";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  const login = (email, password) => {
    const foundUser = fakeUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
 
    toast.custom(() => (
      <div className="bg-emerald-600 text-white font-medium px-4 py-3 rounded-lg shadow-lg">
        ✅ logout successfully!
      </div>
    ))
  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
