import axios from "axios";

// Instance sans token
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const apiToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ Ajouter automatiquement le token à chaque requête
apiToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Gérer le cas token expiré ou invalide
apiToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expiré ou invalide");

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      window.location.href = "/"; 
    }

    return Promise.reject(error);
  }
);

export { api, apiToken };
