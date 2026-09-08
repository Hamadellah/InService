import {createContext, useContext, useState} from "react";
import axios from "axios";
import api from "../services/api.js";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const [user , setUser] = useState(null);
  const [loading , setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/login",{email, password,});
      const {user, token} = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      return response.data;


    }finally {
      setLoading(false);
    }

  };
  const register = async(data) => {
    setLoading(true);
    try{
      const response = await api.post("register", data);
      const {user, token} = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      return response.data;
    }finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
    await api.post("/logout");
    }catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
} 
 export const useAuth = () => {
  return useContext(AuthContext);
}