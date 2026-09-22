import { useState } from "react";
import api from "../services/api.js";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const makeFavorite = async (serviceId) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await api.post(`/favorite/${serviceId}`);

      // Message de succès du backend
      const serverMessage = response.data?.message || "Opération réussie!";
      setMessage(serverMessage);

      return response.data;
    } catch (err) {
      // Extraction du message renvoyé par le backend (même en cas d'erreur 400/404)
      const errorMsg = err.response?.data?.message || "Une erreur est survenue";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
    };
    const getFavorites = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/getfavorites');
            const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
            setFavorites(data);
            return data;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Une erreur est survenue lors de la récupération des favoris";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    }

  return { favorites, loading, error, message, makeFavorite, getFavorites };
};
