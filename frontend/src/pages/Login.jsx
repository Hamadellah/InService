import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login , loading} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Connexion réussie:", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("mot de passe ou email incorrect");
    }
  }

 return (
        <form onSubmit={handleSubmit}>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
            </button>

        </form>
    );
}