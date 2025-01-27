import React, { useState } from "react";
import Delete from "../../api/delete";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

interface DeleteVenueProps {
  id: string;
}

/**
 * Deletes a venue based on the provided venue ID.
 * Once the venue is deleted, it navigates the user to the home page.
 *
 * @param {Object} props - The props object passed to the component.
 * @param {string} props.id - The ID of the venue to be deleted.
 * 
 * @returns {JSX.Element} - Returns a button element that triggers the venue deletion when clicked.
 */

function DeleteVenue({ id }: DeleteVenueProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // Set the state to show a loading indicator
      await Delete({ id }); // Call the deleteVenue function with the venue ID
      alert("Venue deleted successfully"); // Optionally show a success message
      // Optionally update the UI to reflect the deleted venue (e.g., remove from list)
    } catch (error) {
      alert("Failed to delete venue: " + error.message); // Show an error message if it fails
    } finally {
      setIsDeleting(false); // Reset the loading state
      navigate("/"); // Navigate to the desired page (home, for example)
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting} // Disable the button while deleting
    >
      {isDeleting ? "Deleting..." : "Delete Venue"}
    </button>
  );
}

export default DeleteVenue;