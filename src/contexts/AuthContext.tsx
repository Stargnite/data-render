// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
  };

  const logout = async() => {
    const URL = 'https://consultapi.vindove.com/api/v1/admin/logout'
    try {
          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          const data = await response.json();
          console.log(data.message);
        } catch (err) {
          console.log(err);
        }
    localStorage.removeItem("auth_token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
