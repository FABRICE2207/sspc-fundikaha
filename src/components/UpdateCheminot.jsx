import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {api} from "../../api/axios";
import { Sidebar } from "./Sidebar";

export const UpdateCheminot = () => {
  const { id } = useParams();
  const [cheminot, setCheminot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCheminot = async () => {
      try {
        const res = await api.get(`/cheminots/get_cheminots/${id}`);
        setCheminot(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchCheminot();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheminot((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/cheminots/${id}`, cheminot);
      alert("Cheminot mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur pendant la mise à jour");
    }
  };

  if (!cheminot) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
          {/* Sidebar */}
          <Sidebar />
    
          {/* Main Content */}
          <div className="flex-1 md:ml-64 p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
            </div>
    
            {/* Section content */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Modifier le Cheminot</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="nom"
          value={cheminot.nom}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Nom"
        />

        <input
          type="text"
          name="prenoms"
          value={cheminot.prenoms}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Prénoms"
        />

        <input
          type="text"
          name="matricule"
          value={cheminot.matricule}
          className="border p-2 rounded bg-gray-100"
          readOnly
        />

        <input
          type="text"
          name="sexe"
          value={cheminot.sexe}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="paroisse"
          value={cheminot.paroisse}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="generation"
          value={cheminot.generation}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="date_monte"
          value={cheminot.date_monte}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="col-span-2 mt-4 justify-end items-end">
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-orange-500 text-white py-2 px-3 rounded hover:bg-orange-600 transition"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </form>
    
            
            </div>
          </div>
    </div>
  );
};

