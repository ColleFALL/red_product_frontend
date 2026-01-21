import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiMenu, FiSearch, FiArrowRight } from "react-icons/fi";
import { useSearch } from "../../context/SearchContext";

export default function Topbar({ onMenuClick = () => {} }) {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  /* 🔎 Recherche globale */
  const { search, setSearch } = useSearch();
  const [local, setLocal] = useState(search || "");

  // sync si search change ailleurs
  useEffect(() => {
    setLocal(search || "");
  }, [search]);

  // debounce léger
  useEffect(() => {
    const t = setTimeout(() => setSearch(local), 200);
    return () => clearTimeout(t);
  }, [local, setSearch]);

  const [uploading, setUploading] = useState(false);

  /* 👤 Utilisateur */
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/dashboard");
  };

  const userName = user?.name || user?.email || "Utilisateur";

  const initials = useMemo(() => {
    const parts = String(userName).trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    const first = parts[0][0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }, [userName]);

  const avatar = user?.photo || "";

  const BASE_URL = (import.meta.env.VITE_API_URL ||
    "https://red-product-backend-eymz.onrender.com")
    .replace(/\/+$/, "")
    .replace(/\/api\/?$/i, "");

  const avatarUrl = avatar
    ? avatar.startsWith("http")
      ? avatar
      : `${BASE_URL}${avatar}`
    : "";

  const onPick = () => {
    if (!uploading) fileRef.current?.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Non connecté.");

      const fd = new FormData();
      fd.append("photo", file);

      const res = await fetch(`${BASE_URL}/api/auth/avatar/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const ct = res.headers.get("content-type") || "";
      const raw = await res.text();
      const data = ct.includes("application/json")
        ? JSON.parse(raw || "null")
        : raw;

      if (!res.ok) {
        const msg =
          typeof data === "string"
            ? data.slice(0, 200)
            : data?.message || data?.detail || "Erreur upload";
        throw new Error(msg);
      }

      const updatedUser = data?.data;
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur upload photo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 md:px-6">
      {/* Gauche */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Droite */}
      <div className="flex items-center gap-3 shrink-0">
        {/* 🔎 Recherche */}
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

        <button
          type="button"
          className="p-2 rounded-full hover:bg-neutral-100"
          aria-label="Notifications"
        >
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
            <img
              src={avatarUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </button>

        <button
          type="button"
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
