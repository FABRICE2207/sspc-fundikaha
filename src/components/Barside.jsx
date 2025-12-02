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
  <div>
    {/* Bouton hamburger visible uniquement sur mobile */}
    <button
      className="md:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white p-2 rounded-lg shadow"
      onClick={() => setOpen(!open)}
    >
      {open ? <X size={24} /> : <Menu size={24} />}
    </button>

    {/* Overlay sombre (mobile) */}
    {open && (
      <div
        className="fixed inset-0 bg-black/50 z-20 md:hidden"
        onClick={() => setOpen(false)}
      />
    )}

    {/* SIDEBAR */}
    <aside
      className={`
        fixed md:static top-0 left-0 z-30
        w-64 h-screen bg-gray-900 text-white p-5 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Logo */}
      <div>
        <div className="flex justify-center mb-6">
          <img src={logoImage} alt="Logo" className="w-28 object-cover" />
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          <MenuItem icon={<Home size={20} />} label="Accueil" to="/dashboard" />

          {role === "admin" && (
            <MenuItem
              icon={<Users size={20} />}
              label="Safouins"
              to="/liste_safouins"
            />
          )}

          {role === "user" && (
            <MenuItem
              icon={<Users size={20} />}
              label="Cheminots"
              to="/liste_cheminots_saf"
            />
          )}

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
        </nav>
      </div>

      {/* Déconnexion */}
      <div className="pt-4 border-t border-gray-700">
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
