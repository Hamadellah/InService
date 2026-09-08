// src/hooks/useLeaveRequests.js
import { useState, useEffect } from "react";
import api from "../services/api";

export const useLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchRequests = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/leave-requests?page=${page}`);
      setRequests(response.data.leave_requests?.data || []);
      setPagination(response.data.leave_requests || null);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const createRequest = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "attachment" && data[key]) {
          formData.append(key, data[key]);
        } else if (key === "replacement_plan" && data[key]) {
          formData.append(key, JSON.stringify(data[key]));
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      const response = await api.post("/leave-requests", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchRequests();
      return { success: true, data: response.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Erreur lors de la création",
      };
    }
  };

  const cancelRequest = async (id) => {
    try {
      await api.delete(`/leave-requests/${id}`);
      await fetchRequests();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Erreur lors de l'annulation",
      };
    }
  };

  return {
    requests,
    loading,
    error,
    pagination,
    fetchRequests,
    createRequest,
    cancelRequest,
  };
};
