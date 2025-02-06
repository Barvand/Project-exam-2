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

    if (!response.ok) {
      // Try to parse the error message from the response
      let errorMessage = "Something went wrong.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.errors?.[0]?.message || errorMessage;
      } catch (parseError) {
        // If parsing fails, errorMessage remains unchanged
      }
      throw new Error(errorMessage);
    }

    // Handle 204 No Content response
    if (response.status === 204) {
      return { success: true }; // Indicate success without data
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in ${method} ${endpoint}:`, error);
    throw error; // Rethrow the error for handling in the calling function
  }
}
