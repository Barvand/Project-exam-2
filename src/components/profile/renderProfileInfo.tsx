import React from "react";

// Define types for the profile data
interface Profile {
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  name: string;
  bio: string;
  venueManager: boolean;
}

// Define types for the props
interface RenderProfileInfoProps {
  onToggleVenueManager: () => void; // Assuming this is a function that toggles venue manager status
  profile: Profile;
}

const RenderProfileInfo: React.FC<RenderProfileInfoProps> = ({
  profile,
  onToggleVenueManager,
}) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Banner with shadow effect */}
      <div
        className="h-64 w-full bg-cover bg-center drop-shadow-md"
        style={{ backgroundImage: `url(${profile.banner.url})` }}
        aria-label={profile.banner.alt}
      />

      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 transform py-2 rounded">
          {/* Avatar with shadow effect */}
          <div className="grid-col-1 p-5 rounded bg-customPurple-200 border-customPurple-300 border items-center flex justify-center shadow-md">
            <img
              className="h-64 w-64 rounded-full object-cover border-4 border-white shadow-lg"
              src={profile.avatar.url}
              alt={profile.avatar.alt}
            />
          </div>

          {/* Profile Info with shadow effect */}
          <div className="p-5 bg-customPurple-300 border-customPurple-300 border rounded shadow-md">
            <h1 className="text-5xl text-customPurple-950">{profile.name}</h1>
            <p className="text-1xl">{profile.bio}</p>
          </div>

          {/* Venue Manager Toggle with shadow effect */}
          <div className="toggle bg-customPurple-400 border-customPurple-300 rounded flex flex-col justify-evenly gap-2 p-5 shadow-md">
            {profile.venueManager ? (
              <div className="text-center flex flex-col">
                <h2 className="text-2xl text-customPurple-950">
                  You are a Venue Manager
                </h2>
                <button
                  className="btn border-customPurple-800 border rounded p-2 bg-customPurple-800 text-customPurple-200 font-bold shadow-md"
                  onClick={onToggleVenueManager}
                >
                  Click here
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-5">
                <h2 className="text-2xl">
                  Want to host your own properties? Become a venue manager now!
                </h2>
                <button
                  className="btn border-customPurple-800 border rounded p-2 bg-customPurple-800 text-customPurple-200 font-bold shadow-md"
                  onClick={onToggleVenueManager}
                >
                  Click here
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderProfileInfo;
