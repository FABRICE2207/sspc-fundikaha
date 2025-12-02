import React, { useState, useEffect } from "react";
import { apiToken } from "../../api/axios";
import { Barside } from "./Barside";

export const StatCheminUser = () => {
  const role = localStorage.getItem("role");

   const [stats, setStats] = useState({
      total: 0,
      djoni_date: 0,
      djoni_en_cours: 0,
      djoni_terminee: 0,
      tamani_date: 0,
      suyan_date: 0,
      tamani_terminee: 0,
      suyan_terminee: 0,
      tamani_en_cours: 0,
      suyan_en_cours: 0,
      ceremonie_accueil_date: 0,
      ceremonie_depart_date: 0,
      ceremonie_fakwe_date: 0,
      ceremonie_bois_date: 0,
    });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiToken.get("/cheminots/stats/cheminot/me");
        console.log("Stats utilisateur:", res.data);
        setStats(res.data);
      } catch (err) {
        console.error("Erreur récupération stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    
      <div className="p-6 w-full">
        {role === "user" && (
          <>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              <StatCard title="Total des Cheminots" value={stats.total} />
              
            </div>
            {/* Étapes totales */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI" value={stats.djoni} />
              <StatCard title="TAMANI" value={stats.tamani} />
              <StatCard title="SUYAN" value={stats.suyan} />
            </div> */}

            {/* Étapes terminées */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI terminé" value={stats.djoni_terminee} />
              <StatCard title="TAMANI terminé" value={stats.tamani_terminee} />
              {/* <StatCard title="SUYAN terminé" value={stats.suyan_terminee} /> */}
            </div>

            {/* Étapes en cours */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI en cours" value={stats.djoni_en_cours} />
              <StatCard title="TAMANI en cours" value={stats.tamani_en_cours} />
              {/* <StatCard title="SUYAN en cours" value={stats.suyan_en_cours} /> */}
            </div>

            {/* Cérémonies */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <StatCard title="Cérémonie ACCUEIL" value={stats.ceremonie_accueil} />
              <StatCard title="Cérémonie DÉPART" value={stats.ceremonie_depart} />
              <StatCard title="Cérémonie FAKWÉ" value={stats.ceremonie_fakwe} />
              <StatCard title="Cérémonie BOIS SACRÉ" value={stats.ceremonie_bois} />
            </div>
          </>
        )}
      </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
    <h4 className="text-gray-500">{title}</h4>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);
