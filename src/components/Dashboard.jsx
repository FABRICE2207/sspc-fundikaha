import React, { useState, useEffect } from "react";

import {api} from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Barside } from "./Barside";

export const Dashboard = () => {
  const [selectedParoisse, setSelectedParoisse] = useState("TOUS");
  // Récupération du rôle depuis localStorage
  const role = localStorage.getItem("role");


    const [stats, setStats] = useState({
    total_users: 0,
    total_cheminots: 0,
    total_paroisses: 0,
    djoni: 0,
    tamani: 0,
    suyan: 0
  });

 useEffect(() => {
    const fetchStats = async () => {
      try {
        const url =
          selectedParoisse === "TOUS"
            ? "/cheminots/stats"
            : `/cheminots/stats/cheminots?paroisse=${selectedParoisse}`;

        const response = await api.get(url);

        const general = response.data.general[0] || {};
        const paroisses = response.data.par_paroisse || [];

        let statsParoisse = {};

        if (selectedParoisse !== "TOUS") {
          statsParoisse =
            paroisses.find((p) => p._id === selectedParoisse) || {};
        }

        setStats({
          total_users: 0,

          total_cheminots:
            selectedParoisse === "TOUS"
              ? general.total || 0
              : statsParoisse.total || 0,

          total_paroisses:
            selectedParoisse === "TOUS"
              ? paroisses.length
              : 1,

          djoni:
            selectedParoisse === "TOUS"
              ? general.djoni || 0
              : statsParoisse.djoni || 0,

          tamani:
            selectedParoisse === "TOUS"
              ? general.tamani || 0
              : statsParoisse.tamani || 0,

          suyan:
            selectedParoisse === "TOUS"
              ? general.suyan || 0
              : statsParoisse.suyan || 0,
        });

      } catch (error) {
        console.error("Erreur stats :", error);
      }
    };

    fetchStats();
  }, [selectedParoisse]);

  
  return (
    <div className="">
      {/* Sidebar */}
      <Barside />


      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 min-h-screen bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        </div>



      {/* Cards (uniquement si admin) */}
        {role === "admin" && (
          <>

          {/* Paroisse select */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Paroisse</label>
        <select
          value={selectedParoisse}
          onChange={(e) => setSelectedParoisse(e.target.value)}
          className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="TOUS">Toutes les paroisses</option>
          <option value="STA">Saint Andreas Kaggwa</option>
          <option value="SB">Saint Barthélémy</option>
          <option value="SE">Sainte Elisabeth</option>
          <option value="SFA">Saint François d’Assise</option>
          <option value="SJM">Saint Jacques le Majeur</option>
          <option value="SJB">Saint Jean-Baptiste</option>
          <option value="STJA">Sainte Thérèse</option>
          <option value="NDA">Notre Dame d'Assomption</option>
        </select>
      </div>

            {/* Cards générales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="Utilisateurs" value={stats.total_users} />
              <StatCard title="Cheminots" value={stats.total_cheminots} />
              <StatCard title="Paroisses" value={stats.total_paroisses} />
            </div>

            {/* Cards étapes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI" value={stats.djoni} />
              <StatCard title="TAMANI" value={stats.tamani} />
              <StatCard title="SUYAN" value={stats.suyan} />
            </div>
          </>
        )}

      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};
