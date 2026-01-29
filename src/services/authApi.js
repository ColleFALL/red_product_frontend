
import { api, setToken } from "./apiClient";

/**
 * Login avec Djoser JWT
 */
export async function loginApi({ email, password, remember }) {
  const data = await api.post(
    "/api/auth/jwt/create/",
    { email, password },
    { auth: false }
  );

  const access = data?.access;
  const refresh = data?.refresh;

  if (!access) {
    throw new Error("Token access manquant dans la réponse API.");
  }

  setToken(access, refresh);
  
  if (remember) {
    localStorage.setItem("rememberMe", "true");
  }

  return data;
}

/**
 * Register avec Djoser
 */
export async function registerApi({ name, email, password, accept }) {
  if (!accept) {
    throw new Error("Vous devez accepter les termes et conditions.");
  }

  const data = await api.post(
    "/api/auth/users/",
    {
      email,
      name,
      password,
      re_password: password,
    },
    { auth: false }
  );

  return data;
}

/**
 * Activer le compte
 */
export async function activateAccountApi({ uid, token }) {
  const data = await api.post(
    "/api/auth/users/activation/",
    { uid, token },
    { auth: false }
  );

  return data;
}

/**
 * Renvoyer l'email d'activation
 */
export async function resendActivationApi(email) {
  const data = await api.post(
    "/api/auth/users/resend_activation/",
    { email },
    { auth: false }
  );

  return data;
}

/**
 * Récupérer le profil utilisateur
 */
export async function meApi() {
  return api.get("/api/auth/users/me/", { auth: true });
}

/**
 * Forgot Password
 */
export async function forgotPasswordApi(email) {
  return api.post(
    "/api/auth/users/reset_password/",
    { email },
    { auth: false }
  );
}

/**
 * Reset Password
 */
export async function resetPasswordApi({ uid, token, new_password }) {
  return api.post(
    "/api/auth/users/reset_password_confirm/",
    { uid, token, new_password },
    { auth: false }
  );
}
