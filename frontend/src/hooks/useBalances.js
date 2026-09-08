// src/hooks/useBalances.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useBalances = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalances = async () => {
    try {
      setLoading(true);
      const response = await api.get('/leave-balances');
      setBalances(response.data.balances || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des soldes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  return { balances, loading, error, refetch: fetchBalances };
};