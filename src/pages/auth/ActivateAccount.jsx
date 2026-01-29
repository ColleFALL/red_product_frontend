import React, { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { activateAccountApi } from "../../services/authApi";

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "idle", // "idle" (attente), "loading", "success", "error"
    message: "",
  });

  const activationStarted = useRef(false);

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

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error("Erreur d'activation:", error);

      // Gestion intelligente du compte déjà actif (400 ou 403)
      const isAlreadyActive = error.response?.status === 400 || error.response?.status === 403;

      if (isAlreadyActive) {
        setStatus({
          type: "success",
          message: "Ce compte est déjà activé. Vous allez être redirigé vers la connexion.",
        });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        activationStarted.current = false; // Permet de réessayer si c'est une vraie erreur réseau
        setStatus({
          type: "error",
          message: error.response?.data?.detail || "Lien invalide ou expiré. Veuillez demander un nouveau mail.",
        });
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
            <div className="tracking-widest font-semibold">RED PRODUCT</div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-md shadow-xl px-8 py-10">
            <h2 className="text-center text-neutral-700 font-medium mb-6">
              Activation du compte
            </h2>

            <div className="text-center py-4">
              {/* État initial : Propose l'activation */}
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

              {/* État : Chargement */}
              {status.type === "loading" && (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-600 rounded-full animate-spin"></div>
                  <p className="text-neutral-600">{status.message}</p>
                </div>
              )}

              {/* État : Succès */}
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

              {/* État : Erreur */}
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