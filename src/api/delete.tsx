import { GetHeaders } from "./headers";

interface DeleteProps { 
  id: string; 
}

async function Delete({ id }: DeleteProps) {
  if (!id) {
    console.error("Error: Venue ID is required.");
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/holidaze/venues/${id}`,
      {
        method: "DELETE",
        headers: GetHeaders("DELETE"),
      }
    );

    if (response.status === 204) {
      console.log("Venue successfully deleted.");
    } else {
      throw new Error(`Failed to delete venue: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}

export default Delete;
