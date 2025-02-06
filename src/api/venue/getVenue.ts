import { apiRequest } from "../fetchAPI";

async function getVenue(id: string) {
  try {
    const response = await apiRequest(`/venues/${id}?_owner=true`);
    return response.data; // Return the data if the request is successful
  } catch (error) {
    console.error("Error fetching venue:", error);
    throw error;
  }
}

export default getVenue;
