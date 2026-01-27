import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { activateAccountApi } from "../../services/authApi";

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    type: "loading",
    message: "Activation de votre compte en cours...",
  });

  useEffect(() => {
    const activate = async () => {
      try {
        await activateAccountApi({ uid, token });

        setStatus({
          type: "success",
          message: "Votre compte a été activé avec succès ! Vous pouvez maintenant vous connecter.",
        });

        // Redirection automatique après 3 secondes
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error(error);
        setStatus({
          type: "error",
          message: error.message || "Erreur lors de l'activation. Le lien est peut-être expiré ou invalide.",
        });
      }
    };

    if (uid && token) {
      activate();
    }
  }, [uid, token, navigate]);

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
            <h2 className="text-center text-neutral-700 font-medium mb-6">
              Activation du compte
            </h2>

            <div className="text-center py-8">
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
                  <p className="text-sm text-neutral-500">Redirection automatique...</p>
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