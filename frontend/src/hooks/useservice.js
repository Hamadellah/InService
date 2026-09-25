import { useState } from "react";
import api from "../services/api.js";

export const useservice = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all services
  const fetchServices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/services");

      let data = response.data;

      if (!Array.isArray(data)) {
        data = response.data?.services || response.data?.data || [];
      }

      setServices(data);

      return response.data;
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Erreur de chargement");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add service
  const addService = async (formData) => {
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id, 10),
      };

      const response = await api.post("/addService", data);

      const newService =
        response.data?.service || response.data?.data || response.data;

      setServices((oldServices) => [newService, ...oldServices]);

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // Get technicien services
  const messervices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/servicesTechnicien");

      let data = response.data;

      if (!Array.isArray(data)) {
        data = response.data?.services || response.data?.data || [];
      }

      setServices(data);

      return response.data;
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Erreur de chargement");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update service
  const updateService = async (serviceId, formData) => {
    try {
      const data = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id, 10),
      };

      const response = await api.put(`/updateService/${serviceId}`, data);

      const updatedService =
        response.data?.service || response.data?.data || response.data;

      setServices((oldServices) =>
        oldServices.map((service) => {
          if (service.id === serviceId) {
            return {
              ...service,
              ...updatedService,
            };
          }

          return service;
        }),
      );

      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // Delete service
  const deleteService = async (serviceId) => {
    try {
      await api.delete(`/deleteService/${serviceId}`);

      setServices((oldServices) =>
        oldServices.filter((service) => service.id !== serviceId),
      );
    } catch (err) {
      console.log(err);
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
