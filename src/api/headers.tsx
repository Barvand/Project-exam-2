const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey);
import { load } from "./localstorage/load.tsx";

export function GetHeaders() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  };
}
