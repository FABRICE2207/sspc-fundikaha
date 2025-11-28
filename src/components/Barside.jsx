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

export const Barside = () => {
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
<div className="md:hidden fixed top-4 left-4 z-30 flex items-center gap-2">
  {!open ? (
    <button
      onClick={() => setOpen(true)}
      className="bg-gray-900 text-white p-2 rounded"
    >
      <Menu size={24} />
    </button>
  ) : (
    <button
      onClick={() => setOpen(false)}
      className="bg-gray-900 text-white p-2 rounded"
    >
      <X size={24} />
    </button>
  )}
</div>


    {/* Overlay noir quand menu ouvert */} {open && ( <div className="fixed inset-0 bg-[#00000047] bg-opacity-50 z-10 md:hidden" onClick={() => setOpen(false)} /> )}

    {/* Sidebar */}
    <aside
      className={`
        fixed md:relative top-0 left-0 z-20 bg-gray-900 text-white w-64 min-h-screen p-5
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300
        flex flex-col justify-between
      `}
    >
      {/* Contenu menu */}
      <div>
        {/* Logo */}
        <div className="flex justify-center items-center w-full mb-4 md:mb-6">
          <img src={logoImage} alt="Logo" className="object-cover w-28" />
        </div>

        <nav className="space-y-4">
          <MenuItem icon={<Home size={20} />} label="Accueil" to="/dashboard" />

          {role === "admin" && (
            <MenuItem icon={<Users size={20} />} label="Safouins" to="/liste_safouins" />
          )}

          {role === "user" && (
            <MenuItem icon={<Users size={20} />} label="Cheminots" to="/liste_cheminots_saf" />
          )}

          {role === "admin" && (
            <>
              <MenuItem icon={<Users size={20} />} label="Cheminots" to="/liste_cheminots" />
              <MenuItem icon={<Users size={20} />} label="Gestion Paroisses" to="/paroisses" />
            </>
          )}
        </nav>
      </div>

      {/* Déconnexion en bas */}
      <div className="mt-4 md:mt-0">
        <MenuItem
          icon={<LogOut size={20} />}
          label="Déconnexion"
          to="/"
          onClick={() => localStorage.clear()}
        />
      </div>
    </aside>
  </div>
);

};
