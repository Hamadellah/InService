import { useState } from "react";
import api from "../services/api.js";

export const useService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);

    try {
      const response = await api.get("/services");
      setServices(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const mesServices = async () => {
    setLoading(true);

    try {
      const response = await api.get("/servicesTechnicien");
      setServices(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const addService = async (formData) => {
    try {
      await api.post("/addService", formData);

      await mesServices();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  const updateService = async (serviceId, formData) => {
    try {
      await api.put(`/updateService/${serviceId}`, formData);

      await mesServices();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await api.delete(`/deleteService/${serviceId}`);

      await mesServices();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  return {
    services,
    loading,
    error,
    fetchServices,
    mesServices,
    addService,
    updateService,
    deleteService,
  };
};
