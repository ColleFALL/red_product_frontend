import React, { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiHome, FiLogOut } from "react-icons/fi";
import { clearToken } from "../../services/apiClient"; // adapte le chemin si besoin

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

  const userName = user?.name || user?.email || "Utilisateur";

  const initials = useMemo(() => {
    const parts = String(userName).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    const first = parts[0]?.[0] || "U";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
    return (first + last).toUpperCase();
  }, [userName]);

return (
  <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6">
    {/* Gauche */}
    <div className="flex items-center gap-3 shrink-0">
      <button
        className="md:hidden p-2 rounded-md hover:bg-neutral-100"
        onClick={onMenuClick}
        aria-label="Ouvrir le menu"
      >
        <FiMenu />
      </button>

      <div className="text-sm text-neutral-500 hidden sm:block">Dashboard</div>
    </div>

    {/* Spacer (au lieu de centrer la recherche) */}
    <div className="flex-1" />

    {/* Droite */}
    <div className="flex items-center gap-3 shrink-0">
      {/* 🔎 Recherche rapprochée de la notif */}
      <div className="hidden sm:block">
        <div className="relative w-52 md:w-60">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Recherche"
            className="w-full h-9 pl-10 pr-3 rounded-full bg-gray-50 outline-none focus:ring-2 focus:ring-neutral-200 text-sm"
          />
        </div>
      </div>

      <button className="p-2 rounded-full hover:bg-neutral-100" aria-label="Notifications">
        <FiBell />
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <button
        type="button"
        onClick={onPick}
        className={`w-9 h-9 rounded-full bg-neutral-200 overflow-hidden flex items-center justify-center text-sm font-medium ${
          uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label="Changer photo de profil"
        title={uploading ? "Upload..." : userName}
        disabled={uploading}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </button>

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
