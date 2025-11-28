import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, apiToken } from "../../api/axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Barside } from "./Barside";

export const UpdateCheminot = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cheminot, setCheminot] = useState(false);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const fetchCheminot = async () => {
      try {
        const res = await api.get(`/cheminots/get_cheminots/${id}`);
        const chem = res.data;

        // Mettre à jour l'état form avec les données récupérées
        setForm({
          nom: chem.nom || "",
          prenoms: chem.prenoms || "",
          matricule: chem.matricule || "",
          numero: chem.numero || "",
          village: chem.village || "",
          district: chem.district || "",
          generation: chem.generation || "",
          paroisse: chem.paroisse || "",
          sexe: chem.sexe || "",
          date_naissance: chem.date_naissance || "",
          date_monte: chem.date_monte || "",
          users_id: chem.users_id || "",

          // ✅ Copier les données existantes ou utiliser un objet par défaut
          data: chem.data?.map((d) => ({
            ceremonie_one: d.ceremonie_one || { nom: "", Date: "", Lieu: "" },
            etape_one: d.etape_one || {
              nom: "",
              mois: "",
              date_debut: "",
              date_fin: "",
            },
            etape_two: d.etape_two || {
              nom: "",
              mois: "",
              date_debut: "",
              date_fin: "",
              ceremonie_two: { nom_two: "", Date_two: "", Lieu_two: "" },
              ceremonie_three: {
                nom_three: "",
                Date_three: "",
                Lieu_three: "",
              },
            },
            etape_three: d.etape_three || {
              nom: "",
              mois: "",
              date_debut: "",
              date_fin: "",
            },

            phase_one: d.phase_one || {
              domaine: "",
              mission: "",
              certification: "",
              brevetage: "",
            },
            phase_two: d.phase_two || {
              domaine: "",
              mission: "",
              certification: "",
              brevetage: "",
            },
            phase_three: d.phase_three || {
              domaine: "",
              mission: "",
              certification: "",
              brevetage: "",
              ceremonie_date: "",
              ceremonie_lieu: "",
            },
          })) || [
            // Si chem.data est vide, on fournit une valeur par défaut
            {
              ceremonie_one: { nom: "", Date: "", Lieu: "" },
              etape_one: { nom: "", mois: "", date_debut: "", date_fin: "" },
              etape_two: {
                nom: "",
                mois: "",
                date_debut: "",
                date_fin: "",
                ceremonie_two: { nom_two: "", Date_two: "", Lieu_two: "" },
                ceremonie_three: {
                  nom_three: "",
                  Date_three: "",
                  Lieu_three: "",
                },
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

        console.log("Cheminot chargé :", chem);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchCheminot();
  }, [id]);

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
        ceremonie_one: { nom: "", Date: "", Lieu: "" },
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

  useEffect(() => {
    const fetchCheminot = async () => {
      try {
        const res = await api.get(`/cheminots/get_cheminots/${id}`);
        setCheminot(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchCheminot();
  }, [id]);

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
                ceremonie: "",
                date: form.data[0]?.phase_three?.ceremonie_date || "",
                lieu: form.data[0]?.phase_three?.ceremonie_lieu || "",
              },
            ],
          },
        },
      ],
    };

    try {
      await apiToken.put(`/cheminots/update_cheminot/${id}`, payload);
      alert("Cheminot mis à jour avec succès !");
      navigate("/liste_cheminots_saf");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur pendant la mise à jour");
    }
  };

  // if (!cheminot) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Barside />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        </div>

        {/* Section content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Modifier le Cheminot</h2>

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
                    <option value="SB">
                      Saint Bathémemy de la Cité du Banco
                    </option>
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
                  {/* ACCUEIL */}
                  <input
                    name="nom"
                    value={form.data?.[0]?.ceremonie_one?.nom || ""}
                    placeholder="ACCUEIL"
                    onChange={(e) => {
                      const upperValue = e.target.value.toUpperCase();
                      setForm((prev) => {
                        const newForm = { ...prev };
                        newForm.data[0].ceremonie_one.nom = upperValue;
                        return newForm;
                      });
                    }}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="date"
                    name="Date"
                    value={form.data?.[0]?.ceremonie_one?.Date || ""}
                    onChange={(e) => handleChange(e, "ceremonie_one", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    type="text"
                    name="Lieu"
                    value={form.data?.[0]?.ceremonie_one?.Lieu || ""}
                    placeholder="Lieu"
                    onChange={(e) => handleChange(e, "ceremonie_one", null, 0)}
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
                    value={form.data?.[0]?.etape_one?.nom || ""}
                    placeholder="DJONI"
                    onChange={(e) => handleChange(e, "etape_one", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="mois"
                    value={form.data?.[0]?.etape_one?.mois || ""}
                    placeholder="1 mois"
                    maxLength={1}
                    onChange={(e) => handleChange(e, "etape_one", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="date_debut"
                    type="date"
                    value={form.data?.[0]?.etape_one?.date_debut || ""}
                    onChange={(e) => handleChange(e, "etape_one", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="date_fin"
                    type="date"
                    value={form.data?.[0]?.etape_one?.date_fin || ""}
                    onChange={(e) => handleChange(e, "etape_one", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                </div>

                {/* TAMANI */}
                <div className="border p-3 rounded mb-3">
                  <input
                    name="nom"
                    value={form.data?.[0]?.etape_two?.nom || ""}
                    placeholder="TAMANI"
                    onChange={(e) => handleChange(e, "etape_two", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="mois"
                    value={form.data?.[0]?.etape_two?.mois || ""}
                    placeholder="Duréé (3 mois)"
                    maxLength={1}
                    onChange={(e) => handleChange(e, "etape_two", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="date_debut"
                    value={form.data?.[0]?.etape_two?.date_debut || ""}
                    type="date"
                    onChange={(e) => handleChange(e, "etape_two", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="date_fin"
                    value={form.data?.[0]?.etape_two?.date_fin || ""}
                    type="date"
                    onChange={(e) => handleChange(e, "etape_two", null, 0)}
                    className="border p-2 rounded w-full mb-2"
                  />

                  {/* Cérémonies TAMANI */}
                  <h3 className="font-bold mb-4">Cérémonies</h3>
                  <input
                    name="nom_two"
                    value={
                      form.data?.[0]?.etape_two?.ceremonie_two.nom_two || ""
                    }
                    placeholder="BOIS SACRE"
                    onChange={(e) =>
                      handleChange(e, "etape_two", "ceremonie_two")
                    }
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="Date_two"
                    value={
                      form.data?.[0]?.etape_two?.ceremonie_two.Date_two || ""
                    }
                    type="date"
                    onChange={(e) =>
                      handleChange(e, "etape_two", "ceremonie_two")
                    }
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                    name="Lieu_two"
                    value={
                      form.data?.[0]?.etape_two?.ceremonie_two.Lieu_two || ""
                    }
                    placeholder="Lieu"
                    onChange={(e) =>
                      handleChange(e, "etape_two", "ceremonie_two")
                    }
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input
                name="nom_three"
                value={form.data[0].etape_two.ceremonie_three.nom_three}
                placeholder="FAKWÉ"
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 rounded w-full mb-2"
              />
                  <input
                type="date"
                name="Date_three"
                value={form.data[0].etape_two.ceremonie_three.Date_three}
                onChange={(e) =>
                  handleChange(e, "etape_two", "ceremonie_three")
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                name="Lieu_three"
                placeholder="Lieu"
                value={form.data[0].etape_two.ceremonie_three.Lieu_three}
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

                {["phase_one", "phase_two", "phase_three"].map((phase) => (
                  <div key={phase} className="border p-3 rounded mb-3">
                    <h4 className="font-semibold uppercase mb-2">{phase}</h4>

                    {Object.keys(form.data?.[0]?.[phase] || {}).map((field) => (
                      <input
                        key={field}
                        name={field}
                        value={form.data?.[0]?.[phase]?.[field] || ""}
                        placeholder={field.toUpperCase()}
                        onChange={(e) => handleChange(e, phase, null, 0)}
                        className="border p-2 rounded w-full mb-2"
                      />
                    ))}
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
                  Modifier
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
