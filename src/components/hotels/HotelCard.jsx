// import React from "react";
// import { FiMapPin } from "react-icons/fi";

// export default function HotelCard({ hotel }) {
//   const formatPrice = (n, devise = "XOF") =>
//     new Intl.NumberFormat("fr-FR").format(n) + " " + devise;

//   const BASE_URL =
//     (import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com")
//       .replace(/\/+$/, "")
//       .replace(/\/api\/?$/i, "");
//       console.log("PHOTO BACK:", hotel.photo);


//   const photoUrl = hotel.photo
//     ? (hotel.photo.startsWith("http") ? hotel.photo : `${BASE_URL}${hotel.photo}`)
//     : "";

//   const fallback =
//     "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";

//   return (
//     <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition">
//       <div className="h-28 w-full overflow-hidden bg-neutral-100">
//         <img
//           src={photoUrl || fallback}
//           alt={hotel.nom}
//           className="h-full w-full object-cover"
//           loading="lazy"
//           onError={(e) => {
//             e.currentTarget.src = fallback;
//           }}
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

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const formatPrice = (n, devise = "XOF") =>
    new Intl.NumberFormat("fr-FR").format(n) + " " + devise;

  const BASE_URL =
    (import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com")
      .replace(/\/+$/, "")
      .replace(/\/api\/?$/i, "");

  const photoUrl = hotel.photo
    ? (hotel.photo.startsWith("http") ? hotel.photo : `${BASE_URL}${hotel.photo}`)
    : "";

  const fallback =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/hotels/${hotel.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/dashboard/hotels/${hotel.id}`);
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

