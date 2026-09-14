import { useState } from "react";
import api from "../services/api.js";

export const useservice = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);

    try {
      const response = await api.get("/services");

      setServices(response.data.services);

      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    loading,
    fetchServices,
  };
};
