import React from "react";
import {
  FiUsers,
  FiMessageSquare,
  FiLayers,
  FiMail,
  FiBriefcase,
  FiHome,
} from "react-icons/fi";

export default function Dashboard() {
  const stats = [
    {
      id: 1,
      title: "100 Formulaires",
      subtitle: "Demandes et formulaires reçus",
      icon: <FiUsers />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      id: 2,
      title: "30 Messages",
      subtitle: "Messages clients et partenaires",
      icon: <FiMessageSquare />,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    {
      id: 3,
      title: "200 Visiteurs",
      subtitle: "Visites sur la plateforme",
      icon: <FiLayers />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      id: 4,
      title: "35 Emails",
      subtitle: "Emails envoyés et reçus",
      icon: <FiMail />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      id: 5,
      title: "20 Hôtels",
      subtitle: "Hôtels enregistrés",
      icon: <FiBriefcase />,
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-600",
    },
    {
      id: 6,
      title: "04 Entités",
      subtitle: "Structures partenaires",
      icon: <FiHome />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="w-full">
      {/* ✅ Header collé (comme le design) */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-4">
        <div className="text-neutral-800 font-semibold">
          Bienvenue sur RED Product
        </div>
        <div className="text-sm text-neutral-500">
          Pilotez vos hôtels, vos données et vos performances en un seul endroit.
        </div>
      </div>

      {/* ✅ Contenu responsive */}
      <div className="px-4 sm:px-6 py-6">
        {/* ✅ Grille responsive sans largeur fixe */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-neutral-200 rounded-xl px-4 py-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bg} ${item.text}`}
                >
                  {item.icon}
                </div>

                <div className="leading-tight min-w-0">
                  <div className="text-sm font-semibold text-neutral-800 truncate">
                    {item.title}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
