import { useState } from "react";
import api from "../services/api";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Get favorites
  const getFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/getfavorites");

      let data = response.data;

      if (response.data?.favorites) {
        data = response.data.favorites;
      } else if (response.data?.data) {
        data = response.data.data;
      }

      if (Array.isArray(data)) {
        setFavorites(data);
      } else {
        setFavorites([]);
      }

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement des favoris",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add favorite
  const makeFavorite = async (serviceId) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await api.post(`/makeFavorite/${serviceId}`);

      setMessage(response.data?.message || "Favori ajouté avec succès!");

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de l'ajout du favori",
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete favorite
  const deleteFavorite = async (technicienId) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await api.delete(`/deleteFavorite/${technicienId}`);

      setMessage(response.data?.message || "Favori supprimé avec succès!");

      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favorite) => Number(favorite.technicien_id) !== Number(technicienId),
        ),
      );

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la suppression du favori",
      );

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
