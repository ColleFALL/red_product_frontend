// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: brancher API forgot-password plus tard
//     console.log("FORGOT:", email);
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden ">
//       {/* Background */}
//       <div className="absolute inset-0 bg-black/70" />

//       <div className="relative min-h-screen flex items-center justify-center px-4 py-10">
//         <div className="w-full max-w-md">
//           {/* Logo */}
//           <div className="flex items-center justify-center gap-3 mb-6 text-white">
//             <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
//               <div className="w-3 h-3 bg-white rotate-45" />
//             </div>
//             <div className="tracking-widest font-semibold">RED PRODUCT</div>
//           </div>

//           {/* Card */}
//           <div className="bg-white rounded-md shadow-xl px-8 py-10">
//             <h2 className="text-neutral-800 font-semibold mb-4">
//               Mot de passe oublié?
//             </h2>

//             <p className="text-sm text-neutral-600 leading-relaxed mb-6">
//               Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
//               instructions sur la façon de modifier votre mot de passe.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Votre e-mail"
//                 className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
//               />

//               <button
//                 type="submit"
//                 className="w-full h-12 rounded-md bg-neutral-600 text-[17px] text-[#FFFFFF] font-semibold hover:bg-neutral-800 transition"
//               >
//                 Envoyer
//               </button>
//             </form>
//           </div>

//           {/* Link bottom */}
//           <div className="text-center mt-6">
//             <p className="text-white/80 text-sm">
//               Revenir à la{" "}
//               <Link
//                 to="/"
//                 className="text-[#FFD964] font-semibold hover:underline"
//               >
//                 connexion
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordApi } from "../../services/authApi"; // ✅ adapte le chemin si besoin

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus({ type: "error", message: "Veuillez renseigner votre e-mail." });
      return;
    }

    setStatus({ type: "loading", message: "Envoi en cours..." });

    try {
      await forgotPasswordApi(email.trim());
      setStatus({
        type: "success",
        message:
          "Si cet e-mail existe, un lien de réinitialisation a été envoyé. (En local : regarde le terminal Django)",
      });
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
              Mot de passe oublié?
            </h2>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Entrez votre adresse e-mail ci-dessous et nous vous envoyons des
              instructions sur la façon de modifier votre mot de passe.
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                type="email"
                required
                className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
              />

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full h-12 rounded-md bg-neutral-600 text-[17px] text-[#FFFFFF] font-semibold hover:bg-neutral-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.type === "loading" ? "Envoi..." : "Envoyer"}
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
