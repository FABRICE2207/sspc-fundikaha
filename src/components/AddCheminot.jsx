import { useState, useEffect } from "react";
import axios from "axios";
import { api, apiToken } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AddCheminot() {
  // Récupérer les infos de l'utilisateur connecté avec le token
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiToken.get("/auth/me");

        setUser(response.data._id);
        console.log("Utilisateur connecté :", response.data._id);
      } catch (error) {
        console.error("Erreur récupération utilisateur :", error);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const [form, setForm] = useState({
    sexe: "",
    matricule: "",
    nom: "",
    prenoms: "",
    date_naissance: "",
    date_monte: "",
    lieu_naissance: "",
    paroisse: "",
    groupe: "",
    generation: "",
    village: "",
    district: "COMANCHES",
    numero: "",
    users_id: user || "",

    data: [
      {
        ceremonie_one: { nom: "ACCUEIL", Date: "", Lieu: "" },
        etape_one: {
          nom: "DJONI",
          mois: "1 MOIS",
          date_debut: "",
          date_fin: "",
          statut: "",
        },
        etape_two: {
          nom: "TAMANI",
          mois: "3 MOIS",
          date_debut: "",
          date_fin: "",
          statut: "",
          ceremonie_two: { nom_two: "BOIS SACRÉ", Date_two: "", Lieu_two: "" },
          ceremonie_three: {
            nom_three: "FAKWÉ",
            Date_three: "",
            Lieu_three: "",
          },
        },

        phase_one: {
          nom: "PHASE 1",
          etape_suyan: "SUYAN",
          mois_one: "1 MOIS",
          actions_one: "CHOIX",
          mois_three: "3 MOIS",
          actions_three: "APPRENTISSAGE",
          periode_one_date_debut: "",
          periode_one_date_fin: "",
          periode_three_date_debut: "",
          periode_three_date_fin: "",
          domaine: "",
          mission: "",
          certification: "",
          etape_yhenon: "YHENON",
          mois_yhenon: "3 MOIS",
          actions_yhenon: "SERVICE",
          periode_yhenon_date_debut: "",
          periode_yhenon_date_fin: "",
          brevetage: "",
        },
        phase_two: {
          nom: "PHASE 2",
          etape_suyan: "SUYAN",
          mois_one: "1 MOIS",
          actions_one: "CHOIX",
          mois_three: "3 MOIS",
          actions_three: "APPRENTISSAGE",
          periode_one_date_debut: "",
          periode_one_date_fin: "",
          periode_three_date_debut: "",
          periode_three_date_fin: "",
          domaine: "",
          mission: "",
          certification: "",
          etape_yhenon: "YHENON",
          mois_yhenon: "3 MOIS",
          actions_yhenon: "SERVICE",
          periode_yhenon_date_debut: "",
          periode_yhenon_date_fin: "",
          brevetage: "",
        },
        phase_three: {
          nom: "PHASE 3",
          etape_suyan: "SUYAN",
          mois_one: "1 MOIS",
          actions_one: "CHOIX",
          mois_three: "3 MOIS",
          actions_three: "APPRENTISSAGE",
          periode_one_date_debut: "",
          periode_one_date_fin: "",
          periode_three_date_debut: "",
          periode_three_date_fin: "",
          domaine: "",
          mission: "",
          certification: "",
          etape_yhenon: "YHENON",
          mois_yhenon: "3 MOIS",
          actions_yhenon: "SERVICE",
          periode_yhenon_date_debut: "",
          periode_yhenon_date_fin: "",
          brevetage: "",
          ceremonie: "DÉPART",
          date_ceremonie: "",
          lieu_ceremonie: "",
        }
      
      },
    ],
  });

  // const estTermine = dateDebut && dateFin; -- étape djonie
  const estTermine = Boolean(
    form.data?.[0]?.etape_one?.date_debut && form.data?.[0]?.etape_one?.date_fin
  );
  const statut = estTermine ? "TERMINÉ" : "EN COURS";

  // const estTermine = dateDebut && dateFin; -- étape tamani
  const estTermineTamani = Boolean(
    form.data?.[0]?.etape_two?.ceremonie_two?.Date_two &&
      form.data?.[0]?.etape_two?.ceremonie_three?.Date_three
  );
  const statutTamani = estTermineTamani ? "TERMINÉ" : "EN COURS";

  const handleChange = (e, section = null, subSection = null) => {
    const { name, value } = e.target;

    if (section && subSection) {
      setForm((prev) => ({
        ...prev,
        data: prev.data.map((item, idx) => {
          if (idx === 0) {
            return {
              ...item,
              [section]: {
                ...item[section],
                [subSection]: {
                  ...item[section][subSection],
                  [name]: value,
                },
              },
            };
          }
          return item;
        }),
      }));
      return;
    }

    if (section) {
      setForm((prev) => ({
        ...prev,
        data: prev.data.map((item, idx) => {
          if (idx === 0) {
            return {
              ...item,
              [section]: {
                ...item[section],
                [name]: value,
              },
            };
          }
          return item;
        }),
      }));
      return;
    }

    // Date de montée automatique

    if (name === "date_naissance") {
      let dateMonteeFormatted = "";

      if (value) {
        const birthDate = new Date(value);

        const date18 = new Date(birthDate);

        date18.setFullYear(date18.getFullYear() + 18);

        const day = String(date18.getDate()).padStart(2, "0");

        const month = String(date18.getMonth() + 1).padStart(2, "0");

        const year = date18.getFullYear();

        dateMonteeFormatted = `${year}/${month}/${day}`; // JJ/MM/AAAA
      }

      setForm((prev) => ({
        ...prev,

        date_naissance: value,

        date_monte: dateMonteeFormatted,
      }));

      return;
    }

    // Champs généraux
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construire le payload en prenant les données depuis form.data[0]
    const payload = {
      sexe: form.sexe || "",
      matricule: form.matricule || "",
      nom: form.nom || "",
      prenoms: form.prenoms || "",
      date_naissance: form.date_naissance || "",
      date_monte: form.date_monte || "",
      lieu_naissance: form.lieu_naissance || "",
      paroisse: form.paroisse || "",
      groupe: form.groupe || "",
      generation: form.generation || "",
      village: form.village || "",
      district: form.district || "",
      numero: form.numero || "",
      users_id: form.users_id || "",

      data: [
        {
          ceremonie_one: {
            nom: form.data[0].ceremonie_one.nom,
            Date: form.data[0].ceremonie_one.Date,
            Lieu: form.data[0].ceremonie_one.Lieu,
          },
          etape_one: {
            nom: form.data[0].etape_one.nom,
            mois: form.data[0].etape_one.mois,
            date_debut: form.data[0].etape_one.date_debut,
            date_fin: form.data[0].etape_one.date_fin,
            statut: statut,
          },
          etape_two: {
            nom: form.data[0].etape_two.nom,
            mois: form.data[0].etape_two.mois,
            date_debut: form.data[0].etape_two.date_debut,
            date_fin: form.data[0].etape_two.date_fin,
            statut: statutTamani,
            ceremonie_two: {
              nom_two: form.data[0].etape_two.ceremonie_two.nom_two,
              Date_two: form.data[0].etape_two.ceremonie_two.Date_two,
              Lieu_two: form.data[0].etape_two.ceremonie_two.Lieu_two,
            },
            ceremonie_three: {
              nom_three: form.data[0].etape_two.ceremonie_three.nom_three,
              Date_three: form.data[0].etape_two.ceremonie_three.Date_three,
              Lieu_three: form.data[0].etape_two.ceremonie_three.Lieu_three,
            },
          },

          phase_one: {
            nom: form.data[0]?.phase_one?.nom,
            etape_suyan: form.data[0]?.phase_one?.etape_suyan,
            mois_one: form.data[0]?.phase_one?.mois_one,
            actions_one: form.data[0]?.phase_one?.actions_one,
            mois_three: form.data[0]?.phase_one?.mois_three,
            actions_three: form.data[0]?.phase_one?.actions_three,
            periode_one_date_debut:
              form.data[0]?.phase_one?.periode_one_date_debut,
            periode_one_date_fin: form.data[0]?.phase_one?.periode_one_date_fin,
            periode_three_date_debut:
              form.data[0]?.phase_one?.periode_three_date_debut,
            periode_three_date_fin:
              form.data[0]?.phase_one?.periode_three_date_fin,
            domaine: form.data[0]?.phase_one?.domaine,
            mission: form.data[0]?.phase_one?.mission,
            certification: form.data[0]?.phase_one?.certification,
            etape_yhenon: form.data[0]?.phase_one?.etape_yhenon,
            mois_yhenon: form.data[0]?.phase_one?.mois_yhenon,
            actions_yhenon: form.data[0]?.phase_one?.actions_yhenon,
            periode_yhenon_date_debut:
              form.data[0]?.phase_one?.periode_yhenon_date_debut,
            periode_yhenon_date_fin:
              form.data[0]?.phase_one?.periode_yhenon_date_fin,
            brevetage: form.data[0]?.phase_one?.brevetage,
          },
          phase_two: {
            nom: form.data[0]?.phase_two?.nom,
            etape_suyan: form.data[0]?.phase_two?.etape_suyan,
            mois_one: form.data[0]?.phase_two?.mois_one,
            actions_one: form.data[0]?.phase_two?.actions_one,
            mois_three: form.data[0]?.phase_two?.mois_three,
            actions_three: form.data[0]?.phase_two?.actions_three,
            periode_one_date_debut:
              form.data[0]?.phase_two?.periode_one_date_debut,
            periode_one_date_fin: form.data[0]?.phase_two?.periode_one_date_fin,
            periode_three_date_debut:
              form.data[0]?.phase_two?.periode_three_date_debut,
            periode_three_date_fin:
              form.data[0]?.phase_two?.periode_three_date_fin,
            domaine: form.data[0]?.phase_two?.domaine,
            mission: form.data[0]?.phase_two?.mission,
            certification: form.data[0]?.phase_two?.certification,
            etape_yhenon: form.data[0]?.phase_two?.etape_yhenon,
            mois_yhenon: form.data[0]?.phase_two?.mois_yhenon,
            actions_yhenon: form.data[0]?.phase_two?.actions_yhenon,
            periode_yhenon_date_debut:
              form.data[0]?.phase_two?.periode_yhenon_date_debut,
            periode_yhenon_date_fin:
              form.data[0]?.phase_two?.periode_yhenon_date_fin,
            brevetage: form.data[0]?.phase_two?.brevetage,
          },
          phase_three: {
            nom: form.data[0]?.phase_three?.nom,
            etape_suyan: form.data[0]?.phase_three?.etape_suyan,
            mois_one: form.data[0]?.phase_three?.mois_one,
            actions_one: form.data[0]?.phase_three?.actions_one,
            mois_three: form.data[0]?.phase_three?.mois_three,
            actions_three: form.data[0]?.phase_three?.actions_three,
            periode_one_date_debut:
              form.data[0]?.phase_three?.periode_one_date_debut,
            periode_one_date_fin: form.data[0]?.phase_three?.periode_one_date_fin,
            periode_three_date_debut:
              form.data[0]?.phase_three?.periode_three_date_debut,
            periode_three_date_fin:
              form.data[0]?.phase_three?.periode_three_date_fin,
            domaine: form.data[0]?.phase_three?.domaine,
            mission: form.data[0]?.phase_three?.mission,
            certification: form.data[0]?.phase_three?.certification,
            etape_yhenon: form.data[0]?.phase_three?.etape_yhenon,
            mois_yhenon: form.data[0]?.phase_three?.mois_yhenon,
            actions_yhenon: form.data[0]?.phase_three?.actions_yhenon,
            periode_yhenon_date_debut:
              form.data[0]?.phase_three?.periode_yhenon_date_debut,
            periode_yhenon_date_fin:
              form.data[0]?.phase_three?.periode_yhenon_date_fin,
            brevetage: form.data[0]?.phase_three?.brevetage,
            date_ceremonie: form.data[0]?.phase_three?.date_ceremonie,
            lieu_ceremonie: form.data[0]?.phase_three?.lieu_ceremonie
          },

        },
      ],
    };

    try {
      const response = await apiToken.post("/cheminots/add_cheminot", payload);
      console.log("Cheminot ajouté :", response.data);
      alert("✅ Cheminot ajouté avec succès !");
      navigate("/liste_cheminots_saf");
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("❌ Erreur lors de l'ajout");
    }
  };

  return (
    <div className="mx-auto mt-4">
      {/* ETAPES */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className={`w-1/4 h-2 mx-1 rounded transition-all 
            ${step >= num ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ===== ETAPE 1 ===== */}
        {step === 1 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Informations générales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "nom",
                "prenoms",
                "matricule",
                "numero",
                "village",
                "district",
                "generation",
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={form[field] || ""}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded w-full"
                />
              ))}

              <select
                name="paroisse"
                value={form.paroisse}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option>Sélectionner une paroisse</option>
                <option value="STA">
                  Saint Andreas Kaggwa de Yopougon Andokoi
                </option>
                <option value="SB">Saint Bathémemy de la Cité du Banco</option>
                <option value="SE">
                  Sainte Elisabeth de Yopougon Ananeraie
                </option>
                <option value="SFA">
                  Saint François d’Assise de Yopougon Zone Industrielle.
                </option>
                <option value="SJM">
                  Saint Jacques le Majeur d’Allokoi PK23
                </option>
                <option value="SJB">
                  Saint Jean-Baptiste de la Cité Mamie Adjoua
                </option>
                <option value="STJA">
                  Sainte Thérèse de Jésus d’Avila (cité ppa ex maca)
                </option>
                <option value="NDA">
                  Notre Dame d'Assomption de Yopougon Gesco
                </option>
              </select>

              <select
                name="sexe"
                value={form.sexe}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Sexe</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>

              <input
                type="date"
                name="date_naissance"
                value={form.date_naissance || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />

              <input
                type="text"
                name="date_monte"
                value={form.date_monte || ""}
                readOnly
                className="border p-2 rounded w-full bg-gray-100"
              />

              <input type="hidden" name="users_id" value={user || ""} />
            </div>
          </div>
        )}

        {/* ===== ETAPE 2 ===== */}
        {step === 2 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Cérémonies</h3>

            <div className="border p-3 rounded mb-3">
              <input
                name="nom"
                value={form.data[0].ceremonie_one.nom}
                placeholder="ACCUEIL"
                disabled
                onChange={(e) => {
                  const upperValue = e.target.value.toUpperCase();
                  // On met à jour l'état correctement
                  const newForm = { ...form };
                  newForm.data[0].ceremonie_one.nom = upperValue;
                  setForm(newForm);
                }}
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                type="date"
                name="Date"
                value={form.data[0].ceremonie_one.Date || ""}
                onChange={(e) => handleChange(e, "ceremonie_one")}
                className="border p-2 mb-3 rounded w-full "
              />
              <input
                type="text"
                name="Lieu"
                placeholder="Lieu"
                value={form.data[0].ceremonie_one.Lieu || ""}
                onChange={(e) => handleChange(e, "ceremonie_one")}
                className="border p-2 mb-3 rounded w-full "
              />
            </div>
          </div>
        )}

        {/* ===== ETAPE 3 ===== */}
        {step === 3 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Étapes</h3>

            {/* DJONI */}
            <div className="border p-3 rounded mb-3">
              <input
                name="nom"
                value={form.data[0].etape_one.nom}
                placeholder="DJONI"
                disabled
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                name="mois"
                type="text"
                disabled
                value={form.data[0].etape_one.mois}
                placeholder="Durée (1 mois)"
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                type="date"
                name="date_debut"
                value={form.data[0].etape_one.date_debut}
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 mb-3 rounded w-full "
              />
              <input
                type="date"
                name="date_fin"
                value={form.data[0].etape_one.date_fin}
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 mb-3 rounded w-full "
              />
              {/* Bouton en cours-terminé djoni */}
              <button
                disabled={!estTermine}
                className={`px-4 py-2 rounded w-full 
                  ${
                    estTermine
                      ? "bg-green-600 cursor-not-allowed text-white"
                      : "bg-yellow-400 cursor-not-allowed text-black"
                  }
                `}
              >
                {estTermine ? "TERMINÉ" : "EN COURS"}
              </button>
            </div>

            {/* TAMNI */}
            <div className="border p-3 rounded mb-3">
              <input
                name="nom"
                value={form.data[0].etape_two.nom}
                placeholder="TAMANI"
                disabled
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                name="mois"
                type="text"
                value={form.data[0].etape_two.mois}
                disabled
                placeholder="Durée (3 mois)"
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                type="date"
                name="date_debut"
                value={form.data[0].etape_two.date_debut}
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 mb-3 rounded w-full "
              />
              <input
                type="date"
                name="date_fin"
                value={form.data[0].etape_two.date_fin}
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 mb-3 rounded w-full "
              />
              <h3 className="font-bold mb-4">Cérémonies</h3>
              {/* BOIS SACRE */}
              <input
                name="nom_two"
                value={form.data[0].etape_two.ceremonie_two.nom_two}
                placeholder="BOIS SACRÉ"
                disabled
                onChange={(e) => handleChange(e, "etape_two", "ceremonie_two")}
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                type="date"
                name="Date_two"
                value={form.data[0].etape_two.ceremonie_two.Date_two}
                onChange={(e) => handleChange(e, "etape_two", "ceremonie_two")}
                className="border p-2 mb-3 rounded w-full "
              />
              <input
                name="Lieu_two"
                placeholder="Lieu"
                value={form.data[0].etape_two.ceremonie_two.Lieu_two}
                onChange={(e) => handleChange(e, "etape_two", "ceremonie_two")}
                className="border p-2 mb-3 rounded w-full "
              />
              {/* FAKWÉ */}
              <input
                name="nom_three"
                value={form.data[0].etape_two.ceremonie_three.nom_three}
                placeholder="FAKWÉ"
                disabled
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 mb-3 rounded w-full  bg-gray-200"
              />
              <input
                type="date"
                name="Date_three"
                value={form.data[0].etape_two.ceremonie_three.Date_three}
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 mb-3 rounded w-full "
              />
              <input
                name="Lieu_three"
                placeholder="Lieu"
                value={form.data[0].etape_two.ceremonie_three.Lieu_three}
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 mb-3 rounded w-full "
              />

              {/* Bouton en cours-terminé djoni */}
              <button
                disabled={!estTermineTamani}
                className={`px-4 py-2 rounded w-full 
                  ${
                    estTermineTamani
                      ? "bg-green-600 cursor-not-allowed text-white"
                      : "bg-yellow-400 cursor-not-allowed text-black"
                  }
                `}
              >
                {estTermineTamani ? "TERMINÉ" : "EN COURS"}
              </button>
            </div>
          </div>
        )}

        {/* ===== ETAPE 4 ===== */}
        {step === 4 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Les phases</h3>
            <div className="border p-3 rounded mb-3">
              <h4 className="font-semibold uppercase ">
                {form.data[0]?.phase_one?.nom}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="border rounded">
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      ETAPE
                    </div>
                    <div className="p-10 flex justify-center items-center">
                      {form.data[0]?.phase_one?.etape_suyan}
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">MOIS</div>
                    <div className="p-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_one?.mois_one}
                        </div>
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_one?.mois_three}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">ACTIONS</div>
                    <div className="p-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_one?.actions_one}
                        </div>
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_one?.actions_three}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">PERIODE</div>
                    <div className="ml-2 mr-2 mt-2 mb-1">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_one_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_one
                                ?.periode_one_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_one")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_one_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_one?.periode_one_date_fin ||
                              ""
                            }
                            onChange={(e) => handleChange(e, "phase_one")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 mr-2 mb-2">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_three_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_one
                                ?.periode_three_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_one")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_three_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_one
                                ?.periode_three_date_fin || ""
                            }
                            onChange={(e) => handleChange(e, "phase_one")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="">
                <div className="grid grid-cols-1">
                  <div className="bg-orange-500 font-semibold text-center">
                    DOMAINE
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Domaine"
                      name="domaine"
                      type="text"
                      value={form.data?.[0]?.phase_one?.domaine || ""}
                      onChange={(e) => handleChange(e, "phase_one")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded">
                <div className="grid grid-cols-1 text-center">
                  <div className="bg-orange-500 font-semibold">MISSION</div>
                  <div className="mt-2">
                    <input
                      placeholder="Mission"
                      name="mission"
                      type="text"
                      value={form.data?.[0]?.phase_one?.mission || ""}
                      onChange={(e) => handleChange(e, "phase_one")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="grid grid-cols-1 text-center">
                  <div className="bg-orange-500 font-semibold">
                    CERTIFICATION
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Certification"
                      name="certification"
                      type="text"
                      value={form.data?.[0]?.phase_one?.certification || ""}
                      onChange={(e) => handleChange(e, "phase_one")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div>
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      ETAPE
                    </div>
                    <div className="p-2 mt-2 flex border rounded justify-center items-center">
                      {form.data[0]?.phase_one?.etape_yhenon}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">MOIS</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_one?.mois_yhenon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">ACTIONS</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_one?.actions_yhenon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">PERIODE</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_yhenon_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_one
                                ?.periode_yhenon_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_one")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_yhenon_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_one?.periode_yhenon_date_fin ||
                              ""
                            }
                            onChange={(e) => handleChange(e, "phase_one")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">BREVETAGE</div>
                    <div className="mt-2">
                    <input
                      placeholder="Brevetage"
                      name="brevetage"
                      type="text"
                      value={form.data?.[0]?.phase_one?.brevetage || ""}
                      onChange={(e) => handleChange(e, "phase_one")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                    
                  </div>
                </div>
                
                
              </div>
          </div>
        )}

         {/* ===== ETAPE 5 ===== */}
         {step === 5 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Les phases</h3>
            <div className="border p-3 rounded mb-3">
              <h4 className="font-semibold uppercase ">
                {form.data[0]?.phase_two?.nom}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="border rounded">
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      ETAPE
                    </div>
                    <div className="p-10 flex justify-center items-center">
                      {form.data[0]?.phase_two?.etape_suyan}
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">MOIS</div>
                    <div className="p-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_two?.mois_one}
                        </div>
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_two?.mois_three}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">ACTIONS</div>
                    <div className="p-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_two?.actions_one}
                        </div>
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_two?.actions_three}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">PERIODE</div>
                    <div className="ml-2 mr-2 mt-2 mb-1">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_one_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_two
                                ?.periode_one_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_two")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_one_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_two?.periode_one_date_fin ||
                              ""
                            }
                            onChange={(e) => handleChange(e, "phase_two")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 mr-2 mb-2">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_three_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_two
                                ?.periode_three_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_two")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_three_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_two
                                ?.periode_three_date_fin || ""
                            }
                            onChange={(e) => handleChange(e, "phase_two")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="">
                <div className="grid grid-cols-1">
                  <div className="bg-orange-500 font-semibold text-center">
                    DOMAINE
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Domaine"
                      name="domaine"
                      type="text"
                      value={form.data?.[0]?.phase_two?.domaine || ""}
                      onChange={(e) => handleChange(e, "phase_two")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded">
                <div className="grid grid-cols-1 text-center">
                  <div className="bg-orange-500 font-semibold">MISSION</div>
                  <div className="mt-2">
                    <input
                      placeholder="Mission"
                      name="mission"
                      type="text"
                      value={form.data?.[0]?.phase_two?.mission || ""}
                      onChange={(e) => handleChange(e, "phase_two")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="grid grid-cols-1 text-center">
                  <div className="bg-orange-500 font-semibold">
                    CERTIFICATION
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Certification"
                      name="certification"
                      type="text"
                      value={form.data?.[0]?.phase_two?.certification || ""}
                      onChange={(e) => handleChange(e, "phase_two")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div>
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      ETAPE
                    </div>
                    <div className="p-2 mt-2 flex border rounded justify-center items-center">
                      {form.data[0]?.phase_two?.etape_yhenon}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">MOIS</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_two?.mois_yhenon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">ACTIONS</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_two?.actions_yhenon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">PERIODE</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_yhenon_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_two
                                ?.periode_yhenon_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_two")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_yhenon_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_two?.periode_yhenon_date_fin ||
                              ""
                            }
                            onChange={(e) => handleChange(e, "phase_two")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">BREVETAGE</div>
                    <div className="mt-2">
                    <input
                      placeholder="Brevetage"
                      name="brevetage"
                      type="text"
                      value={form.data?.[0]?.phase_two?.brevetage || ""}
                      onChange={(e) => handleChange(e, "phase_two")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                    
                  </div>
                </div>
                
                
              </div>
          </div>
        )}
         {/* ===== ETAPE 6 ===== */}
         {step === 6 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Les phases</h3>
            <div className="border p-3 rounded mb-3">
              <h4 className="font-semibold uppercase ">
                {form.data[0]?.phase_three?.nom}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="border rounded">
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      ETAPE
                    </div>
                    <div className="p-10 flex justify-center items-center">
                      {form.data[0]?.phase_three?.etape_suyan}
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">MOIS</div>
                    <div className="p-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_three?.mois_one}
                        </div>
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_three?.mois_three}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">ACTIONS</div>
                    <div className="p-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_three?.actions_one}
                        </div>
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_three?.actions_three}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded">
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">PERIODE</div>
                    <div className="ml-2 mr-2 mt-2 mb-1">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_one_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_three
                                ?.periode_one_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_three")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_one_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_three?.periode_one_date_fin ||
                              ""
                            }
                            onChange={(e) => handleChange(e, "phase_three")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 mr-2 mb-2">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_three_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_three
                                ?.periode_three_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_three")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_three_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_three
                                ?.periode_three_date_fin || ""
                            }
                            onChange={(e) => handleChange(e, "phase_three")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="">
                <div className="grid grid-cols-1">
                  <div className="bg-orange-500 font-semibold text-center">
                    DOMAINE
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Domaine"
                      name="domaine"
                      type="text"
                      value={form.data?.[0]?.phase_three?.domaine || ""}
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded">
                <div className="grid grid-cols-1 text-center">
                  <div className="bg-orange-500 font-semibold">MISSION</div>
                  <div className="mt-2">
                    <input
                      placeholder="Mission"
                      name="mission"
                      type="text"
                      value={form.data?.[0]?.phase_three?.mission || ""}
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="grid grid-cols-1 text-center">
                  <div className="bg-orange-500 font-semibold">
                    CERTIFICATION
                  </div>
                  <div className="mt-2">
                    <input
                      placeholder="Certification"
                      name="certification"
                      type="text"
                      value={form.data?.[0]?.phase_three?.certification || ""}
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div>
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      ETAPE
                    </div>
                    <div className="p-2 mt-2 flex border rounded justify-center items-center">
                      {form.data[0]?.phase_three?.etape_yhenon}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">MOIS</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_three?.mois_yhenon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">ACTIONS</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 text-center gap-1">
                        <div className="border rounded p-2">
                          {form.data[0]?.phase_three?.actions_yhenon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">PERIODE</div>
                    <div className="mt-2">
                      <div className="grid grid-cols-2 gap-1 w-full">
                        <div className="border rounded p-2">
                          <input
                            name="periode_yhenon_date_debut"
                            type="date"
                            value={
                              form.data?.[0]?.phase_three
                                ?.periode_yhenon_date_debut || ""
                            }
                            onChange={(e) => handleChange(e, "phase_three")}
                            className="w-full "
                          />
                        </div>

                        <div className="border rounded p-2">
                          <input
                            name="periode_yhenon_date_fin"
                            type="date"
                            value={
                              form.data?.[0]?.phase_three?.periode_yhenon_date_fin ||
                              ""
                            }
                            onChange={(e) => handleChange(e, "phase_three")}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">BREVETAGE</div>
                    <div className="mt-2">
                    <input
                      placeholder="Brevetage"
                      name="brevetage"
                      type="text"
                      value={form.data?.[0]?.phase_three?.brevetage || ""}
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                    
                  </div>
                </div>
                
                
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <div className="grid grid-cols-1">
                    <div className="bg-orange-500 font-semibold text-center">
                      CÉRÉMONIE
                    </div>
                    <div className="p-2 mt-2 flex border rounded justify-center items-center">
                      {form.data[0]?.phase_three?.ceremonie}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">DATE</div>
                    <div className="mt-2">
                    <input
                      placeholder="Date"
                      name="date_ceremonie"
                      type="date"
                      value={form.data?.[0]?.phase_three?.date_ceremonie || ""}
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                    
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 text-center">
                    <div className="bg-orange-500 font-semibold">LIEU</div>
                    <div className="mt-2">
                    <input
                      placeholder="Lieu"
                      name="lieu"
                      type="text"
                      value={form.data?.[0]?.phase_three?.lieu_ceremonie || ""}
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 mb-3 rounded w-full"
                    />
                  </div>
                    
                  </div>
                </div>
              </div>
          </div>
        )}

        {/* ===== BOUTONS ===== */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white flex justify-center items-center gap-2 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
            >
              <FaChevronLeft /> Précédent
            </button>
          )}

          {step < 6 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-orange-500 text-white flex justify-center items-center gap-2 px-4 py-2 rounded hover:bg-orange-600 ml-auto cursor-pointer"
            >
              Suivant <FaChevronRight />
            </button>
          )}

          {step === 6 && (
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 ml-auto cursor-pointer"
            >
              Enregistrer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
