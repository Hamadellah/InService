import React from "react";
import { useservice } from "../../hooks/useservice";

export default function TechnicienDashboard() {
  const { services, loading, fetchServices } = useservice();

  const handleFetchServices = async () => {
    console.log("🟢 BUTTON CLICKED");

    try {
      const data = await fetchServices();

      console.log("🟢 Services récupérés:", data);
      console.log("🟢 Services state:", services);
    } catch (error) {
      console.error("🔴 Erreur:", error);
    }
  };

  return (
    <div>
      <h1>Technicien Dashboard</h1>

      <p>Bienvenue sur le tableau de bord du technicien.</p>

      <button onClick={handleFetchServices}>
        Charger mes services
      </button>

      <h2>Mes services</h2>

      {loading && <p>Chargement...</p>}

      {services.length === 0 && !loading && (
        <p>Aucun service trouvé.</p>
      )}

      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}