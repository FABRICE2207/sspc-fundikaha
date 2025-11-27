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
    district: "",
    numero: "",
    users_id: user || "",

    data: [
      {
        ceremonie_one: { nom: "ACCUEIL", Date: "", Lieu: "" },
        etape_one: { nom: "", mois: "", date_debut: "", date_fin: "" },
        etape_two: {
          nom: "",
          mois: "",
          date_debut: "",
          date_fin: "",
          ceremonie_two: { nom_two: "", Date_two: "", Lieu_two: "" },
          ceremonie_three: { nom_three: "", Date_three: "", Lieu_three: "" },
        },
        etape_three: { nom: "", mois: "", date_debut: "", date_fin: "" },

        phase_one: {
          domaine: "",
          mission: "",
          certification: "",
          brevetage: "",
        },
        phase_two: {
          domaine: "",
          mission: "",
          certification: "",
          brevetage: "",
        },
        phase_three: {
          domaine: "",
          mission: "",
          certification: "",
          brevetage: "",
          ceremonie_date: "",
          ceremonie_lieu: "",
        },
      },
    ],
  });

  //   const handleChange = (e, section = null) => {
  //   const { name, value } = e.target;

  //   // Mise à jour des sections (phases/étapes/cérémonies)
  //   if (section) {
  //     setForm(prev => ({
  //       ...prev,
  //       data: prev.data.map((item, idx) => {
  //         if (idx === 0) {
  //           return {
  //             ...item,
  //             [section]: {
  //               ...item[section],
  //               [name]: value
  //             }
  //           };
  //         }
  //         return item;
  //       })
  //     }));
  //     return;
  //   }

  //   // Date de montée automatique
  //   if (name === "date_naissance") {
  //     let dateMonteeFormatted = "";
  //     if (value) {
  //       const birthDate = new Date(value);
  //       const date18 = new Date(birthDate);
  //       date18.setFullYear(date18.getFullYear() + 18);

  //       const day = String(date18.getDate()).padStart(2, "0");
  //       const month = String(date18.getMonth() + 1).padStart(2, "0");
  //       const year = date18.getFullYear();

  //       dateMonteeFormatted = `${year}/${month}/${day}`; // JJ/MM/AAAA
  //     }

  //     setForm(prev => ({
  //       ...prev,
  //       date_naissance: value,
  //       date_monte: dateMonteeFormatted
  //     }));
  //     return;
  //   }

  //   // Autres champs généraux
  //   setForm(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

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
          },
          etape_two: {
            nom: form.data[0].etape_two.nom,
            mois: form.data[0].etape_two.mois,
            date_debut: form.data[0].etape_two.date_debut,
            date_fin: form.data[0].etape_two.date_fin,
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

          // ceremonie_three: {
          //  nom: form.data[0].ceremonie_three.nom,
          //   Date: form.data[0].ceremonie_three.Date,
          //   Lieu: form.data[0].ceremonie_three.Lieu
          // },

          phase_one: {
            nom: "PHASE 1",
            planning: [
              { domaine: form.data[0]?.phase_one?.domaine || "" },
              { mission: form.data[0]?.phase_one?.mission || "" },
              { certification: form.data[0]?.phase_one?.certification || "" },
              { brevetage: form.data[0]?.phase_one?.brevetage || "" },
            ],
          },
          phase_two: {
            nom: "PHASE 2",
            planning: [
              { domaine: form.data[0]?.phase_two?.domaine || "" },
              { mission: form.data[0]?.phase_two?.mission || "" },
              { certification: form.data[0]?.phase_two?.certification || "" },
              { brevetage: form.data[0]?.phase_two?.brevetage || "" },
            ],
          },
          phase_three: {
            nom: "PHASE 3",
            planning: [
              { domaine: form.data[0]?.phase_three?.domaine || "" },
              { mission: form.data[0]?.phase_three?.mission || "" },
              { certification: form.data[0]?.phase_three?.certification || "" },
              { brevetage: form.data[0]?.phase_three?.brevetage || "" },
              {
                ceremonie: "DEPART",
                date: form.data[0]?.phase_three?.ceremonie_date || "",
                lieu: form.data[0]?.phase_three?.ceremonie_lieu || "",
              },
            ],
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
    <div className="mx-auto p-6 rounded bg-white shadow max-w-4xl">
      {/* ETAPES */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3, 4].map((num) => (
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
                  Saint andreas kaggwa de yopougon andokoi
                </option>
                <option value="SB">Saint bathémemy de la cité du banco</option>
                <option value="SE">
                  Sainte elisabeth de yopougon ananeraie
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
                onChange={(e) => handleChange(e, "ceremonie_one")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="Date"
                value={form.data[0].ceremonie_one.Date || ""}
                onChange={(e) => handleChange(e, "ceremonie_one")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                name="Lieu"
                placeholder="Lieu"
                value={form.data[0].ceremonie_one.Lieu || ""}
                onChange={(e) => handleChange(e, "ceremonie_one")}
                className="border p-2 rounded w-full mb-2"
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
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                name="mois"
                type="text"
                value={form.data[0].etape_one.mois}
                maxLength={1}
                placeholder="Durée (1 mois)"
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="date_debut"
                value={form.data[0].etape_one.date_debut}
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="date_fin"
                value={form.data[0].etape_one.date_fin}
                onChange={(e) => handleChange(e, "etape_one")}
                className="border p-2 rounded w-full mb-2"
              />
            </div>

            {/* TAMNI */}
            <div className="border p-3 rounded mb-3">
              <input
                name="nom"
                value={form.data[0].etape_two.nom}
                placeholder="TAMANI"
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                name="mois"
                type="text"
                value={form.data[0].etape_two.mois}
                maxLength={1}
                placeholder="Durée (3 mois)"
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="date_debut"
                value={form.data[0].etape_two.date_debut}
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="date_fin"
                value={form.data[0].etape_two.date_fin}
                onChange={(e) => handleChange(e, "etape_two")}
                className="border p-2 rounded w-full mb-2"
              />
              <h3 className="font-bold mb-4">Cérémonies</h3>
              {/* BOIS SACRE */}
              <input
                name="nom_two"
                value={form.data[0].etape_two.ceremonie_two.nom_two}
                placeholder="BOIS SACRÉ"
                onChange={(e) => handleChange(e, "etape_two", "ceremonie_two")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="Date_two"
                value={form.data[0].etape_two.ceremonie_two.Date_two}
                onChange={(e) => handleChange(e, "etape_two", "ceremonie_two")}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                name="Lieu_two"
                placeholder="Lieu"
                value={form.data[0].etape_two.ceremonie_two.Lieu_two}
                onChange={(e) => handleChange(e, "etape_two", "ceremonie_two")}
                className="border p-2 rounded w-full mb-2"
              />
              {/* FAKWÉ */}
              <input
                name="nom_three"
                value={form.data[0].etape_two.ceremonie_two.nom_three}
                placeholder="FAKWÉ"
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="date"
                name="Date_three"
                value={form.data[0].etape_two.ceremonie_two.Date_three}
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                name="Lieu_three"
                placeholder="Lieu"
                value={form.data[0].etape_two.ceremonie_two.Lieu_three}
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 rounded w-full mb-2"
              />
            </div>
          </div>
        )}

        {/* ===== ETAPE 4 ===== */}
        {step === 4 && (
          <div className="animate-slide">
            <h3 className="font-bold mb-4">Phases</h3>

            {["phase_one"].map((phase) => (
              <div key={phase} className="border p-3 rounded mb-3">
                <h4 className="font-semibold uppercase mb-2">{phase}</h4>

                <input
                  name="domaine"
                  value={form.data?.[0]?.phase_one?.domaine || ""}
                  placeholder="Domaine"
                  onChange={(e) => handleChange(e, "phase_one")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="mission"
                  value={form.data?.[0]?.phase_one?.mission || ""}
                  placeholder="Mission"
                  onChange={(e) => handleChange(e, "phase_one")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="certification"
                  value={form.data?.[0]?.phase_one?.certification || ""}
                  placeholder="Certification"
                  onChange={(e) => handleChange(e, "phase_one")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="brevetage"
                  value={form.data?.[0]?.phase_one?.brevetage || ""}
                  placeholder="Brevetage"
                  onChange={(e) => handleChange(e, "phase_one")}
                  className="border p-2 rounded w-full mb-2"
                />
              </div>
            ))}

            {["phase_two"].map((phase) => (
              <div key={phase} className="border p-3 rounded mb-3">
                <h4 className="font-semibold uppercase mb-2">{phase}</h4>

                <input
                  name="domaine"
                  value={form.data?.[0]?.phase_two?.domaine || ""}
                  placeholder="Domaine"
                  onChange={(e) => handleChange(e, "phase_two")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="mission"
                  value={form.data?.[0]?.phase_two?.mission || ""}
                  placeholder="Mission"
                  onChange={(e) => handleChange(e, "phase_two")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="certification"
                  value={form.data?.[0]?.phase_two?.certification || ""}
                  placeholder="Certification"
                  onChange={(e) => handleChange(e, "phase_two")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="brevetage"
                  value={form.data?.[0]?.phase_two?.brevetage || ""}
                  placeholder="Brevetage"
                  onChange={(e) => handleChange(e, "phase_two")}
                  className="border p-2 rounded w-full mb-2"
                />
              </div>
            ))}

            {["phase_three"].map((phase) => (
              <div key={phase} className="border p-3 rounded mb-3">
                <h4 className="font-semibold uppercase mb-2">{phase}</h4>

                <input
                  name="domaine"
                  value={form.data?.[0]?.phase_three?.domaine || ""}
                  placeholder="Domaine"
                  onChange={(e) => handleChange(e, "phase_three")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="mission"
                  value={form.data?.[0]?.phase_three?.mission || ""}
                  placeholder="Mission"
                  onChange={(e) => handleChange(e, "phase_three")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="certification"
                  value={form.data?.[0]?.phase_three?.certification || ""}
                  placeholder="Certification"
                  onChange={(e) => handleChange(e, "phase_three")}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  name="brevetage"
                  value={form.data?.[0]?.phase_three?.brevetage || ""}
                  placeholder="Brevetage"
                  onChange={(e) => handleChange(e, "phase_three")}
                  className="border p-2 rounded w-full mb-2"
                />

                {phase === "phase_three" && (
                  <>
                    <input
                      type="date"
                      name="ceremonie_depart_date"
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 rounded w-full mb-2"
                    />
                    <input
                      name="ceremonie_depart_lieu"
                      placeholder="Lieu départ"
                      onChange={(e) => handleChange(e, "phase_three")}
                      className="border p-2 rounded w-full mb-2"
                    />
                  </>
                )}
              </div>
            ))}
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

          {step < 4 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-orange-500 text-white flex justify-center items-center gap-2 px-4 py-2 rounded hover:bg-orange-600 ml-auto cursor-pointer"
            >
              Suivant <FaChevronRight />
            </button>
          )}

          {step === 4 && (
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
