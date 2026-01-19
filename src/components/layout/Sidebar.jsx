import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiHome, FiLogOut } from "react-icons/fi";
import { clearToken } from "../../services/apiClient"; // adapte le chemin si besoin

export default function Sidebar({ onNavigate }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
   ${isActive ? "bg-neutral-200 text-neutral-900" : "text-white/80"}`;

  const navigate = useNavigate();

  const handleLogout = () => {
  clearToken();
  localStorage.removeItem("user");
  navigate("/login", { replace: true });
};

  return (
    <aside className="h-full bg-neutral-800 text-white flex flex-col overflow-hidden">
      {/* Header fixe */}
      <div className="h-16 px-4 flex items-center gap-3 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rotate-45" />
        </div>
        <div className="font-semibold tracking-wider">RED PRODUCT</div>
      </div>

      {/* ✅ Zone scrollable (IMPORTANT: min-h-0 !) */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-4 pt-4 pb-2 text-xs text-white">Principal</div>

        <nav className="px-0 space-y-1">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2  text-sm transition
       ${isActive ? "bg-neutral-200 text-neutral-900" : "text-white/80"}`
            }
          >
            <FiGrid />
            Dashboard
          </NavLink>

          {/* Liste des hôtels */}
          <NavLink
            to="/dashboard/hotels"
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-2  text-sm transition
       ${isActive ? "bg-neutral-200 text-neutral-900" : "text-white/80"}`
            }
          >
            <FiHome />
            Liste des hôtels
          </NavLink>
        </nav>
      </div>

      {/* Footer fixe */}
      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm">
            CF
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium">Colle Fall</div>
            <div className="text-xs text-green-400">● En ligne</div>
          </div>
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-red hover:text-white hover:bg-white/10 rounded-md py-2 transition"
          onClick={handleLogout}
        >
          <FiLogOut /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
