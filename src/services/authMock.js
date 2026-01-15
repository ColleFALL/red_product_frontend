export async function mockLogin({ email, password }) {
  // simulation délai
  await new Promise((r) => setTimeout(r, 500));

  if (!email || !password) {
    throw new Error("Veuillez remplir email et mot de passe.");
  }

  // faux token + user
  return {
    token: "mock-token-123",
    user: { fullName: "Demo User", email },
  };
}

export async function mockRegister({ fullName, email, password }) {
  await new Promise((r) => setTimeout(r, 500));

  if (!fullName || !email || !password) {
    throw new Error("Veuillez remplir tous les champs.");
  }

  return {
    token: "mock-token-123",
    user: { fullName, email },
  };
}
