import React from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiSearch, FiArrowLeft } from "react-icons/fi";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/dashboard");
  };

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

        <div className="text-sm text-neutral-500 hidden sm:block">Dashboard</div>
      </div>

      {/* Center (hidden on mobile) */}
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
        <button className="p-2 rounded-full hover:bg-neutral-100" aria-label="Notifications">
          <FiBell />
        </button>

        <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm">
          CF
        </div>

        <button
          className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
          onClick={handleBack}
          aria-label="Retour"
          title="Retour"
        >
          <FiArrowLeft />
        </button>
      </div>
    </header>
  );
}
