// Base API URL
export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_REGISTER = "/auth/register";
export const API_LOGIN = "/auth/login";
export const API_BOOKINGS = "/holidaze/bookings";
export const API_VENUES = "/holidaze/venues";
import { GetHeaders } from "./headers";

// GET request
export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: GetHeaders(),
    });

    // Check if response is ok and ensure it's a JSON response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // Gracefully handle cases where response is not JSON
      const errorMessage =
        errorData.errors?.[0]?.message ||
        "An error occurred while fetching data";
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
}

// POST request
export async function postData(endpoint: string, formData: object) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: GetHeaders(),
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while fetching data"
      );
    }

    return data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}

export async function updateData(endpoint: string, data: object) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: GetHeaders(),
      body: JSON.stringify(data),
    });

    // If the response is not ok, try to parse the error message
    const responseData = await response.json(); // This will contain error details in case of failure
    if (!response.ok) {
      throw new Error(
        responseData.errors?.[0]?.message ||
          "An error occurred while fetching data"
      );
    }

    // Return the updated data if the response is successful
    return responseData;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Rethrow the error for further handling (e.g., in your component)
  }
}

// DELETE request
export async function deleteData(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: GetHeaders(),
    });

    if (response.status === 204) {
      return {}; // Return an empty object or handle it as needed
    }

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        responseData.errors?.[0]?.message ||
          "An error occurred while fetching data"
      );
    }

    return responseData;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}
