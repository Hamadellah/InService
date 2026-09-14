import { useState } from "react";


export const useservice = () => { 
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error); 
    } finally {
      setLoading(false);
    }
  }
  return { services, loading, fetchServices };
}