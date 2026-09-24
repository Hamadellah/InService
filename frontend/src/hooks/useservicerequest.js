import { useState } from "react";
import api from "../services/api";

export const useServiceRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceRequest, setServiceRequest] = useState([]);

  const makeServiceRequest = async (serviceId, requestData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(
        `/makeServiceRequest/${serviceId}`,
        requestData,
      );

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la demande");
    } finally {
      setLoading(false);
    }
  };

  const deleteServiceRequest = async (requestId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`/deleteServiceRequest/${requestId}`);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  const getServiceRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/serviceRequests");

      const data = response.data.data || response.data;

      setServiceRequest(data);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la récupération des demandes",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateServiceRequest = async (requestId, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(
        `/updateServiceRequestStatus/${requestId}`,
        updatedData,
      );

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  const getclientdemande = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/clientServiceRequests");

      const data = response.data.data || response.data;

      setServiceRequest(data);

      return data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la récupération des demandes",
      );
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
    getServiceRequests,
    updateServiceRequest,
    getclientdemande,
  };
};
