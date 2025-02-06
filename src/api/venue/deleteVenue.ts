import { apiRequest } from "../fetchAPI";

export default async function deleteVenue(id: string) {
  try {
    const response = await apiRequest(`/venues/${id}?_owner=true`, "DELETE");

    if (response === null || !response) {
      return { success: true }; // Successfully deleted without any response body
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}
