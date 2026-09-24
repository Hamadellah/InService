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
      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id, 10),
      };
      const response = await api.post("/addService", payload);
      const newService =
        response.data?.service || response.data?.data || response.data;
      setServices((prev) => [newService, ...prev]);
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
      console.error(
        "Erreur lors de la récupération des services du technicien:",
        err,
      );
      setError(err.response?.data?.message || "Erreur de chargement");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (serviceId, formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id, 10),
      };
      const response = await api.put(`/updateService/${serviceId}`, payload);
      const updatedService =
        response.data?.service || response.data?.data || response.data;

      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId
            ? { ...service, ...updatedService }
            : service,
        ),
      );
      return response.data;
    } catch (err) {
      console.error("Erreur PUT service:", err.response?.data || err.message);
      throw err;
    }
  };

  const deleteService = async (serviceId) => {
    try {
      await api.delete(`/deleteService/${serviceId}`);
      setServices((prev) => prev.filter((service) => service.id !== serviceId));
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du service:",
        err.response?.data || err.message,
      );
      throw err;
    }
  };

  return {
    services,
    loading,
    error,
    fetchServices,
    addService,
    messervices,
    updateService, 
    deleteService,
  };
};
