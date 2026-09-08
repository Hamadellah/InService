// src/hooks/useApprovals.js
import { useState, useEffect } from "react";
import api from "../services/api";

export const useApprovals = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get("/leave-requests/pending");
      console.log("📋 Pending requests:", response.data);
      setPendingRequests(response.data.requests || []);
    } catch (err) {
      console.error("❌ Error fetching pending requests:", err);
      setError(err.response?.data?.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const approveRequest = async (id) => {
    try {
      const response = await api.post(`/leave-requests/${id}/approve`);
      await fetchPendingRequests();
      return { success: true, data: response.data };
    } catch (err) {
      console.error("❌ Error approving:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Erreur lors de l'approbation",
      };
    }
  };

  const rejectRequest = async (id, comment = null) => {
    try {
      const response = await api.post(`/leave-requests/${id}/reject`, {
        comment,
      });
      await fetchPendingRequests();
      return { success: true, data: response.data };
    } catch (err) {
      console.error("❌ Error rejecting:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Erreur lors du refus",
      };
    }
  };

  return {
    pendingRequests,
    loading,
    error,
    fetchPendingRequests,
    approveRequest,
    rejectRequest,
  };
};
