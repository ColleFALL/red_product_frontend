import React, { useMemo, useState } from "react";
import HotelCard from "../../components/hotels/HotelCard";
import { useNavigate, Link } from "react-router-dom";

export default function HotelsList() {
  const navigate = useNavigate();
  //  Données statiques (API-ready)
  const hotels = useMemo(
    () => [
      {
        id: 1,
        name: "Hotel Terrou-Bi",
        location: "Boulevard Martin Luther King, Dakar",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 2,
        name: "King Fahd Palace",
        location: "Les Almadies, Dakar",
        price: 30000,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 3,
        name: "Radisson Blu Hotel",
        location: "Corniche Ouest, Dakar",
        price: 32000,
        image:
          "https://images.unsplash.com/photo-1551887373-6c5bd4a9b9f0?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 4,
        name: "Pullman Dakar Teranga",
        location: "Place de l’Indépendance, Dakar",
        price: 30000,
        image:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 5,
        name: "Hôtel Lac Rose",
        location: "Lac Rose, Dakar",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 6,
        name: "Hôtel Saly",
        location: "Mbour, Sénégal",
        price: 20000,
        image:
          "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 7,
        name: "Palm Beach Resort & Spa",
        location: "Saly, Sénégal",
        price: 22000,
        image:
          "https://images.unsplash.com/photo-1519821172141-b5d8dcd3f49a?auto=format&fit=crop&w=1200&q=60",
      },
      {
        id: 8,
        name: "Pullman Dakar Teranga",
        location: "Place de l’Indépendance, Dakar",
        price: 30000,
        image:
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=60",
      },
    ],
    []
  );

  // 🔍 Filtre (dynamique)
  const [query, setQuery] = useState("");

  const filteredHotels = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hotels;
    return hotels.filter(
      (h) =>
        h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q)
    );
  }, [hotels, query]);

  return (
    <div className="w-full">
      {/*  Header collé au Topbar + aligné comme Dashboard */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-neutral-800 font-semibold">
              Liste des hôtels
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
              <span>Hôtels</span>
              <span className="text-neutral-300">•</span>
              <span>{filteredHotels.length}</span>
            </div>
          </div>

          {/*  Bouton créer */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/hotels/create")}
            className="h-10 px-4 rounded-lg bg-white border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span>
            Créer un nouveau hôtel
          </button>
        </div>
      </div>

      {/*  Contenu avec padding (comme Dashboard) */}
      <div className="px-6 py-5">
        {/* Grille */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
