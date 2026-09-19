import { useState, useEffect } from "react";
import api from "../services/api.js";

export const useProfile = () => {
  const [data, setData] = useState(null); // gha ihzz l-object 'profile' li f JSON
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial profile data
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/user"); // Badli l-endpoint ila kan khtalf
      setData(response.data?.profile || null);
    } catch (err) {
      console.error("Erreur fetch profile:", err);
      setError(
        err.response?.data?.message || "Erreur lors du chargement du profil",
      );
    } finally {
      setLoading(false);
    }
  };

  // Update profile details via completeProfile
  const completeProfile = async (formData) => {
    setError(null);
    try {
      const response = await api.put("/completeProfile", formData);
      // Backend kay-rje3 'profile' (soit client object, soit technicien object)
      if (response.data?.profile) {
        setData((prev) => {
          if (!prev) return prev;
          if (prev.role === "client") {
            return { ...prev, client: response.data.profile };
          } else if (prev.role === "technicien") {
            return { ...prev, technicien: response.data.profile };
          }
          return prev;
        });
      }
      return response.data;
    } catch (err) {
      console.error("Erreur complete profile:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    userProfile: data,
    loading,
    error,
    fetchProfile,
    completeProfile,
  };
};
