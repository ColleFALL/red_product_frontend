import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiMenu,
  FiSearch,
  FiArrowRight, // ✅ flèche vers la droite
} from "react-icons/fi";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  // 🔙 Retour (navigation uniquement)
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  // 👤 Récupération user depuis localStorage
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);

  const userName = user?.name || user?.email || "Utilisateur";

  // 🔤 Initiales (ex: "Mor Fall" → MF)
  const initials = useMemo(() => {
    const parts = String(userName).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    const first = parts[0][0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }, [userName]);

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          className="md:hidden p-2 rounded-md hover:bg-neutral-100"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
        >
          <FiMenu />
        </button>

        <div className="text-sm text-neutral-500 hidden sm:block">
          Dashboard
        </div>
      </div>

      {/* Center (search, desktop only) */}
      <div className="hidden sm:flex flex-1 justify-center px-3">
        <div className="relative w-full max-w-xl">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            placeholder="Recherche"
            className="w-full h-10 pl-10 pr-3 rounded-full bg-gray-50 outline-none focus:ring-2 focus:ring-neutral-200 text-sm"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          className="p-2 rounded-full hover:bg-neutral-100"
          aria-label="Notifications"
        >
          <FiBell />
        </button>

        {/* 👤 Profil : initiales */}
        <div
          className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium"
          title={userName}
        >
          {initials}
        </div>

        {/* ➡️ Bouton Retour (flèche vers la droite) */}
        <button
          className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
          onClick={handleBack}
          aria-label="Retour"
          title="Retour"
        >
          <FiArrowRight />
        </button>
      </div>
    </header>
  );
}
