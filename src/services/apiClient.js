const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

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
  localStorage.removeItem("token");
}

async function request(
  path,
  { method = "GET", body, isForm = false, auth = false } = {},
) {
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

  const ct = res.headers.get("content-type") || "";
  const raw = await res.text();
  const data = ct.includes("application/json")
    ? JSON.parse(raw || "null")
    : raw;

  if (!res.ok) {
    let errorMessage = "Erreur API";

    // Extraction intelligente des erreurs Djoser
    if (data && typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const errorContent = data[firstKey];
      errorMessage = Array.isArray(errorContent)
        ? errorContent[0]
        : data.detail || errorContent;
    } else if (typeof data === "string") {
      errorMessage = data;
    }

    const err = new Error(errorMessage);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
  form: (path, formData, opts) =>
    request(path, { ...opts, method: "POST", body: formData, isForm: true }),
  formPut: (path, formData, opts) =>
    request(path, { ...opts, method: "PUT", body: formData, isForm: true }),
};
