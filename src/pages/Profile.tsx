import { useState, useEffect } from "react";
import RenderProfileInfo from "../components/profile/renderProfileInfo";
import VenueManagerToggle from "../components/venueManagerPage/venueManagerToggle";
import Loading from "../features/loading";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";

interface Profile {
  name: string;
  venueManager: boolean;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  bio: string;
  bookings: any[];
}

function ProfilePage() {
  const [profileState, setProfileState] = useState<Profile | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    if (!username) return; // Ensure username exists before making the API call

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchData(
          `holidaze/profiles/${username}?_bookings=true`
        );

        const data = response.data;

        setProfileState(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setProfileError(true);
          setErrorMessage(
            error.message || "An error occurred while fetching data"
          );
        }
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
    <>
      <div className="mb-2 pb-2 bg-accentColor p-2">
        <h1 className="text-center text-3xl py-5 text-primary font-bold">
          Profile Page
        </h1>
      </div>
      <div className="container">
        {profileState && (
          <RenderProfileInfo
            profile={profileState}
            onToggleVenueManager={handleToggleVenueManager}
          />
        )}
      </div>
    </>
  );
}

export default ProfilePage;
