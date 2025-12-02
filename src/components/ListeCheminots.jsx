import React, { useState, useEffect } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { Barside } from "./Barside";

export const ListeCheminots = () => {
  const [open, setOpen] = useState(false);

  const [cheminots, setChemiots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchcheminots();
  }, []);

  const fetchcheminots = async () => {
    try {
      const response = await api.get("/cheminots/get_all_cheminots");
      // console.log("Liste des cheminots", response.data);
      setChemiots(response.data);
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
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        </div>

        {/* Section content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
            <h2 className="text-xl font-bold md:text-left w-full md:w-auto">
              Liste de tous les cheminots du village
            </h2>
          </div>

          {/* Champ de recherche */}
          <div className="mb-4 grid grid-cols-1">
            <label htmlFor="">Rechercher un cheminot</label>
            <input
              type="text"
              placeholder="Sexe, Nom, Matricule...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Conteneur du tableau AVEC scroll horizontal */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="p-2 text-left">Sexe</th>
                  <th className="p-2 text-left">Matricule scoute</th>
                  <th className="p-2 text-left">Nom</th>
                  <th className="p-2 text-left">Prénoms</th>
                  <th className="p-2 text-left">Date de naissance</th>
                  <th className="p-2 text-left">Date de monté</th>
                  <th className="p-2 text-left">Paroisse</th>
                  <th className="p-2 text-left">Génération</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cheminots.filter((c) => {
                  const q = search.toLowerCase();
                  return (
                    c.nom.toLowerCase().includes(q) ||
                    c.prenoms.toLowerCase().includes(q) ||
                    c.matricule.toLowerCase().includes(q) ||
                    c.paroisse.toLowerCase().includes(q) ||
                    c.generation.toLowerCase().includes(q) ||
                    c.sexe.toLowerCase().includes(q)
                  );
                }).length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center p-4 text-gray-500">
                      Aucun cheminot trouvé.
                    </td>
                  </tr>
                ) : (
                  cheminots
                    .filter((c) => {
                      const q = search.toLowerCase();
                      return (
                        c.nom.toLowerCase().includes(q) ||
                        c.prenoms.toLowerCase().includes(q) ||
                        c.matricule.toLowerCase().includes(q) ||
                        c.paroisse.toLowerCase().includes(q) ||
                        c.generation.toLowerCase().includes(q) ||
                        c.sexe.toLowerCase().includes(q)
                      );
                    })
                    .map((cheminot) => (
                      <tr
                        key={cheminot._id}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="p-2 whitespace-nowrap">
                          {cheminot.sexe}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {cheminot.matricule}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {cheminot.nom}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {cheminot.prenoms}
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          {new Date(cheminot.date_naissance).toLocaleString(
                            "fr-FR",
                            {
                              dateStyle: "long",
                            }
                          )}
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          {new Date(cheminot.date_monte).toLocaleString(
                            "fr-FR",
                            {
                              dateStyle: "long",
                            }
                          )}
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          {cheminot.paroisse}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {cheminot.generation}
                        </td>

                        <td className="p-2 whitespace-nowrap flex gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/informations_cheminots/${cheminot._id}`
                              )
                            }
                            className="bg-yellow-500 text-white text-center py-2 px-3 rounded-md hover:bg-yellow-600 cursor-pointer"
                          >
                            <FaEye />
                          </button>

                          {/* <button
                          onClick={() => deleteCheminot(cheminot._id)}
                          className="bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 cursor-pointer"
                        >
                          <FaTrash />
                        </button> */}
                        </td>
                      </tr>
                    ))
                )}
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
