import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginImage from "../assets/login-image.jpg"; // remplace par ton image
import logoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {api, apiToken } from "../../api/axios";
import { jwtDecode } from "jwt-decode";

// Définir le schéma Zod
const loginSchema = z.object({
  email: z.string().min(1, "Email requis").email("Email invalide"),
  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  // const onSubmit = async (data) => {    
  //   try {
  //   const response = await api.post("/auth/login", data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   console.log("API Response:", response.data);

  //   // Exemple : stocker le token dans localStorage
  //   if (response.data.token) {
  //       const token = response.data.token;
  //       const decoded = jwtDecode(token);

  //       console.log("Token décodé:", decoded);

  //       localStorage.setItem("token", token);
  //       localStorage.setItem("role", decoded.role); // Récupéré dans le token

  //   }

  //   // Redirection après login
  //   navigate("/dashboard");
  // } catch (error) {
  //   if (error.response) {
  //     // Erreur renvoyée par le serveur
  //     console.error("Erreur login:", error.response.data);
  //   } else {
  //     console.error("Erreur login:", error.message);
  //   }
  // }
  // };

  const onSubmit = async (data) => {    
  try {
    // 1. Login
    const response = await api.post("/auth/login", data, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("API Response:", response.data);

    // 2. Stocker le token
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    } else {
      console.error("Aucun token reçu !");
      return;
    }

    // 3. Appel pour récupérer l'utilisateur connecté
    const userResponse = await apiToken.get("/auth/me");

    // console.log("Infos utilisateur :", userResponse.data);

    // 4. Stocker le rôle
    localStorage.setItem("role", userResponse.data.role);

    // 5. Redirection selon le rôle
    if (userResponse.data.role) {
      navigate("/dashboard");
    } 

  } catch (error) {
    if (error.response) {
      console.error("Erreur login:", error.response.data);
    } else {
      console.error("Erreur login:", error.message);
    }
  }
};


  return (
    <div className="h-screen flex">
      {/* Image à gauche */}
      <div className="hidden md:flex w-2/3 relative">
        {/* Image */}
        <img
          src={loginImage}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />

        {/* Overlay noir semi-transparent */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.61)] bg-opacity-50  text-white flex flex-col items-center justify-center">
          <h2 className=" text-7xl font-bold text-center px-4">
            Système de Suivi des Progressions des Cheminots du village Fundikaha 
          </h2>
          <p className="text-xl">(District les Comanches)</p>
        </div>
      </div>

      {/* Formulaire à droite */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="flex justify-center items-center h-full">
            <img src={logoImage} alt="Logo" className="w-36" />
          </div>
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-800">Connexion</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-10">
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Entrez votre email"
                {...register("email")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Mot de passe"
                {...register("password")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
