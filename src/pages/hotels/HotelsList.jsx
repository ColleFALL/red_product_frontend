
// import React, { useEffect, useMemo, useState } from "react";
// import HotelCard from "../../components/hotels/HotelCard";
// import { useNavigate, Outlet, useLocation } from "react-router-dom";
// import { useSearch } from "../../context/SearchContext";

// const API_RAW =
//   import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com";

// const API = API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, "");

// export default function HotelsList() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { search, setSearch } = useSearch();

//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchHotels = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("access");
//       if (!token) throw new Error("Non connecté : token manquant.");

//       const res = await fetch(`${API}/api/hotels/`, {
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

//       const list = Array.isArray(data) ? data : data?.results || [];
//       setHotels(list);
//     } catch (e) {
//       console.error(e);
//       setError(e.message || "Erreur chargement hôtels");
//       setHotels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHotels();
//     // eslint-disable-next-line
//   }, [location.pathname]);

//   const filteredHotels = useMemo(() => {
//     const q = (search || "").trim().toLowerCase();
//     if (!q) return hotels;

//     return hotels.filter(
//       (h) =>
//         (h.nom || "").toLowerCase().includes(q) ||
//         (h.adresse || "").toLowerCase().includes(q)
//     );
//   }, [hotels, search]);

//   return (
//     <div className="w-full">
//       <div className="bg-white border-b border-neutral-200 px-6 py-4">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <div className="text-neutral-800 font-semibold">Liste des hôtels</div>

//             <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
//               <span>Hôtels</span>
//               <span className="text-neutral-300">•</span>
//               <span>{filteredHotels.length}</span>
//               {loading && <span className="text-neutral-300">• Chargement...</span>}
//             </div>

//             {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate("new")}
//             className="h-10 px-4 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-2"
//           >
//             <span className="text-lg leading-none">+</span>
//             Créer un nouveau hôtel
//           </button>
//         </div>

//         {/* <div className="mt-4">
//           <input
//             value={search || ""}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Rechercher (nom, adresse)..."
//             className="w-full max-w-md h-10 rounded-lg border border-neutral-200 px-3 text-sm outline-none"
//           />
//         </div> */}
//       </div>

//       <div className="px-6 py-5">
//         <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
//           {filteredHotels.map((hotel) => (
//             <HotelCard key={hotel.id} hotel={hotel} />
//           ))}
//         </div>
//       </div>

//       <Outlet />
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import HotelCard from "../../components/hotels/HotelCard";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import HotelDetailsModal from "./HotelDetailsModal"; // AJOUT

const API_RAW =
  import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com";

const API = API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, "");

export default function HotelsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useSearch();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  modal détails
  const [selectedId, setSelectedId] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Non connecté : token manquant.");

      const res = await fetch(`${API}/api/hotels/`, {
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

      const list = Array.isArray(data) ? data : data?.results || [];
      setHotels(list);
    } catch (e) {
      console.error(e);
      setError(e.message || "Erreur chargement hôtels");
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
    // eslint-disable-next-line
  }, [location.pathname]);

  const filteredHotels = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return hotels;

    return hotels.filter(
      (h) =>
        (h.nom || "").toLowerCase().includes(q) ||
        (h.adresse || "").toLowerCase().includes(q)
    );
  }, [hotels, search]);

  return (
    <div className="w-full">
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-neutral-800 font-semibold">Liste des hôtels</div>

            <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
              <span>Hôtels</span>
              <span className="text-neutral-300">•</span>
              <span>{filteredHotels.length}</span>
              {loading && <span className="text-neutral-300">• Chargement...</span>}
            </div>

            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </div>

          <button
            type="button"
            onClick={() => navigate("new")}
            className="h-10 px-4 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Créer un nouveau hôtel
          </button>
        </div>
      </div>
      <div className="px-6 py-5">
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onOpen={setSelectedId} //  ouvre modal
            />
          ))}
        </div>
      </div>
      {/*  Modal détails (depuis la liste) */}
      {selectedId && (
        <HotelDetailsModal
          id={selectedId}
          onClose={() => setSelectedId(null)}
          onDeleted={() => {
            setSelectedId(null);
            fetchHotels(); // refresh après suppression
          }}
        />
      )}
      <Outlet />
    </div>
  );
}
