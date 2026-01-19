import { api, setToken } from "./apiClient";

export async function loginApi({ email, password, remember }) {
  const data = await api.post(
    "/api/auth/login",
    { email, password, remember },
    { auth: false }
  );

  // adapte selon ta réponse backend (voir ci-dessous)
  const access = data?.data?.access ?? data?.access;
  const refresh = data?.data?.refresh ?? data?.refresh;

  if (!access) throw new Error("Token access manquant dans la réponse API.");

  setToken(access, refresh);
  return data;
}

export async function registerApi({ name, email, password, accept }) {
  return api.post("/api/auth/register", { name, email, password, accept }, { auth: false });
}

export async function forgotPasswordApi(email) {
  return api.post("/api/auth/forgot-password", { email }, { auth: false });
}

export async function resetPasswordApi(payload) {
  return api.post("/api/auth/reset-password", payload, { auth: false });
}

export async function meApi() {
  return api.get("/api/auth/me", { auth: true });
}
