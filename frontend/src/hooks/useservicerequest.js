import { useState } from "react";
import api from "../services/api";

export const useServiceRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceRequest, setServiceRequest] = useState(null);

  const makeServiceRequest = async (serviceId, requestData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        `/makeServiceRequest/${serviceId}`,
        requestData,
      );

      setServiceRequest(response.data);
      return response.data; // Kay-rje3 fih l-data dyal l-demande li t-créat (ykon fih id)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Une erreur est survenue lors de la demande.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteServiceRequest = async (requestId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/deleteServiceRequest/${requestId}`);
      setServiceRequest(null);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Une erreur est survenue lors de la suppression de la demande.";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    serviceRequest,
    makeServiceRequest,
    deleteServiceRequest,
  };
};
