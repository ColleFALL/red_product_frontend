import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex min-h-screen">
        {/* ✅ Sidebar desktop (plus de fixed) */}
        <div className="hidden md:block w-64 bg-neutral-800">
          <Sidebar />
        </div>

        {/* ✅ Contenu */}
        <div className="flex-1 flex flex-col">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          {/* ✅ Outlet sans padding global (comme tu fais) */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ✅ Overlay mobile */}
      {sidebarOpen && (
        <button
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer le menu"
        />
      )}

      {/* ✅ Sidebar mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-72 bg-neutral-800 z-50 transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}

