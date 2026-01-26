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
  const API = useMemo(
    () => API_RAW.replace(/\/+$/, "").replace(/\/api\/?$/i, ""),
    [API_RAW]
  );

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
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (form.photoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(form.photoPreview);
      }
    };
  }, [form.photoPreview]);

  // 🔹 EDIT
  useEffect(() => {
    if (!isEdit) return;

    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem("access");

        const res = await fetch(`${API}/api/hotels/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        setForm((p) => ({
          ...p,
          nom: data.nom || "",
          adresse: data.adresse || "",
          email: data.email || "",
          telephone: data.telephone || "",
          prix_par_nuit: String(data.prix_par_nuit ?? ""),
          devise: data.devise || "XOF",
          photo: null,
          photoPreview: data.photo ? `${API}${data.photo}` : "",
        }));
      } catch (e) {
        alert("Erreur chargement hôtel");
        close();
      }
    };

    fetchHotel();
  }, [id, isEdit]);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onPickPhoto = () => fileRef.current?.click();

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((p) => ({
      ...p,
      photo: file,
      photoPreview: URL.createObjectURL(file),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    const fd = new FormData();
    fd.append("nom", form.nom);
    fd.append("adresse", form.adresse);
    fd.append("email", form.email);
    fd.append("telephone", form.telephone);
    fd.append("prix_par_nuit", form.prix_par_nuit);
    fd.append("devise", form.devise);
    if (form.photo) fd.append("photo", form.photo);

    // 🔍 DEBUG (tu peux enlever après)
    for (let pair of fd.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await fetch(
      isEdit ? `${API}/api/hotels/${id}/` : `${API}/api/hotels/`,
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      }
    );

    if (!res.ok) {
      alert("Erreur création / modification hôtel");
      return;
    }

    alert(isEdit ? "Hôtel modifié !" : "Hôtel créé !");
    navigate("..");
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      <div className="absolute inset-0 flex items-center justify-center p-4 mt-5">
        <div className="w-full max-w-3xl bg-white rounded-xl border shadow-lg">
          <div className="px-5 py-4 border-b flex justify-between">
            <div className="font-semibold text-sm">
              {isEdit ? "MODIFIER L’HÔTEL" : "CRÉER UN NOUVEAU HÔTEL"}
            </div>
            <button onClick={close}>
              <FiX />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-5">
            {/* champs identiques, inchangés */}

            <input
              ref={fileRef}
              type="file"
              name="photo"          // ✅ CRITIQUE
              accept="image/*"
              className="hidden"
              onChange={onPhotoChange}
            />

            <button type="button" onClick={onPickPhoto}>
              {form.photoPreview ? (
                <img src={form.photoPreview} className="w-full h-44 object-cover" />
              ) : (
                <FiImage />
              )}
            </button>

            <div className="mt-6 flex justify-end">
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
