import React, { useEffect, useMemo, useState } from "react";
import {
  FiX,
  FiMapPin,
  FiMail,
  FiPhone,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";

const API_RAW =
  import.meta.env.VITE_API_URL ||
  "https://red-product-backend-eymz.onrender.com";
const API = API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, "");

export default function HotelDetailsModal({ id, onClose, onDeleted, onEdit }) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = useMemo(() => API, []);

  const photoUrl = useMemo(() => {
    if (!hotel?.photo) return "";
    return hotel.photo.startsWith("http")
      ? hotel.photo
      : `${BASE_URL}${hotel.photo}`;
  }, [hotel, BASE_URL]);

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=60";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
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
        const data = ct.includes("application/json")
          ? JSON.parse(raw || "null")
          : raw;

        if (!res.ok) {
          const msg =
            typeof data === "string"
              ? data.slice(0, 200)
              : data?.detail ||
                data?.message ||
                JSON.stringify(data).slice(0, 200);
          throw new Error(`Erreur API (${res.status}) : ${msg}`);
        }

        setHotel(data);
      } catch (e) {
        setError(e.message || "Erreur chargement détail hôtel");
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const onDelete = async () => {
    const ok = window.confirm(
      "Supprimer cet hôtel ? Cette action est irréversible."
    );
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
        throw new Error(
          raw?.slice?.(0, 200) || `Erreur suppression (${res.status})`
        );
      }

      onDeleted?.();
    } catch (e) {
      alert(e.message || "Erreur suppression");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-label="Fermer"
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden">
          {/* header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="text-sm font-semibold text-neutral-800 tracking-wide">
              DÉTAILS DE L’HÔTEL
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-neutral-100"
              aria-label="Fermer"
            >
              <FiX />
            </button>
          </div>

          {/* content */}
          {loading ? (
            <div className="p-6 text-sm text-neutral-600">Chargement…</div>
          ) : error ? (
            <div className="p-6 text-sm text-red-600">{error}</div>
          ) : !hotel ? (
            <div className="p-6 text-sm text-neutral-600">Aucune donnée.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-0">
              {/* image */}
              <div className="bg-neutral-100">
                <img
                  src={photoUrl || fallback}
                  alt={hotel.nom}
                  className="w-full h-full object-cover md:h-[420px]"
                  onError={(e) => (e.currentTarget.src = fallback)}
                />
              </div>

              {/* infos */}
              <div className="p-6">
                <div className="text-xl font-semibold text-neutral-900">
                  {hotel.nom}
                </div>

                <div className="mt-2 flex items-start gap-2 text-sm text-neutral-600">
                  <FiMapPin className="mt-0.5 shrink-0" />
                  <span>{hotel.adresse || "-"}</span>
                </div>

                <div className="mt-4 text-sm">
                  <span className="text-neutral-500">Prix/nuit :</span>{" "}
                  <span className="font-semibold text-neutral-900">
                    {new Intl.NumberFormat("fr-FR").format(hotel.prix_par_nuit)}{" "}
                    {hotel.devise || "XOF"}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-sm text-neutral-700">
                  <div className="flex items-center gap-2">
                    <FiMail />
                    <span>{hotel.email || "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone />
                    <span>{hotel.telephone || "-"}</span>
                  </div>
                </div>

                {/* actions */}
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose?.();
                      navigate(`/dashboard/hotels/${id}/edit`);
                    }}
                    className="h-10 px-4 rounded-lg bg-neutral-800 text-white text-sm hover:bg-neutral-900 transition flex items-center gap-2"
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    onClick={onDelete}
                    className="h-10 px-4 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition flex items-center gap-2"
                  >
                    <FiTrash2 /> Supprimer
                  </button>
                </div>

                <div className="mt-4 text-xs text-neutral-400">
                  ID: {hotel.id}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
