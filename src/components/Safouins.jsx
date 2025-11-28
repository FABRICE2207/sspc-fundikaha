import React, { useState, useEffect } from "react";
import { Home, Users, BarChart2, Settings, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import { Barside } from "./Barside";


const MenuItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer transition text-white"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const Safouins = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/get_users_all");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur API :", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Barside />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>

          
        </div>

        {/* Section content */}
<div className="bg-white p-6 rounded-lg shadow w-full max-w-full">
  <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
    <h2 className="text-xl font-bold md:text-left w-full md:w-auto">
      Liste des safouins
    </h2>

    <Link
      to="/ajouter_safouin"
      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md text-center"
    >
      Ajouter un nouveau safouin
    </Link>
  </div>

  {/* Conteneur du tableau AVEC scroll horizontal */}
  <div className="w-full rounded">
    <table className="min-w-[900px] w-full overflow-x-scroll border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 text-left">Nom</th>
          <th className="p-2 text-left">Prénoms</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Paroisse</th>
          <th className="p-2 text-left">Génération</th>
          <th className="p-2 text-left">Inscrit le</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-100">
            <td className="p-2 whitespace-nowrap">{user.nom}</td>
            <td className="p-2 whitespace-nowrap">{user.prenoms}</td>
            <td className="p-2 whitespace-nowrap">{user.email}</td>
            <td className="p-2 whitespace-nowrap">{user.paroisse}</td>
            <td className="p-2 whitespace-nowrap">{user.generation}</td>
            <td className="p-2 whitespace-nowrap">
              {new Date(user.created_at).toLocaleString("fr-FR", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
