import { createContext, useContext, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);


  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // Stocker token
      localStorage.setItem("token", token);

      // Stocker user
      localStorage.setItem("user", JSON.stringify(user));

      // Mettre à jour Context
      setToken(token);
      setUser(user);

      return response.data;

    } finally {
      setLoading(false);
    }
  };


  const register = async (data) => {
    setLoading(true);

    try {
      const response = await api.post("/register", data);

      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      return response.data;

    } catch (error) {

      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("ERRORS:", error.response?.data?.errors);

      throw error;

    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {

    try {
      await api.post("/logout");

    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);

    } finally {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};