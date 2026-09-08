// src/hooks/useCalendar.js
import { useState } from 'react';
import api from '../services/api';

export const useCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async (start = null, end = null) => {
    try {
      setLoading(true);
      let url = '/hr/calendar-events';
      if (start && end) {
        url += `?start=${start}&end=${end}`;
      }
      const response = await api.get(url);
      setEvents(response.data.events || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, error, fetchEvents };
};