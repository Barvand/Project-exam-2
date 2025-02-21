import { useState, useEffect } from "react";
import RenderProfileInfo from "../components/profile/renderProfileInfo";
import VenueManagerToggle from "../components/venueManagerPage/venueManagerToggle";
import Loading from "../features/loading";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";
import { Helmet } from "react-helmet-async";
import InformationIcon from "../features/icons/Information";
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

  const handleToggleVenueManager = async () => {
    if (!profileState) return;

    await VenueManagerToggle(profileState, setProfileState);

    // Force re-render by updating state with a new object reference
    setProfileState((prev) => (prev ? { ...prev } : null));
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
      <Helmet>
        <title>Holidaze - Profile Page </title>
        <meta
          name="description"
          content="Profile page, update profile, edit, banner, avatar, bio, venueManager"
        />
      </Helmet>
      <div className="">
        <div className="mb-2 pb-2 bg-accentColor p-4">
          <h1 className="text-center text-3xl py-5 text-primary font-bold">
            Your Profile
          </h1>
        </div>
      </div>
      <div className="container px-3">
        <div className="text-white bg-primary font-bold py-4 p-2 my-5 flex gap-2 items-center">
          <InformationIcon />
          <h2 className="text-sm sm:text-md">
            Here you can update your profile. Update your banner, avatar, bio.
            And do not forget to the Venue Manager feature.
          </h2>
        </div>
        <div className="container">
          {profileState && (
            <RenderProfileInfo
              profile={profileState}
              onToggleVenueManager={handleToggleVenueManager}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
