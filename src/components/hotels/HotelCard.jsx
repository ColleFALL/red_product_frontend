// import React from "react";
// import { FiMapPin } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// export default function HotelCard({ hotel, onOpen }) {
//   const navigate = useNavigate();
//   const formatPrice = (n, devise = "XOF") =>
//     new Intl.NumberFormat("fr-FR").format(n) + " " + devise;

//   // ✅ Cloudinary URL : utiliser directement photo_url si fourni
//   const photoUrl = hotel?.photo_url && hotel.photo_url.startsWith("http")
//     ? hotel.photo_url
//     : hotel?.photo && hotel.photo.startsWith("http")
//       ? hotel.photo
//       : "";

//   const fallback =
//     "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";

//   const open = () => {
//     if (onOpen) onOpen(hotel.id); // ouvre modal depuis HotelsList
//     else navigate(`/dashboard/hotels/${hotel.id}`); // fallback page détails
//   };

//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onClick={open}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           open();
//         }
//       }}
//       className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
//       title="Voir les détails"
//     >
//       <div className="h-28 w-full overflow-hidden bg-neutral-100">
//         <img
//           src={photoUrl || fallback}
//           alt={hotel.nom}
//           className="h-full w-full object-cover"
//           loading="lazy"
//           onError={(e) => (e.currentTarget.src = fallback)}
//         />
//       </div>

//       <div className="p-2.5">
//         <div className="flex items-center gap-1 text-[12px] text-red-600 line-clamp-1">
//           <FiMapPin className="text-[11px]" />
//           <span>{hotel.adresse}</span>
//         </div>

//         <div className="mt-0.5 text-[13px] font-semibold text-neutral-800 line-clamp-1">
//           {hotel.nom}
//         </div>

//         <div className="mt-1.5 text-[11px] text-neutral-500">
//           <span className="font-medium text-neutral-700">
//             {formatPrice(hotel.prix_par_nuit, hotel.devise)}
//           </span>{" "}
//           <span className="text-neutral-800">par nuit</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function HotelCard({ hotel, onOpen }) {
  const navigate = useNavigate();
  const formatPrice = (n, devise = "XOF") =>
    new Intl.NumberFormat("fr-FR").format(n) + " " + devise;

  // ✅ Cloudinary URL : utiliser directement photo_url si fourni
  const photoUrl =
    hotel?.photo_url && hotel.photo_url.startsWith("http")
      ? hotel.photo_url
      : hotel?.photo && hotel.photo.startsWith("http")
        ? hotel.photo
        : "";

  // ✅ fallback plus net
  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80";

  const open = () => {
    if (onOpen) onOpen(hotel.id); // ouvre modal depuis HotelsList
    else navigate(`/dashboard/hotels/${hotel.id}`); // fallback page détails
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
      className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
      title="Voir les détails"
    >
      {/* Image plus grande */}
      <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
        <img
          src={photoUrl || fallback}
          alt={hotel.nom}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = fallback)}
        />

        {/* Prix en badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-neutral-900">
            {formatPrice(hotel.prix_par_nuit, hotel.devise)} / nuit
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-sm text-red-600 line-clamp-1">
          <FiMapPin className="text-[14px]" />
          <span>{hotel.adresse}</span>
        </div>

        <div className="mt-1 text-[16px] font-semibold text-neutral-900 line-clamp-1">
          {hotel.nom}
        </div>

        <div className="mt-2 text-sm text-neutral-600">
          <span className="font-semibold text-neutral-900">
            {formatPrice(hotel.prix_par_nuit, hotel.devise)}
          </span>{" "}
          <span className="text-neutral-700">par nuit</span>
        </div>

        {/* CTA discret */}
        <div className="mt-4">
          <span className="inline-flex items-center text-sm font-semibold text-neutral-900">
            Voir détails <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
