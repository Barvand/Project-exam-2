import { useState } from "react";
import venueManager from "./venueManager";

function RenderProfile({ profile }) {
  // Use state to store and update profile data
  const [profileState, setProfileState] = useState(profile);

  // Handle the toggle of the VenueManager status
  const handleToggle = async () => {
    try {
      // Call the venueManager function to update the profile on the backend
      const updatedProfile = await venueManager(profileState);
      // Update the state with the new profile data
      setProfileState((prevState) => ({
        ...prevState,
        venueManager: updatedProfile.venueManager,
      }));
    } catch (error) {
      console.error("Failed to toggle venue manager status:", error);
    }
  };

  return (
    <div className="container relative">
      <div
        className="h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${profileState.banner.url})` }}
        aria-label={profileState.banner.alt}
      />
      <div className="absolute top-1/2 left-0 transform grid grid-cols-3 bg-slate-400 p-4 rounded">
        <img
          className="h-64 rounded-full object-cover border-4 border-white"
          src={profileState.avatar.url}
          alt={profileState.avatar.alt}
        />
        <div className="p-5">
          <h1 className="text-5xl">{profileState.name}</h1>
          <p className="text-1xl">{profileState.bio}</p>
        </div>
        <div className="toggle">
          {profileState.venueManager ? (
            <p>Venue Manager</p>
          ) : (
            <p>Not a manager</p>
          )}
          <button className="" onClick={handleToggle}>
            Toggle
          </button>
        </div>
      </div>
    </div>
  );
}

export default RenderProfile;
