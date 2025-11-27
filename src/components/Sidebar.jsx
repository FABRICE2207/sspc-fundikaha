import { useState, useEffect } from "react";
import { Home, Users, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";
import { apiToken } from "../../api/axios";


const MenuItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 cursor-pointer transition text-white"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await apiToken.get("/auth/me");
      // console.log("Utilisateur connecté :", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Erreur utilisateur :", error);
    }
  };

  fetchUser();
}, []);

// Si user pas encore chargé
  if (!user) return null;

  const role = user.role;

  return (
    <div className="fixed">
      {/* Bouton hamburger (mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setOpen(true)}
          className="bg-gray-900 text-white p-2 rounded"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay noir quand menu ouvert */}
      {open && (
        <div
          className="fixed inset-0 bg-[#00000047] bg-opacity-50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 z-20 bg-gray-900 text-white w-64 min-h-screen p-5
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300
        `}
      >
        {/* Bouton fermer mobile */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <img src={logoImage} alt="Logo" className="w-20" />
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Logo desktop */}
        <div className="hidden md:flex justify-center items-center w-full mb-4">
          <img src={logoImage} alt="Logo" className="object-cover w-28" />
        </div>

        {/* <nav className="space-y-4 mt-6">
          <MenuItem
            icon={<Home size={20} />}
            label="Accueil"
            to="/dashboard"
            onClick={() => setOpen(false)}
          />

          <MenuItem
            icon={<Users size={20} />}
            label="Safouins"
            to="/liste_safouins"
            onClick={() => setOpen(false)}
          />

          <MenuItem
            icon={<Users size={20} />}
            label="Cheminots"
            to="/users"
            onClick={() => setOpen(false)}
          />

          <MenuItem
            icon={<LogOut size={20} />}
            label="Déconnexion"
            to="/"
            onClick={() => setOpen(false)}
          />
        </nav> */}

        <nav className="space-y-4 mt-6">

          {/* Visible à tous */}
          <MenuItem icon={<Home size={20} />} label="Accueil" to="/dashboard" />

          {/* Visible à admin et user */}
          {(role === "admin") && (
            <MenuItem 
              icon={<Users size={20} />} 
              label="Safouins" 
              to="/liste_safouins" 
            />
          )}
           {/* Visible uniquement aux users */}
          {role === "user" && (
            <>
              <MenuItem 
                icon={<Users size={20} />} 
                label="Cheminots" 
                to="/liste_cheminots_saf" 
              />
            </>
          )}

          {/* Visible uniquement aux admins */}
          {role === "admin" && (
            <>
              <MenuItem 
                icon={<Users size={20} />} 
                label="Cheminots" 
                to="/liste_cheminots" 
              />

              <MenuItem 
                icon={<Users size={20} />} 
                label="Gestion Paroisses" 
                to="/paroisses" 
              />
            </>
          )}

          {/* Déconnexion */}
          <MenuItem 
            icon={<LogOut size={20} />} 
            label="Déconnexion" 
            to="/" 
            onClick={() => {
              localStorage.clear();
            }}
          />
        </nav>
      </aside>
    </div>
  );
};
