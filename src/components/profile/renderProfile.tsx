import { useState } from "react";
import venueManager from "./venueManager"; // Import the venueManager function
import DeleteVenue from "./deleteVenue";

function RenderProfile({ profile }) {
  // Use state to store and update profile data
  const [profileState, setProfileState] = useState(profile);

  const handleToggle = async () => {
    try {
      // Pass the entire profileState object to the venueManager function
      await venueManager(profileState);
      // After toggling, you might want to update the profile state in the component
      setProfileState((prevState) => ({
        ...prevState,
        venueManager: !prevState.venueManager, // Toggle the venueManager locally
      }));
    } catch (error) {
      console.error("Failed to toggle venue manager status:", error);
    }
  };

  return (
    <div className="container relative mb-[200px]">
      {/* Inline styles */}
      <div
        className="h-64 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${profileState.banner.url})` }}
        aria-label={profileState.banner.alt}
      />
      <div className="absolute top-1/2 left-0 transform grid grid-cols-3 bg-secondary p-4 rounded">
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
