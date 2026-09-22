// hooks/usecategory.js
import { useState } from "react";
import api from "../services/api.js";

export const usecategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("categories");

      // Extraction sécurisée quel que soit le format de réponse Laravel (Paginated, Resource, or Direct Array)
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.categories || [];

      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, fetchCategories };
};
