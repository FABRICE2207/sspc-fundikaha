import './App.css'
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Safouins } from './components/Safouins';
import { RegisterSaf } from './components/RegisterSaf';
import { ListeCheminots } from './components/ListeCheminots';
import { RegisterChem } from './components/RegisterChem';
import { ListeCheminotSaf } from './components/ListeCheminotSaf';
import { UpdateCheminot } from './components/UpdateCheminot';
import { CheminotGet } from './components/CheminotGet';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ajouter_safouin" element={<RegisterSaf />} />
          <Route path="/ajouter_cheminot" element={<RegisterChem />} />
          <Route path="/liste_safouins" element={<Safouins />} />
          <Route path="/liste_cheminots" element={<ListeCheminots />} />
          <Route path="/liste_cheminots_saf" element={<ListeCheminotSaf />} />
          <Route path="/informations_cheminots/:id" element={<CheminotGet/>} />
          <Route path="/update_cheminot/:id" element={<UpdateCheminot />} />
          {/* <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/roles" element={<Roles />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} /> */}
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

// Page 404 simple
const NotFound = () => (
  <div className="h-screen flex items-center justify-center text-2xl">
    Page introuvable
  </div>
);

export default App;


