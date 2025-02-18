import { FaCamera } from "react-icons/fa";

function ProfileAvatar({
  profile,
  localStorageName,
  setState,
  state,
  onChange,
  onSubmit,
}) {
  return (
    <div>
      {/* Avatar with edit option */}
      <div className="p-5 rounded border items-center flex justify-center shadow-md flex-col relative">
        <img
          className="h-32 w-32 sm:h-64 sm:w-64 rounded-full object-cover border-4 border-white shadow-lg"
          src={profile.avatar.url}
          alt={profile.avatar.alt}
        />

        {/* Camera icon on top of the image */}
        {localStorageName === profile.name && (
          <div
            onClick={() => setState(!state)}
            className="absolute rounded-full p-2 right-2 bottom-2 cursor-pointer border border-black bg-primary hover:bg-secondary hover:border-white"
          >
            <FaCamera className="text-2xl text-white" />
          </div>
        )}
      </div>
      {state && localStorageName === profile.name && (
        <div className="flex flex-col w-full">
          <input
            type="text"
            onChange={(e) => onChange(e, "avatar")}
            className="p-2 border rounded"
            placeholder="Enter an image url"
          />
          <button
            onClick={() => {
              onSubmit(); // Call the onSubmit function
              setState(!state); // Toggle the state
            }}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileAvatar;
