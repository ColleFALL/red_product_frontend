import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockRegister } from "../../services/authMock";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    accept: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Création..." });

    // ✅ petit contrôle (optionnel mais utile)
    if (!form.accept) {
      return setStatus({
        type: "error",
        message: "Veuillez accepter les termes et la politique.",
      });
    }

    try {
      await mockRegister({
        fullName: form.name,
        email: form.email,
        password: form.password,
      });

      setStatus({ type: "success", message: "Compte créé ! Connectez-vous." });

      // ✅ tu voulais : inscription -> page connexion -> puis dashboard
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.message || "Erreur lors de l'inscription",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-800">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-1200 to-black" />

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
              Inscrivez-vous en tant que Admin
            </h2>

            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="space-y-6"
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nom"
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <input
                type="email"
                autoComplete="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <input
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <label className="flex items-center gap-3 text-sm text-neutral-700 select-none pt-1">
                <input
                  type="checkbox"
                  name="accept"
                  checked={form.accept}
                  onChange={handleChange}
                  className="h-4 w-4 border-neutral-300"
                />
                Accepter les termes et la politique
              </label>

              <button
                type="submit"
                className="w-full h-12 rounded-md bg-black text-[17px] text-[#FFFFFF] font-semibold hover:bg-neutral-900 transition"
              >
                S'inscrire
              </button>

              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "error"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Link bottom */}
          <div className="text-center mt-6">
            <p className="text-white/80 text-sm">
              Vous avez déjà un compte?{" "}
              <Link
                to="/"
                className="text-[#FFD964] font-semibold hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
