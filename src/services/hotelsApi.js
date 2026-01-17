// const API = import.meta.env.VITE_API_URL; // ex: https://.../api
// const token = () => localStorage.getItem("token");

// const authHeader = () => ({
//   Authorization: `Bearer ${token()}`,
// });

// // ✅ LIST (avec search/order possible)
// export async function getHotels({ search = "", ordering = "" } = {}) {
//   const qs = new URLSearchParams();
//   if (search) qs.set("search", search);
//   if (ordering) qs.set("ordering", ordering); // ex: "-created_at" ou "prix_par_nuit"

//   const res = await fetch(`${API}/hotels/?${qs.toString()}`, {
//     headers: { ...authHeader() },
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.detail || "Erreur API");
//   return data; // peut être {count, results} si pagination activée
// }

// export async function getHotel(id) {
//   const res = await fetch(`${API}/hotels/${id}/`, {
//     headers: { ...authHeader() },
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data?.detail || "Erreur API");
//   return data;
// }

// // ✅ CREATE (multipart)
// export async function createHotel(payload) {
//   const fd = new FormData();
//   fd.append("nom", payload.nom);
//   fd.append("adresse", payload.adresse);
//   fd.append("email", payload.email || "");
//   fd.append("telephone", payload.telephone || "");
//   fd.append("prix_par_nuit", payload.prix_par_nuit);
//   fd.append("devise", payload.devise);
//   fd.append("photo", payload.photo); // File obligatoire

//   const res = await fetch(`${API}/hotels/`, {
//     method: "POST",
//     headers: { ...authHeader() }, // ⚠️ pas Content-Type ici
//     body: fd,
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(JSON.stringify(data));
//   return data;
// }

// // ✅ UPDATE (multipart) : PATCH recommandé (photo optionnelle)
// export async function updateHotel(id, payload) {
//   const fd = new FormData();
//   if (payload.nom !== undefined) fd.append("nom", payload.nom);
//   if (payload.adresse !== undefined) fd.append("adresse", payload.adresse);
//   if (payload.email !== undefined) fd.append("email", payload.email || "");
//   if (payload.telephone !== undefined) fd.append("telephone", payload.telephone || "");
//   if (payload.prix_par_nuit !== undefined) fd.append("prix_par_nuit", payload.prix_par_nuit);
//   if (payload.devise !== undefined) fd.append("devise", payload.devise);
//   if (payload.photo) fd.append("photo", payload.photo); // seulement si modifiée

//   const res = await fetch(`${API}/hotels/${id}/`, {
//     method: "PATCH",
//     headers: { ...authHeader() },
//     body: fd,
//   });

//   const data = await res.json();
//   if (!res.ok) throw new Error(JSON.stringify(data));
//   return data;
// }

// export async function deleteHotel(id) {
//   const res = await fetch(`${API}/hotels/${id}/`, {
//     method: "DELETE",
//     headers: { ...authHeader() },
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     throw new Error(data?.detail || "Erreur suppression");
//   }
//   return true;
// }
const BASE = (import.meta.env.VITE_API_URL || "https://red-product-backend-eymz.onrender.com")
  .replace(/\/+$/, "");

const API = `${BASE}/api`; // ✅ ajoute /api une seule fois

const token = () => localStorage.getItem("access"); // ✅ JWT access

const authHeader = () => ({
  Authorization: `Bearer ${token()}`,
});

// ✅ LIST
export async function getHotels({ search = "", ordering = "" } = {}) {
  const qs = new URLSearchParams();
  if (search) qs.set("search", search);
  if (ordering) qs.set("ordering", ordering);

  const res = await fetch(`${API}/hotels/?${qs.toString()}`, {
    headers: authHeader(),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || "Erreur API");

  return data; // array ou {results: []}
}

export async function getHotel(id) {
  const res = await fetch(`${API}/hotels/${id}/`, {
    headers: authHeader(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || "Erreur API");
  return data;
}

// ✅ CREATE (multipart)
export async function createHotel(payload) {
  const fd = new FormData();
  fd.append("nom", payload.nom);
  fd.append("adresse", payload.adresse);
  fd.append("email", payload.email || "");
  fd.append("telephone", payload.telephone || "");
  fd.append("prix_par_nuit", payload.prix_par_nuit);
  fd.append("devise", payload.devise);
  if (payload.photo) fd.append("photo", payload.photo);

  const res = await fetch(`${API}/hotels/`, {
    method: "POST",
    headers: authHeader(), // ✅ pas Content-Type
    body: fd,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || JSON.stringify(data));
  return data;
}

