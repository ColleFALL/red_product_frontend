import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX, FiImage } from "react-icons/fi";
// import { createHotel } from "./HotelsList";
// import HotelCreate from "../hotels/HotelsList"

export default function HotelCreate() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    email: "",
    telephone: "",
    prix_par_nuit: "",
    devise: "XOF",
    photo: null,
    photoPreview: "",
  });

  const close = () => navigate(".."); // ✅ revient à /dashboard/hotels

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onPickPhoto = () => fileRef.current?.click();

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((p) => ({ ...p, photo: file, photoPreview: preview }));
  };

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const fd = new FormData();
    fd.append("nom", form.nom);
    fd.append("adresse", form.adresse);
    fd.append("email", form.email);
    fd.append("telephone", form.telephone);
    fd.append("prix_par_nuit", form.prix_par_nuit);
    fd.append("devise", form.devise);
    if (form.photo) fd.append("image", form.photo); // ⚠️ image

    const res = await fetch(
      "https://red-product-backend-eymz.onrender.com/api/hotel",
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur API");

    alert("✅ Hôtel créé avec succès");
    navigate("..");
  } catch (err) {
    alert("❌ " + err.message);
    console.error(err);
  }
};




  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={close}
        aria-hidden="true"
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
          {/* header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="font-semibold text-neutral-700 tracking-wide text-sm">
              CRÉER UN NOUVEAU HÔTEL
            </div>

            <button
              onClick={close}
              className="p-2 rounded-md hover:bg-neutral-100"
              aria-label="Fermer"
            >
              <FiX />
            </button>
          </div>

          {/* body */}
          <form onSubmit={onSubmit} className="p-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nom de l’hôtel">
                <input
                  name="nom"
                  value={form.nom}
                  onChange={onChange}
                  className="input"
                  placeholder="Nom de l'hôtel"
                />
              </Field>

              <Field label="Adresse">
                <input
                  name="adresse"
                  value={form.adresse}
                  onChange={onChange}
                  className="input"
                  placeholder="Adresse"
                />
              </Field>

              <Field label="E-mail">
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="input"
                  placeholder="E-mail"
                  type="email"
                />
              </Field>

              <Field label="Numéro de téléphone">
                <input
                  name="telephone"
                  value={form.telephone}
                  onChange={onChange}
                  className="input"
                  placeholder="+221..."
                />
              </Field>

              <Field label="Prix par nuit">
                <div className="relative">
                  <input
                    name="prix_par_nuit"
                    value={form.prix_par_nuit}
                    onChange={onChange}
                    className="input pr-16"
                    placeholder="prix"
                    inputMode="numeric"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    {form.devise}
                  </span>
                </div>
              </Field>

              <Field label="Devise">
                <select
                  name="devise"
                  value={form.devise}
                  onChange={onChange}
                  className="input"
                >
                  <option value="XOF">XOF</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </Field>
            </div>

            {/* photo */}
            <div className="mt-6">
              <div className="text-xs text-neutral-500 mb-2">Ajouter une photo</div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPhotoChange}
              />

              <button
                type="button"
                onClick={onPickPhoto}
                className="w-full h-44 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition flex flex-col items-center justify-center gap-2 overflow-hidden"
              >
                {form.photoPreview ? (
                  <img
                    src={form.photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-500">
                      <FiImage />
                    </div>
                    <div className="text-sm text-neutral-500">Ajouter une photo</div>
                  </>
                )}
              </button>
            </div>

            {/* footer */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="h-11 px-6 rounded-lg border border-neutral-200 text-sm hover:bg-neutral-50"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="h-11 px-7 rounded-lg bg-black text-orange-600 text-sm hover:bg-neutral-800 transition"
              >
                Enregistrer
              </button>
            </div>
          </form>

          <style>{`
            .input {
              width: 100%;
              height: 44px;
              border-radius: 12px;
              border: 1px solid #e5e5e5;
              padding: 0 14px;
              font-size: 14px;
              outline: none;
              background: #fff;
            }
            .input:focus {
              box-shadow: 0 0 0 2px rgba(0,0,0,0.06);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="text-xs text-neutral-500 mb-2">{label}</div>
      {children}
    </label>
  );
}
