import { useState } from "react";
import DeleteVenue from "../../api/venue/deleteVenue";
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

function RenderDeleteVenue({ id }: DeleteVenueProps): JSX.Element {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store error messages
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await DeleteVenue(id); 
      alert("Venue deleted successfully");
      navigate("/"); // Navigate to the home page after deletion
    } catch (error: any) {
      console.log("Error deleting venue:", error);
      setErrorMessage("Failed to delete venue. Please try again later.");
    } finally {
      setIsDeleting(false); // Reset the loading state
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isDeleting} // Disable the button while deleting
      >
        {isDeleting ? "Deleting..." : "Delete Venue"}
      </button>

      {/* Display error message if any */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}

export default RenderDeleteVenue;
