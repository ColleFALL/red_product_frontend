import { api, setToken } from "./apiClient";

export async function loginApi({ email, password, remember }) {
  const res = await api.post("/auth/login", { email, password, remember }, { auth: false });

  // backend: { success, message, data: { access, refresh, admin } }
  const access = res?.data?.access;
  const refresh = res?.data?.refresh;

  if (!access) throw new Error("Token access manquant dans la réponse API.");

  setToken(access, refresh);
  return res;
}

export async function registerApi({ name, email, password, accept }) {
  return api.post("/auth/register", { name, email, password, accept }, { auth: false });
}

export async function forgotPasswordApi(email) {
  return api.post("/auth/forgot-password", { email }, { auth: false });
}

export async function meApi() {
  return api.get("/auth/me", { auth: true });
}
