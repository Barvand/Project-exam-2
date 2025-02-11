import { GetHeaders } from "./headers";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any,
  customHeaders?: HeadersInit // Optional custom headers
) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze${endpoint}`,
      {
        method,
        headers: customHeaders || GetHeaders(), // Use provided headers or default ones
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while fetching data"
      );
    }
    return data;
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
