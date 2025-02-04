import { API_KEY } from "../vite-env.d.ts";
import { load } from "./localstorage/load.tsx";

export function GetHeaders() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };
}
