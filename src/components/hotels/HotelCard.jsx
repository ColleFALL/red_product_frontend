import React from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function HotelCard({ hotel, onOpen }) {
  const navigate = useNavigate();

  const formatPrice = (n, devise = "XOF") =>
    new Intl.NumberFormat("fr-FR").format(n) + " " + devise;

  // ✅ IMAGE LOCALE DJANGO
  // Priorité :
  // 1. photo_url (URL absolue générée par le backend)
  // 2. photo (chemin /media/...)
  // 3. fallback
  const photoUrl = hotel?.photo_url || hotel?.photo || "";

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";

  const open = () => {
    if (onOpen) onOpen(hotel.id);
    else navigate(`/dashboard/hotels/${hotel.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
      title="Voir les détails"
    >
      <div className="h-28 w-full overflow-hidden bg-neutral-100">
        <img
          src={photoUrl || fallback}
          alt={hotel.nom}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />
      </div>

      <div className="p-2.5">
        <div className="flex items-center gap-1 text-[12px] text-red-600 line-clamp-1">
          <FiMapPin className="text-[11px]" />
          <span>{hotel.adresse}</span>
        </div>

        <div className="mt-0.5 text-[13px] font-semibold text-neutral-800 line-clamp-1">
          {hotel.nom}
        </div>

        <div className="mt-1.5 text-[11px] text-neutral-500">
          <span className="font-medium text-neutral-700">
            {formatPrice(hotel.prix_par_nuit, hotel.devise)}
          </span>{" "}
          <span className="text-neutral-800">par nuit</span>
        </div>
      </div>
    </div>
  );
}
