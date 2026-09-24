import { useState, useEffect } from "react";
import api from "../services/api.js";

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);

    try {
      const response = await api.get("/user");

      setUserProfile(response.data.profile);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Erreur lors du chargement du profil"
      );
    } finally {
      setLoading(false);
    }
  };

  const completeProfile = async (formData) => {
    try {
      const response = await api.put("/completeProfile", formData);

      await fetchProfile();

      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Erreur lors de la modification du profil"
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    userProfile,
    loading,
    error,
    fetchProfile,
    completeProfile,
  };
};