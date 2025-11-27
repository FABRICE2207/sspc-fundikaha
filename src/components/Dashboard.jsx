import React, { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import {apiToken} from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [role, setRole] = useState("");
  const navigate = useNavigate();

  
  return (
    <div className="">
      {/* Sidebar */}
      <Sidebar />

    

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 min-h-screen bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Utilisateurs" value="10" />
          <StatCard title="Cheminots" value="450" />
          <StatCard title="Paroisses" value="6" />
        </div>

        {/* Section content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Dernières inscriptions</h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Nom</th>
                <th className="p-2 text-left">Paroisse</th>
                <th className="p-2 text-left">Génération</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">ADOU Fabrice</td>
                <td className="p-2">St Pierre</td>
                <td className="p-2">2022</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2">KOUASSI Jean</td>
                <td className="p-2">Ste Marie</td>
                <td className="p-2">2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-5">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-3xl font-bold text-orange-500 mt-2">{value}</p>
  </div>
);
