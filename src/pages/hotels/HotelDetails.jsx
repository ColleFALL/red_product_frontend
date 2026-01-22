// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const API_RAW =
//   import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com";
// const API = API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, "");

// export default function HotelDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const BASE_URL = useMemo(
//     () => API,
//     []
//   );

//   const photoUrl = useMemo(() => {
//     if (!hotel?.photo) return "";
//     return hotel.photo.startsWith("http") ? hotel.photo : `${BASE_URL}${hotel.photo}`;
//   }, [hotel, BASE_URL]);

//   const fallback =
//     "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";

//   const fetchHotel = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("access");
//       if (!token) throw new Error("Non connecté : token manquant.");

//       const res = await fetch(`${API}/api/hotels/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const ct = res.headers.get("content-type") || "";
//       const raw = await res.text();
//       const data = ct.includes("application/json") ? JSON.parse(raw || "null") : raw;

//       if (!res.ok) {
//         const msg =
//           typeof data === "string"
//             ? data.slice(0, 200)
//             : data?.detail || data?.message || JSON.stringify(data).slice(0, 200);
//         throw new Error(`Erreur API (${res.status}) : ${msg}`);
//       }

//       setHotel(data);
//     } catch (e) {
//       console.error(e);
//       setError(e.message || "Erreur chargement détail hôtel");
//       setHotel(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHotel();
//     // eslint-disable-next-line
//   }, [id]);

//   const onDelete = async () => {
//     const ok = window.confirm("Supprimer cet hôtel ? Cette action est irréversible.");
//     if (!ok) return;

//     try {
//       const token = localStorage.getItem("access");
//       if (!token) throw new Error("Non connecté : token manquant.");

//       const res = await fetch(`${API}/api/hotels/${id}/`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         const raw = await res.text();
//         throw new Error(raw?.slice?.(0, 200) || `Erreur suppression (${res.status})`);
//       }

//       navigate("/dashboard/hotels");
//     } catch (e) {
//       console.error(e);
//       alert(e.message || "Erreur suppression");
//     }
//   };

//   if (loading) return <div className="p-4">Chargement...</div>;
//   if (error) return <div className="p-4 text-red-600">{error}</div>;
//   if (!hotel) return <div className="p-4">Aucune donnée.</div>;

//   return (
//     <div className="w-full">
//       <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
//         <div className="h-56 w-full bg-neutral-100 overflow-hidden">
//           <img
//             src={photoUrl || fallback}
//             alt={hotel.nom}
//             className="h-full w-full object-cover"
//             onError={(e) => (e.currentTarget.src = fallback)}
//           />
//         </div>

//         <div className="p-5">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <div className="text-xl font-semibold text-neutral-800">{hotel.nom}</div>
//               <div className="text-sm text-neutral-500 mt-1">{hotel.adresse}</div>
//               <div className="text-sm text-neutral-700 mt-3">
//                 <span className="font-semibold">
//                   {new Intl.NumberFormat("fr-FR").format(hotel.prix_par_nuit)} {hotel.devise || "XOF"}
//                 </span>{" "}
//                 par nuit
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => navigate(`/dashboard/hotels/${id}/edit`)}
//                 className="h-10 px-4 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition"
//               >
//                 Modifier
//               </button>

//               <button
//                 type="button"
//                 onClick={onDelete}
//                 className="h-10 px-4 rounded-lg bg-white border border-red-200 text-sm text-red-600 hover:bg-red-50 transition"
//               >
//                 Supprimer
//               </button>
//             </div>
//           </div>

//           {/* Infos supplémentaires si dispo */}
//           <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
//             {"email" in hotel && (
//               <div className="text-neutral-700">
//                 <span className="text-neutral-500">Email :</span> {hotel.email || "-"}
//               </div>
//             )}
//             {"telephone" in hotel && (
//               <div className="text-neutral-700">
//                 <span className="text-neutral-500">Téléphone :</span> {hotel.telephone || "-"}
//               </div>
//             )}
//           </div>

//           <div className="mt-6">
//             <button
//               type="button"
//               onClick={() => navigate("/dashboard/hotels")}
//               className="text-sm text-neutral-600 hover:underline"
//             >
//               ← Retour à la liste
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_RAW =
  import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com";
const API = API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, "");

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Cloudinary: URL directe renvoyée par l'API (photo_url)
  const photoUrl = useMemo(() => {
    if (!hotel) return "";
    if (hotel.photo_url) return hotel.photo_url;
    if (typeof hotel.photo === "string" && hotel.photo.startsWith("http")) return hotel.photo;
    return "";
  }, [hotel]);

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";

  const fetchHotel = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Non connecté : token manquant.");

      const res = await fetch(`${API}/api/hotels/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const ct = res.headers.get("content-type") || "";
      const raw = await res.text();
      const data = ct.includes("application/json") ? JSON.parse(raw || "null") : raw;

      if (!res.ok) {
        const msg =
          typeof data === "string"
            ? data.slice(0, 200)
            : data?.detail || data?.message || JSON.stringify(data).slice(0, 200);
        throw new Error(`Erreur API (${res.status}) : ${msg}`);
      }

      setHotel(data);
    } catch (e) {
      console.error(e);
      setError(e.message || "Erreur chargement détail hôtel");
      setHotel(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotel();
    // eslint-disable-next-line
  }, [id]);

  const onDelete = async () => {
    const ok = window.confirm("Supprimer cet hôtel ? Cette action est irréversible.");
    if (!ok) return;

    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Non connecté : token manquant.");

      const res = await fetch(`${API}/api/hotels/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const raw = await res.text();
        throw new Error(raw?.slice?.(0, 200) || `Erreur suppression (${res.status})`);
      }

      navigate("/dashboard/hotels");
    } catch (e) {
      console.error(e);
      alert(e.message || "Erreur suppression");
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!hotel) return <div className="p-4">Aucune donnée.</div>;

  return (
    <div className="w-full">
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="h-56 w-full bg-neutral-100 overflow-hidden">
          <img
            src={photoUrl || fallback}
            alt={hotel.nom}
            className="h-full w-full object-cover"
            onError={(e) => (e.currentTarget.src = fallback)}
          />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xl font-semibold text-neutral-800">{hotel.nom}</div>
              <div className="text-sm text-neutral-500 mt-1">{hotel.adresse}</div>
              <div className="text-sm text-neutral-700 mt-3">
                <span className="font-semibold">
                  {new Intl.NumberFormat("fr-FR").format(hotel.prix_par_nuit)}{" "}
                  {hotel.devise || "XOF"}
                </span>{" "}
                par nuit
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/hotels/${id}/edit`)}
                className="h-10 px-4 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition"
              >
                Modifier
              </button>

              <button
                type="button"
                onClick={onDelete}
                className="h-10 px-4 rounded-lg bg-white border border-red-200 text-sm text-red-600 hover:bg-red-50 transition"
              >
                Supprimer
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 text-sm">
            {"email" in hotel && (
              <div className="text-neutral-700">
                <span className="text-neutral-500">Email :</span> {hotel.email || "-"}
              </div>
            )}
            {"telephone" in hotel && (
              <div className="text-neutral-700">
                <span className="text-neutral-500">Téléphone :</span> {hotel.telephone || "-"}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/hotels")}
              className="text-sm text-neutral-600 hover:underline"
            >
              ← Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

