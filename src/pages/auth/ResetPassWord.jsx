import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../../services/authApi"; // ✅ adapte le chemin si besoin

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      setStatus({ type: "error", message: "Veuillez remplir les deux champs." });
      return;
    }
    if (password !== password2) {
      setStatus({ type: "error", message: "Les mots de passe ne correspondent pas." });
      return;
    }

    setStatus({ type: "loading", message: "Mise à jour en cours..." });

    try {
      await resetPasswordApi({ uid, token, new_password: password });
      setStatus({ type: "success", message: "Mot de passe modifié. Redirection..." });
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Erreur." });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
            <h2 className="text-neutral-800 font-semibold mb-4">
              Nouveau mot de passe
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Entrez votre nouveau mot de passe ci-dessous.
            </p>

            {status.message && (
              <div
                className={`mb-5 text-sm rounded-md px-4 py-3 ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700"
                    : status.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-neutral-50 text-neutral-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
                type="password"
                required
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <input
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirmer le mot de passe"
                type="password"
                required
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full h-12 rounded-md bg-neutral-600 text-[17px] text-[#FFFFFF] font-semibold hover:bg-neutral-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.type === "loading" ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </form>
          </div>

          {/* Link bottom */}
          <div className="text-center mt-6">
            <p className="text-white/80 text-sm">
              Revenir à la{" "}
              <Link
                to="/"
                className="text-[#FFD964] font-semibold hover:underline"
              >
                connexion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
