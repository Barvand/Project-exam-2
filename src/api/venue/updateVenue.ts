import { apiRequest } from "../fetchAPI";

export async function updateVenue(id: string, body: object) {
  try {
    const response = await apiRequest(
      `holidaze/venues/${id}?_owner=true`,
      "PUT",
      body
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
