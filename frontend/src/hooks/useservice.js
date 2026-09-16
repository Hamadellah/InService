import { useState } from "react";
import api from "../services/api.js";

export const useservice = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/services");

      // Extraction aamina dyal data b-jami3 l-7alāt (direct array, .services, awla .data)
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.services || response.data?.data || [];

      setServices(data);
      return response.data;
    } catch (err) {
      console.error("Erreur lors de la récupération des services:", err);
      setError(err.response?.data?.message || "Erreur de chargement");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addService = async (formData) => {
    try {
      // Cast dyal number types bash t-eviter type mismatch f Laravel/Backend
      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id, 10),
      };

      // Direct post b l-instance dyal axios
      const response = await api.post("/addService", payload);

      // Extract new service data
      const newService =
        response.data?.service || response.data?.data || response.data;

      // Update state f local bash t-ban f l-dashboard blama t-dir reload
      setServices((prevServices) => [newService, ...prevServices]);

      return response.data;
    } catch (err) {
      console.error("Erreur POST service:", err.response?.data || err.message);
      throw err;
    }
  };
  const messervices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/servicesTechnicien");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.services || response.data?.data || [];
      setServices(data);
      return response.data;
    } catch (err) {
      console.error("Erreur lors de la récupération des services du technicien:", err);
      setError(err.response?.data?.message || "Erreur de chargement");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { services, loading, error, fetchServices, addService, messervices };
};
