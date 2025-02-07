import { useState, useEffect } from "react";
import { apiRequest } from "../api/fetchAPI";
import RenderProfileInfo from "../components/profile/renderProfileInfo";
import VenueManagerToggle from "../features/venueManagerToggle";
import Loading from "../features/loading";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const [profileState, setProfileState] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [profileError, setProfileError] = useState(false); // Track error state

  const { username } = useParams();

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true); // Set loading to true before making the request
        const data = await apiRequest(`/profiles/${username}`, "GET"); // Adjust endpoint as needed
        setProfileState(data); // Set profile state when data is fetched successfully
      } catch (error) {
        setProfileError(true); // Set error state if an error occurs
        setErrorMessage(
          error.message || "An error occurred while fetching data"
        ); // Set the error message
      } finally {
        setIsLoading(false); // Set loading to false after request finishes
      }
    };

    fetchProfileData(); // Call the function to fetch profile data
  }, []); // Empty dependency array ensures it runs only once when component mounts

  const handleToggleVenueManager = () => {
    VenueManagerToggle(profileState, setProfileState);
  };

  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (profileError) {
    return (
      <div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          {errorMessage || "Error loading data. Please try again later."}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {profileState && (
        <RenderProfileInfo
          profile={profileState}
          onToggleVenueManager={handleToggleVenueManager}
        />
      )}
    </div>
  );
}

export default ProfilePage;
