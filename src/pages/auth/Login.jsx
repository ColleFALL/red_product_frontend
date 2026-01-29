
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
      await loginApi({
        email: form.email,
        password: form.password,
        remember: form.remember,
      });

      setStatus({ type: "success", message: "Connecté !" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      console.error(err);

      let errorMessage = "Erreur de connexion";

      // Gérer les erreurs spécifiques
      if (err.message.includes("No active account")) {
        errorMessage = "Compte non actif. Vérifiez votre email pour activer votre compte.";
      } else if (err.message.includes("Unable to log in")) {
        errorMessage = "Email ou mot de passe incorrect.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
                required
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <input
                autoComplete="current-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
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
                className="w-full h-12 rounded-md bg-neutral-600 text-[#FFFFFF] text-[17px] font-semibold hover:bg-neutral-800 transition disabled:opacity-50"
                disabled={status.type === "loading"}
              >
                {status.type === "loading" ? "Connexion..." : "Se connecter"}
              </button>

              {status.message && (
                <div
                  className={`text-sm text-center p-3 rounded ${
                    status.type === "error"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {status.message}
                </div>
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
              Vous n'avez pas de compte?{" "}
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