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
      return response.data;
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

  const deleteServiceRequest = async (serviceRequestId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(
        `/deleteServiceRequest/${serviceRequestId}`, // Msa7a7na l-variable name
      );
      setServiceRequest(null); // Reset l-state dyal serviceRequest
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
