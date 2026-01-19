import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../../services/authApi";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Connexion..." });

    try {
      const res = await loginApi({
        email: form.email,
        password: form.password,
        remember: form.remember,
      });

      // ✅ Récupère access/refresh depuis la réponse (cas le plus courant DRF)
      const access = res?.data?.access || res?.data?.data?.access;
      const refresh = res?.data?.refresh || res?.data?.data?.refresh;
      const admin = res?.data?.admin || res?.data?.data?.admin;

      if (!access) throw new Error("Token access manquant dans la réponse API.");

      // ✅ Stockage tokens (JWT)
      localStorage.setItem("access", access);
      if (refresh) localStorage.setItem("refresh", refresh);

      // Optionnel: garder aussi "token" = access si ton app l'utilise ailleurs
      localStorage.setItem("token", access);

      // Optionnel: stocker l'admin si présent
      if (admin) localStorage.setItem("user", JSON.stringify(admin));

      setStatus({ type: "success", message: "Connecté !" });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Erreur de connexion",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden ">
      {/* Background */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6 text-white">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rotate-45" />
            </div>
            <div className="tracking-widest font-semibold">RED PRODUCT</div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-md shadow-xl px-8 py-10">
            <h2 className="text-center text-neutral-700 font-medium mb-8">
              Connectez-vous en tant que Admin
            </h2>

            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-y-6"
            >
              <input
                autoComplete="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <input
                autoComplete="current-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <label className="flex items-center gap-3 text-sm text-neutral-700 select-none">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="h-4 w-4 border-neutral-300"
                />
                Gardez-moi connecté
              </label>

              <button
                type="submit"
                className="w-full h-12 rounded-md bg-neutral-600 text-[#FFFFFF] text-[17px] font-semibold hover:bg-neutral-800 transition"
                disabled={status.type === "loading"}
              >
                {status.type === "loading" ? "Connexion..." : "Se connecter"}
              </button>

              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Links */}
          <div className="text-center mt-6 space-y-2">
            <Link
              to="/forgot-password"
              className="text-[#FFD964] font-semibold hover:underline"
            >
              Mot de passe oublié?
            </Link>

            <p className="text-white/80 text-sm">
              Vous n’avez pas de compte?{" "}
              <Link
                to="/register"
                className="text-[#FFD964] font-semibold hover:underline"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
