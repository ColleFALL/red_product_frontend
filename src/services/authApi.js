import { api, setToken } from "./apiClient";

/**
 * Login avec Djoser JWT
 */
export async function loginApi({ email, password, remember }) {
  const response = await api.post(
    "/api/auth/jwt/create/",
    { email, password },
    { auth: false }
  );

  const { access, refresh } = response || {};

  if (!access) {
    throw new Error("Token access manquant dans la réponse API.");
  }

  setToken(access, refresh);

  if (remember) {
    localStorage.setItem("rememberMe", "true");
  }

  return response;
}

/**
 * Register avec Djoser
 */
export async function registerApi({ name, email, password, accept }) {
  if (!accept) {
    throw new Error("Vous devez accepter les termes et conditions.");
  }

  const response = await api.post(
    "/api/auth/users/",
    {
      email,
      name,
      password,
      re_password: password,
    },
    { auth: false }
  );

  return response;
}

/**
 * Activer le compte
 */
export async function activateAccountApi({ uid, token }) {
  // ✅ On encode le token pour éviter les problèmes de caractères spéciaux (=, +, /)
  const token_encoded = encodeURIComponent(token);

  const response = await api.post(
    "/api/auth/users/activation/",
    { uid, token: token_encoded },
    { auth: false }
  );

  return response;
}

/**
 * Renvoyer l'email d'activation
 */
export async function resendActivationApi(email) {
  const response = await api.post(
    "/api/auth/users/resend_activation/",
    { email },
    { auth: false }
  );

  return response;
}

/**
 * Récupérer le profil utilisateur
 */
export async function meApi() {
  const response = await api.get("/api/auth/users/me/", { auth: true });
  return response;
}

/**
 * Forgot Password
 */
export async function forgotPasswordApi(email) {
  const response = await api.post(
    "/api/auth/users/reset_password/",
    { email },
    { auth: false }
  );

  return response;
}

/**
 * Reset Password
 */
export async function resetPasswordApi({ uid, token, new_password }) {
  const token_encoded = encodeURIComponent(token);

  const response = await api.post(
    "/api/auth/users/reset_password_confirm/",
    { uid, token: token_encoded, new_password },
    { auth: false }
  );

  return response;
}
