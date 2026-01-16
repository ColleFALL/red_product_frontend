const BASE_URL = import.meta.env.VITE_API_URL; // ex: https://...onrender.com/api

if (!BASE_URL) {
  // Ça aide à détecter un oubli de variable d'environnement
  console.log("API BASE URL =", import.meta.env.VITE_API_URL);

  console.log("🚀 BASE_URL =", BASE_URL);
}

export function getToken() {
  return localStorage.getItem("access") || localStorage.getItem("token");
}

export function setToken(access, refresh = null) {
  localStorage.setItem("access", access);
  if (refresh) localStorage.setItem("refresh", refresh);
}

export function clearToken() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("token"); // si tu l’utilisais avant
}

async function request(path, { method = "GET", body, isForm = false, auth = false } = {}) {
  const headers = {};

  if (!isForm) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message ||
      data?.detail ||
      (typeof data === "string" ? data : null) ||
      "Erreur API";
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
  form: (path, formData, opts) => request(path, { ...opts, method: "POST", body: formData, isForm: true }),
  formPut: (path, formData, opts) => request(path, { ...opts, method: "PUT", body: formData, isForm: true }),
};
