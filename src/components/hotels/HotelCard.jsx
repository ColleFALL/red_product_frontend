import React from "react";
import { FiMapPin } from "react-icons/fi";

export default function HotelCard({ hotel }) {
  const formatPrice = (n) =>
    new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Image plus petite */}
      <div className="h-28 w-full overflow-hidden bg-neutral-100">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";
          }}
        />
      </div>

      {/* Contenu plus compact */}
      <div className="p-2.5">
        {/*  Localisation */}
        <div className="flex items-center gap-1 text-[12px] text-red-600 line-clamp-1">
          <FiMapPin className="text-[11px]" />
          <span>{hotel.location}</span>
        </div>

        {/* Nom hôtel */}
        <div className="mt-0.5 text-[13px] font-semibold text-neutral-800 line-clamp-1">
          {hotel.name}
        </div>

        {/* Prix */}
        <div className="mt-1.5 text-[11px] text-neutral-500">
          <span className="font-medium text-neutral-700">
            {formatPrice(hotel.price)}
          </span>{" "}
          <span className="text-neutral-800">par nuit</span>
        </div>
      </div>
    </div>
  );
}
