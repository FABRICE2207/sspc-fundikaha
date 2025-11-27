
import React, { useState } from "react";
import axios from "axios";
import { Sidebar } from "./Sidebar";
import {api} from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AddCheminot from "./AddCheminot";

export const RegisterChem = () => {
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
      <h2 className="text-xl font-bold">
        Ajouter un nouveau cheminot
      </h2>

      {/* {message && <p className="mb-4 text-center">{message}</p>} */}
      <AddCheminot />
    </div>
  
        </div>
      </div>
    );

}
