import React from "react";
import { FiBell, FiMenu, FiSearch, FiLogOut } from "react-icons/fi";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6">
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-md hover:bg-neutral-100"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
        >
          <FiMenu />
        </button>

        <div className="text-sm text-neutral-500 hidden sm:block">Dashboard</div>
      </div>

      {/* Center: search */}
      <div className="flex max-w-xl ml-[600px] px-3 hidden sm:block">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
          <input
            placeholder="Recherche"
            className="w-full h-10 pl-10 pr-3 rounded-full bg-gray-50 outline-none focus:ring-2 focus:ring-neutral-200 text-sm"
          />
        </div>
      </div>

      {/* Right: icons */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-neutral-100" aria-label="Notifications">
          <FiBell />
        </button>

        <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-sm">
          CF
        </div>

        <button
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-neutral-100 text-sm text-neutral-600"
          onClick={() => alert("Logout à brancher")}
        >
          <FiLogOut /> 
        </button>
      </div>
    </header>
  );
}
