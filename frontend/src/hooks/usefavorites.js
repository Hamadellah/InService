import { useState } from "react";
import api from "../services/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/getfavorites");

      const data =
        response.data?.favorites || response.data?.data || response.data || [];

      setFavorites(Array.isArray(data) ? data : []);

      return response.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Erreur lors du chargement des favoris";

      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makeFavorite = async (serviceId) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await api.post(`/makeFavorite/${serviceId}`);

      setMessage(response.data?.message || "Favori ajouté avec succès!");

      return response.data;
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Une erreur est survenue lors de l'ajout du favori";

      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

const deleteFavorite = async (technicienId) => {
  setLoading(true);
  setError(null);
  setMessage(null);

  try {
    const response = await api.delete(`/deleteFavorite/${technicienId}`);

    setMessage(response.data?.message || "Favori supprimé avec succès!");

    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (fav) => Number(fav.technicien_id) !== Number(technicienId),
      ),
    );

    return response.data;
  } catch (err) {
    const errorMsg =
      err.response?.data?.message ||
      "Une erreur est survenue lors de la suppression du favori";

    setError(errorMsg);

    throw err;
  } finally {
    setLoading(false);
  }
};

  return {
    favorites,
    loading,
    error,
    message,
    getFavorites,
    makeFavorite,
    deleteFavorite,
  };
};
