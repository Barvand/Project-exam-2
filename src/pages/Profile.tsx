import { useState, useEffect } from "react";
import GetProfile from "../api/users/getUser";
import RenderProfileInfo from "../components/profile/renderProfileInfo";
import CreateVenueForm from "../components/profile/createVenueForm";

import GetBookings from "../api/bookings/read";
import VenueManagerToggle from "../features/venueManagerToggle";
import Loading from "../features/loading";

function ProfilePage() {
  const [profileState, setProfileState] = useState(null);

  // Fetch profile data
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = GetProfile();
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = GetBookings();

  // Update profileState when profileData is available
  useEffect(() => {
    if (profileData) {
      setProfileState(profileData);
    }
  }, [profileData]);

  const handleToggleVenueManager = () => {
    VenueManagerToggle(profileState, setProfileState);
  };

  // Handle loading and error states
  if (profileLoading || bookingsLoading) {
    return <Loading />;
  }

  if (profileError || bookingsError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className="container">
      {profileState && (
        <RenderProfileInfo
          profile={profileState}
          onToggleVenueManager={handleToggleVenueManager}
        />
      )}

      {profileState?.venueManager && <CreateVenueForm />}
    </div>
  );
}

export default ProfilePage;
