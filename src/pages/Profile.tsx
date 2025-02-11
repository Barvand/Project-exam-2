import { useState, useEffect } from "react";
import RenderProfileInfo from "../components/profile/renderProfileInfo";
import VenueManagerToggle from "../components/venueManagerPage/venueManagerToggle";
import Loading from "../features/loading";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";

function ProfilePage() {
  const [profileState, setProfileState] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [profileError, setProfileError] = useState(false); // Track error state

  const { username } = useParams();

  useEffect(() => {
    if (!username) return;

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData(
          `holidaze/profiles/${username}?_bookings=true`
        );

        const data = response.data;

        setProfileState(data);
      } catch (error) {
        setProfileError(true);
        setErrorMessage(
          error.message || "An error occurred while fetching data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleToggleVenueManager = () => {
    if (profileState) {
      VenueManagerToggle(profileState, setProfileState);
    }
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
