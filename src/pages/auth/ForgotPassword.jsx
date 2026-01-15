import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: brancher API forgot-password plus tard
    console.log("FORGOT:", email);
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
            <h2 className="text-neutral-800 font-semibold mb-4">
              Mot de passe oublié?
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
              instructions sur la façon de modifier votre mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <button
                type="submit"
                className="w-full h-12 rounded-md bg-black text-[17px] text-[#FFFFFF] font-semibold hover:bg-neutral-800 transition"
              >
                Envoyer
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
