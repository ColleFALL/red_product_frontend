// import React, { useState } from "react";

// export default function App() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     remember: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: brancher l’API plus tard
//     console.log("LOGIN:", form);
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-neutral-800">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.06),transparent_60%)]" />
//         <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(0,0,0,0.55),rgba(0,0,0,0.2))]" />
//       </div>

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
//             <h2 className="text-center text-neutral-700 font-medium mb-8">
//               Connectez-vous en tant que Admin
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email */}
//               <div className="space-y-2">
//                 <input
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="E-mail"
//                   className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
//                 />
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <input
//                   name="password"
//                   type="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Mot de passe"
//                   className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
//                 />
//               </div>

//               {/* Remember me */}
//               <label className="flex items-center gap-3 text-sm text-neutral-700 select-none">
//                 <input
//                   type="checkbox"
//                   name="remember"
//                   checked={form.remember}
//                   onChange={handleChange}
//                   className="h-4 w-4 border-neutral-300"
//                 />
//                 Gardez-moi connecté
//               </label>

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full h-12 rounded-md bg-neutral-700 text-white font-semibold hover:bg-neutral-800 transition"
//               >
//                 Se connecter
//               </button>
//             </form>
//           </div>

//           {/* Links */}
//           <div className="text-center mt-6 space-y-2">
//             <button
//               type="button"
//               className="text-yellow-400 font-semibold hover:underline"
//               onClick={() => alert("Route /forgot-password à faire")}
//             >
//               Mot de passe oublié?
//             </button>

//             <p className="text-white/80 text-sm">
//               Vous n’avez pas de compte?{" "}
//               <button
//                 type="button"
//                 className="text-yellow-400 font-semibold hover:underline"
//                 onClick={() => alert("Route /register à faire")}
//               >
//                 S'inscrire
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  return <RouterProvider router={router} />;
}

