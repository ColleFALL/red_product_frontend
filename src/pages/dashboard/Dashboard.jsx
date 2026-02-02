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
      icon: <FiUsers className="w-5 h-5 text-white" />,
      bg: "bg-purple-700/30",
    },
    {
      id: 2,
      title: "30 Messages",
      subtitle: "Messages clients et partenaires",
      icon: <FiMessageSquare className="w-5 h-5 text-white" />,
      bg: "bg-emerald-700/30",
    },
    {
      id: 3,
      title: "200 Visiteurs",
      subtitle: "Visites sur la plateforme",
      icon: <FiLayers className="w-5 h-5 text-white" />,
      bg: "bg-yellow-700/30",
    },
    {
      id: 4,
      title: "35 Emails",
      subtitle: "Emails envoyés et reçus",
      icon: <FiMail className="w-5 h-5 text-white" />,
      bg: "bg-red-700/30",
    },
    {
      id: 5,
      title: "20 Hôtels",
      subtitle: "Hôtels enregistrés",
      icon: <FiBriefcase className="w-5 h-5 text-white" />,
      bg: "bg-fuchsia-700/30",
    },
    {
      id: 6,
      title: "04 Entités",
      subtitle: "Structures partenaires",
      icon: <FiHome className="w-5 h-5 text-white" />,
      bg: "bg-blue-700/30",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 py-4">
        <div className="text-neutral-800 font-semibold">
          Bienvenue sur RED Product
        </div>
        <div className="text-sm text-neutral-500">
          Pilotez vos hôtels, vos données et vos performances en un seul endroit.
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-6">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-neutral-200 rounded-xl px-5 py-5 min-h-[96px] shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {/* Cercle coloré */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}
                >
                  {item.icon}
                </div>

                {/* Texte */}
                <div className="leading-tight min-w-0">
                  <div className="text-base font-semibold text-neutral-800 truncate">
                    {item.title}
                  </div>
                  <div className="text-sm text-neutral-500 truncate">
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
