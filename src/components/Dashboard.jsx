import React, { useState, useEffect } from "react";
import { api, apiToken } from "../../api/axios";
import { Barside } from "./Barside";
import { StatCheminUser } from "./StatCheminUser";

export const Dashboard = () => {
  const [selectedParoisse, setSelectedParoisse] = useState("TOUS");
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
    ceremonie_accueil: 0,
    ceremonie_depart: 0,
    ceremonie_fakwe: 0,
    ceremonie_bois_sacre: 0,
  });

useEffect(() => {
  const fetchStats = async () => {
    try {
      // URL backend selon paroisse
      const url =
        selectedParoisse === "TOUS"
          ? "/cheminots/stats"
          : `/cheminots/stats/cheminots?paroisse=${selectedParoisse}`;

      // // // Récupérer infos user connecté (optionnel selon ton écran)
      // await apiToken.get("/cheminots/stats/cheminot/me");

      // Récupérer les stats complètes
      const response = await api.get(url);

      const general = response.data.general[0] || {};
      const paroisses = response.data.par_paroisse || [];

      let statsParoisse = {};
      if (selectedParoisse !== "TOUS") {
        statsParoisse =
          paroisses.find((p) => p._id === selectedParoisse) || {};
      }

      // Construction objet final
      setStats({
        total: 0,

        // --- TOTAL DES CHEMINOTS ---
        total:
          selectedParoisse === "TOUS"
            ? general.total || 0
            : statsParoisse.total || 0,

        djoni_terminee:
          selectedParoisse === "TOUS"
            ? paroisses.length
            : 1,

        // --- ÉTAPES ---
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

        // --- ÉTAPES TERMINÉES ---
        djoni_terminee:
          selectedParoisse === "TOUS"
            ? general.djoni_terminee || 0
            : statsParoisse.djoni_terminee || 0,

        tamani_terminee:
          selectedParoisse === "TOUS"
            ? general.tamani_terminee || 0
            : statsParoisse.tamani_terminee || 0,

        suyan_terminee:
          selectedParoisse === "TOUS"
            ? general.suyan_terminee || 0
            : statsParoisse.suyan_terminee || 0,

        // --- ÉTAPES EN COURS ---
        djoni_en_cours:
          selectedParoisse === "TOUS"
            ? general.djoni_en_cours || 0
            : statsParoisse.djoni_en_cours || 0,

        tamani_en_cours:
          selectedParoisse === "TOUS"
            ? general.tamani_en_cours || 0
            : statsParoisse.tamani_en_cours || 0,

        suyan_en_cours:
          selectedParoisse === "TOUS"
            ? general.suyan_en_cours || 0
            : statsParoisse.suyan_en_cours || 0,

        // --- CÉRÉMONIES ---
        ceremonie_accueil:
          selectedParoisse === "TOUS"
            ? general.ceremonie_accueil || 0
            : statsParoisse.ceremonie_accueil || 0,

        ceremonie_depart:
          selectedParoisse === "TOUS"
            ? general.ceremonie_depart || 0
            : statsParoisse.ceremonie_depart || 0,

        ceremonie_fakwe:
          selectedParoisse === "TOUS"
            ? general.ceremonie_fakwe || 0
            : statsParoisse.ceremonie_fakwe || 0,

        ceremonie_bois_sacre:
          selectedParoisse === "TOUS"
            ? general.ceremonie_bois_sacre || 0
            : statsParoisse.ceremonie_bois_sacre || 0,
      });
    } catch (error) {
      console.error("Erreur stats :", error);
    }
  };

  fetchStats();
}, [selectedParoisse]);

  return (
    <div className="flex h-screen">
  {/* Sidebar */}
  <Barside />

  {/* Main Content */}
  <div className="flex-1 p-4 bg-gray-100 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        </div>

        {role === "admin" && (
          <>
            {/* Sélecteur de paroisse */}
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
              
              <StatCard title="Total des Cheminots" value={stats.total} />
              
            </div>

            {/* Cards étapes totales */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI" value={stats.djoni_date} />
              <StatCard title="TAMANI" value={stats.tamani_date} />
              <StatCard title="SUYAN" value={stats.suyan_date} />
            </div> */}

            {/* Cards étapes terminées */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI terminé" value={stats.djoni_terminee} />
              <StatCard title="TAMANI terminé" value={stats.tamani_terminee} />
              {/* <StatCard title="SUYAN terminé" value={stats.suyan_terminee} /> */}
            </div>

            {/* Cards étapes en cours */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard title="DJONI en cours" value={stats.djoni_en_cours} />
              <StatCard title="TAMANI en cours" value={stats.tamani_en_cours} />
              {/* <StatCard title="SUYAN en cours" value={stats.suyan_en_cours} /> */}
            </div>

            {/* Cards cérémonies */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <StatCard title="Cérémonie ACCUEIL" value={stats.ceremonie_accueil} />
              <StatCard title="Cérémonie BOIS SACRÉ" value={stats.ceremonie_bois_sacre} />
              <StatCard title="Cérémonie FAKWÉ" value={stats.ceremonie_fakwe} />
              <StatCard title="Cérémonie DÉPART" value={stats.ceremonie_depart} />
            </div>
          </>
        )}
        {role === "user" && (
          <>
            <StatCheminUser />
          </>
        )}


      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
    <h4 className="text-gray-500">{title}</h4>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);
