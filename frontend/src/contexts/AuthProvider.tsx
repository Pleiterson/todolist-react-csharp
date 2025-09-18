import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
    }

    setInitialized(true);
  }, []);

  const login = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    setToken(token);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  if (!initialized) return null;
  
  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthProvider };
