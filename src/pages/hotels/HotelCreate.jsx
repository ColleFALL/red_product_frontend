import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiImage } from "react-icons/fi";

export default function CreateHotel() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    price: "",
    currency: "",
    photo: null,
    photoPreview: "",
  });

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

  const onSubmit = (e) => {
    e.preventDefault();
    //  plus tard: appel API
    console.log("Hotel à créer:", form);
    alert("Hotel enregistré (statique). Branche l'API après.");
    navigate("/dashboard/hotels");
  };

  return (
    <div className="w-full">
      <div className="text-sm text-neutral-400 mb-3">Créer un nouveau hôtel</div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-neutral-100"
            aria-label="Retour"
          >
            <FiArrowLeft />
          </button>

          <div className="font-semibold text-neutral-700 tracking-wide text-sm">
            CRÉER UN NOUVEAU HÔTEL
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nom de l’hôtel">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="input"
                placeholder="Nom de l'hôtel"
              />
            </Field>

            <Field label="Adresse">
              <input
                name="address"
                value={form.address}
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
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="input"
                placeholder="+221..."
              />
            </Field>

            <Field label="Prix par nuit">
              <div className="relative">
                <input
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  className="input pr-16"
                  placeholder="prix"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                  {form.currency}
                </span>
              </div>
            </Field>

            <Field label="Devise">
              <select
                name="currency"
                value={form.currency}
                onChange={onChange}
                className="input"
              >
                <option value="XOF">XOF</option>
                <option value="EUR">EUR</option>
                <option value="USD">FCFA</option>
              </select>
            </Field>
          </div>

          {/* Photo */}
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

          {/* Footer button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="h-11 px-7 rounded-lg bg-black text-orange-600 text-sm hover:bg-neutral-800 transition"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      {/* Small helper styles via tailwind classes */}
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
