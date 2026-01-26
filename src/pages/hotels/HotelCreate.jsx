

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiX, FiImage } from "react-icons/fi";

export default function HotelCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const fileRef = useRef(null);

  const API_RAW =
    import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com";
  const API = useMemo(() => API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, ""), [API_RAW]);

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

  const close = () => navigate("..");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      if (form.photoPreview) URL.revokeObjectURL(form.photoPreview);
    };
  }, [form.photoPreview]);

  // ✅ Edit: pré-remplir depuis l’API
 useEffect(() => {
  if (!isEdit) return;

  const fetchHotel = async () => {
    try {
      const token = localStorage.getItem("access");
      if (!token) throw new Error("Non connecté : token manquant.");

      const res = await fetch(`${API}/api/hotels/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const ct = res.headers.get("content-type") || "";
      const raw = await res.text();
      const data = ct.includes("application/json") ? JSON.parse(raw || "null") : raw;

      if (!res.ok) {
        const msg =
          typeof data === "string"
            ? data.slice(0, 200)
            : data?.detail || JSON.stringify(data).slice(0, 200);
        throw new Error(`Erreur API (${res.status}) : ${msg}`);
      }

      // ✅ uniquement localstorage / serveur
      const preview =
        typeof data?.photo === "string"
          ? data.photo.startsWith("http")
            ? data.photo
            : `${API}${data.photo}`
          : "";

      setForm((p) => ({
        ...p,
        nom: data?.nom || "",
        adresse: data?.adresse || "",
        email: data?.email || "",
        telephone: data?.telephone || "",
        prix_par_nuit: String(data?.prix_par_nuit ?? ""),
        devise: data?.devise || "XOF",
        photo: null,
        photoPreview: preview,
      }));
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur chargement hôtel.");
      close();
    }
  };

  fetchHotel();
  // eslint-disable-next-line
}, [isEdit, id]);


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
      const token = localStorage.getItem("access");
      if (!token) {
        alert("Access token introuvable. Reconnecte-toi.");
        return;
      }

      const fd = new FormData();
      fd.append("nom", form.nom);
      fd.append("adresse", form.adresse);
      fd.append("email", form.email);
      fd.append("telephone", form.telephone);
      fd.append("prix_par_nuit", form.prix_par_nuit);
      fd.append("devise", form.devise);
      if (form.photo) fd.append("photo", form.photo);

      const url = isEdit ? `${API}/api/hotels/${id}/` : `${API}/api/hotels/`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const ct = res.headers.get("content-type") || "";
      const raw = await res.text();
      const data = ct.includes("application/json") ? JSON.parse(raw || "null") : raw;

      if (res.status === 401) {
        throw new Error("401: access expiré. Reconnecte-toi.");
      }
      if (!res.ok) {
        const msg =
          typeof data === "string"
            ? data.slice(0, 200)
            : data?.detail || JSON.stringify(data).slice(0, 200);
        throw new Error(`Erreur API (${res.status}) : ${msg}`);
      }

      alert(isEdit ? "Hôtel modifié !" : "Hôtel créé !");
      navigate("..");
    } catch (err) {
      console.error(err);
      alert(err.message || (isEdit ? "Erreur modification hôtel." : "Erreur création hôtel."));
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 mt-5">
        <div className="w-full max-w-3xl bg-white border border-neutral-200 rounded-xl shadow-lg overflow-hidden">
          {/* header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="font-semibold text-neutral-700 tracking-wide text-sm">
              {isEdit ? "MODIFIER L’HÔTEL" : "CRÉER UN NOUVEAU HÔTEL"}
            </div>

            <button
              type="button"
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
                <select name="devise" value={form.devise} onChange={onChange} className="input">
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
                  <img src={form.photoPreview} alt="Preview" className="w-full h-full object-cover" />
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
                className="h-11 px-6 rounded-lg border border-neutral-200 bg-neutral-800 text-white text-sm hover:bg-neutral-800 transition"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="h-11 px-7 rounded-lg bg-neutral-800 text-white text-sm hover:bg-neutral-800 transition"
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

