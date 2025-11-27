
import React, { useState } from "react";
import axios from "axios";

import {api} from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const RegisterSaf = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    password: "",
    paroisse: "",
    generation: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/auth/register",
        formData
      );
      console.log("Ok", response.data );
      navigate("/liste_safouins");
      

      setMessage("Utilisateur enregistré avec succès !");
      setFormData({
        nom: "",
        prenoms: "",
        paroisse: "",
        generation: "",
        email: "",
        role: "user"
      });
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'enregistrement");
    }

    setLoading(false);
  };

   return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
  
        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-4">
          {/* Header */}
          <div className="flex justify-center md:justify-between items-center mb-6">
  <h1 className="text-2xl font-bold text-gray-800 text-center md:text-left">
    Tableau de bord
  </h1>
</div>
          <div className="w-full mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-6">
        Ajouter un nouveau safouin
      </h2>

      {message && <p className="mb-4 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Nom */}
        <div>
          <label className="block mb-1">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Prénoms */}
        <div>
          <label className="block mb-1">Prénoms</label>
          <input
            type="text"
            name="prenoms"
            value={formData.prenoms}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Paroisses */}
        <div>
          <label className="block mb-1">Paroisses</label>
          <select
            name="paroisse"
            value={formData.paroisse}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option>Sélectionner une paroisse svp</option>
            <option value="STA">Saint andreas kaggwa de yopougon andokoi</option>
            <option value="SB">Saint bathémemy de la cité du banco</option>
            <option value="SE">Sainte elisabeth de yopougon ananeraie</option>
            <option value="SFA">Saint François d’Assise de Yopougon Zone Industrielle.</option>
            <option value="SJM">Saint Jacques le Majeur d’Allokoi PK23</option>
            <option value="SJB">Saint Jean-Baptiste de la Cité Mamie Adjoua</option>
            <option value="STJA">Sainte Thérèse de Jésus d’Avila ( cité ppa ex maca )</option>
          </select>
        </div>

        

        {/* Génération */}
        <div>
          <label className="block mb-1">Génération</label>
          <input
            type="text"
            name="generation"
            value={formData.generation}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        

        {/* Bouton */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>

      </form>
    </div>
  
        </div>
      </div>
    );

}
