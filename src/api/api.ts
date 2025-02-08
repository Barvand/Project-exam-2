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

    const data = await response.json();

    console.log(data);
    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while fetching data"
      );
    }
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

export async function updateData(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: GetHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while fetching data"
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

// DELETE request
export async function deleteData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: GetHeaders(),
    });
    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while fetching data"
      );
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}
