import React, { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiHome, FiLogOut } from "react-icons/fi";
import { clearToken } from "../../services/apiClient"; // adapte le chemin si besoin
import { Bot } from 'lucide-react';

export default function Sidebar({ onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  //  Récupérer user depuis localStorage (rempli par AdminLayout via /api/auth/me)
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);
  const isOnline = !!localStorage.getItem("access");

const userName = user?.name || user?.fullName || user?.username || user?.email || "Utilisateur";


  const initials = useMemo(() => {
    const parts = String(userName).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    const first = parts[0]?.[0] || "U";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
    return (first + last).toUpperCase();
  }, [userName]);

return (
  <aside className="relative sidebar-bg text-white overflow-hidden flex flex-col h-screen">
    {/* Background overlay comme login */}
    <div className="absolute inset-0 bg-black/70" />

    {/* Contenu au-dessus */}
    <div className="relative z-10 flex flex-col h-full">
      {/* Header fixe */}
      <div className="h-16 px-4 flex items-center gap-3 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rotate-45" />
        </div>
        <div className="font-semibold tracking-wider">RED PRODUCT</div>
      </div>

      {/* Zone scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-4 pt-4 pb-2 text-xs text-white">Principal</div>

        <nav className="px-0 space-y-1">
          <NavLink
            to="/dashboard"
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm transition
              ${isActive ? "bg-neutral-200 text-neutral-900" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <FiGrid />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/hotels"
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-2 text-sm transition
              ${isActive ? "bg-neutral-200 text-neutral-900" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <FiHome />
            Liste des hôtels
          </NavLink>

          {/* ✅ NOUVEAU - Lien chatbot */}
          <NavLink
            to="/dashboard/chatbot" 
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-2 text-sm transition
              ${isActive ? "bg-neutral-200 text-neutral-900" : "text-white/80 hover:bg-white/10"}`
            }
          >
            <Bot className="w-5 h-5" />
            Assistant IA
          </NavLink>
        </nav>
      </div>

      {/* Footer fixe */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          {/* Initiales dynamiques */}
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm">
            {initials}
          </div>

          {/* Nom dynamique */}
          <div className="leading-tight min-w-0">
            <div className="text-sm font-medium truncate">{userName}</div>
            <div
              className={`text-xs ${
                isOnline ? "text-green-400" : "text-red-400"
              }`}
            >
              ● {isOnline ? "En ligne" : "Hors ligne"}
            </div>
          </div>
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-red-400 hover:text-white hover:bg-white/10 rounded-md py-2 transition"
          onClick={handleLogout}
        >
          <FiLogOut /> Déconnexion
        </button>
      </div>
    </div>
  </aside>
);
}
