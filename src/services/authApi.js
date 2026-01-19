import { api, setToken } from "./apiClient";

export async function loginApi({ email, password, remember }) {
  const res = await api.post(
    "/api/auth/login/",
    { email, password, remember },
    { auth: false }
  );

  // Attendu: { success, message, data: { access, refresh, admin } }
  const access = res?.data?.data?.access;
  const refresh = res?.data?.data?.refresh;

  if (!access) throw new Error("Token access manquant dans la réponse API.");

  setToken(access, refresh);
  return res.data; // ✅ retourne directement les données
}

export async function registerApi({ name, email, password, accept }) {
  return api.post("/api/auth/register/", { name, email, password, accept }, { auth: false });
}

export async function forgotPasswordApi(email) {
  return api.post("/api/auth/forgot-password/", { email }, { auth: false });
}

export async function meApi() {
  return api.get("/api/auth/me/", { auth: true });
}
