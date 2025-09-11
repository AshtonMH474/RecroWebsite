import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { checkUser } from "@/lib/auth_functions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("loading"); // initial state
const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setRegisterModal] = useState(false);
  const [showNewPassword, setNewPassword] = useState(false);
  const refreshUser = useCallback(() => {
    checkUser(setUser);
  }, []);

  // Run once on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser,showLoginModal,setShowLoginModal,showRegisterModal,setRegisterModal,showNewPassword,setNewPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
