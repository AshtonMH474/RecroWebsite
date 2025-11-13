
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";
import NewPasswordModal from "@/components/New-Password";
import ChangePassword from "@/components/ChangePassword";
import { checkUser } from "@/lib/auth_functions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("loading");
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);


const refreshUser = useCallback((forceRefresh = false) => {
    checkUser(setUser, forceRefresh);
  }, []);

  // Run once on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // Revalidate auth when user returns to tab (after 30 seconds away)
  useEffect(() => {
    let lastCheck = Date.now();

    const handleFocus = () => {
      const timeSinceLastCheck = Date.now() - lastCheck;
      // Only revalidate if been away for > 30 seconds
      if (timeSinceLastCheck > 30000) {
        refreshUser(true); // Force refresh from server
        lastCheck = Date.now();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refreshUser]);

  const openModal = (type, data = null) => {
    setActiveModal(type);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, openModal, closeModal,refreshUser }}>
      {children}

      {/* Centralized modal rendering */}
      {activeModal === "login" && (
        <Login onClose={closeModal} setUser={setUser} modalData={modalData} />
      )}
      {activeModal === "register" && (
        <Register onClose={closeModal} />
      )}
      {activeModal === "newPassword" && (
        <NewPasswordModal onClose={closeModal} />
      )}
      {activeModal === "changePassword" && (
        <ChangePassword token={modalData?.token} onClose={closeModal} />
      )}
      
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
