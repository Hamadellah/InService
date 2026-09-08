import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const {register,loading} = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        city: "",
        image: null,
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate("/dashboard");
        }catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            alert("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };
   return (
        <form onSubmit={handleSubmit}>

            <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
            />

            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <input
                name="role"
                placeholder="Role"
                onChange={handleChange}
            />
            <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
            />
            <input
                name="city"
                placeholder="City"
                onChange={handleChange}
            />
            <input
                name="image"
                type="text"
                placeholder="Image"
                onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer un compte"}
            </button>

        </form>
    );
};