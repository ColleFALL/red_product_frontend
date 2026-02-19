import React, { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { activateAccountApi } from "../../services/authApi";

export default function ActivateAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const activationStarted = useRef(false);

  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");
  let token = queryParams.get("token");

  // ✅ Encodage URL-safe pour Djoser
  if (token) {
    token = encodeURIComponent(token);
  }

  const handleActivation = async () => {
    if (activationStarted.current) return;
    activationStarted.current = true;

    setStatus({ type: "loading", message: "Activation de votre compte en cours..." });

    try {
      await activateAccountApi({ uid, token });

      setStatus({
        type: "success",
        message: "Votre compte a été activé avec succès ! Redirection en cours...",
      });

      setTimeout(() => navigate("/login"), 3000);

    } catch (error) {
      console.error("Détails erreur:", error.response);

      const isAlreadyActive = error.response?.status === 400 || error.response?.status === 403;

      if (isAlreadyActive) {
        setStatus({
          type: "success",
          message: "Votre compte est déjà actif ! Vous allez être redirigé...",
        });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        activationStarted.current = false;
        setStatus({
          type: "error",
          message:
            error.response?.data?.detail ||
            "Le lien d’activation est invalide ou a expiré. Si votre compte est déjà actif, vous pouvez vous connecter. Sinon, demandez un nouveau lien.",
        });
        console.log("UID:", uid);
        console.log("TOKEN:", token);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6 text-white">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rotate-45" />
            </div>
            <div className="tracking-widest text-yellow-600 font-semibold">RED PRODUCT</div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-md shadow-xl px-8 py-10">
            <h2 className="text-center text-neutral-700 font-medium mb-6">
              Activation du compte
            </h2>

            <div className="text-center py-4">
              {status.type === "idle" && (
                <div className="flex flex-col items-center gap-6">
                  <p className="text-neutral-600">
                    Merci d'avoir rejoint RED PRODUCT. Cliquez ci-dessous pour activer votre profil.
                  </p>
                  <button
                    onClick={handleActivation}
                    className="w-full py-3 bg-neutral-800 text-white rounded shadow-lg hover:bg-black transition-all font-medium"
                  >
                    Activer mon compte
                  </button>
                </div>
              )}

              {status.type === "loading" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-600 rounded-full animate-spin"></div>
                  <p className="text-neutral-600">{status.message}</p>
                </div>
              )}

              {status.type === "success" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-medium text-center">{status.message}</p>
                  <p className="text-sm text-neutral-500 italic">Redirection automatique...</p>
                </div>
              )}

              {status.type === "error" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-medium text-center">{status.message}</p>
                  <Link
                    to="/login"
                    className="mt-4 px-6 py-2 bg-neutral-600 text-white rounded-md hover:bg-neutral-800 transition"
                  >
                    Retour à la connexion
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
