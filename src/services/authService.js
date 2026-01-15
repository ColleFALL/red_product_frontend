import { mockLogin, mockRegister } from "./authMock";
import { login, register } from "./authApi"; // future API réelle

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === "true";

export async function authLogin(data) {
  return USE_MOCK ? mockLogin(data) : login(data);
}

export async function authRegister(data) {
  return USE_MOCK ? mockRegister(data) : register(data);
}
