import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { meApi } from "../services/authApi";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMe = async () => {
      try {
        // ✅ Appel /api/auth/me (auth: true)
        const res = await meApi(); // { success, message, data: admin }
        const user = res?.data;

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (e) {
        // Si token expiré / pas connecté => retour login
        // (on reste simple, pas de refresh token ici)
        navigate("/login", { replace: true });
      }
    };

    loadMe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="flex min-h-screen">
        {/* ✅ Sidebar desktop */}
        <div className="hidden md:block w-64 bg-neutral-800">
          <Sidebar />
        </div>

        {/* ✅ Contenu */}
        <div className="flex-1 flex flex-col">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

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
