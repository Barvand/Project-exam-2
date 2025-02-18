import { GiVerticalBanner } from "react-icons/gi";

function ProfileBanner({
  profile,
  localStorageName,
  setState,
  state,
  onChange,
  onSubmit,
}) {
  return (
    <>
      <div
        className="h-64 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${profile.banner.url})` }}
        aria-label={profile.banner.alt}
      >
        {localStorageName === profile.name && (
          <div
            onClick={() => setState(!state)}
            className="bg-white absolute rounded-full p-2 right-0 top-0 cursor-pointer m-2"
          >
            <GiVerticalBanner className="text-3xl" />
          </div>
        )}
      </div>
      {state && localStorageName === profile.name && (
        <div className="flex flex-col">
          <input
            type="text"
            value={profile.banner.url}
            onChange={(e) => onChange(e, "banner")}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter banner image URL"
          />
          <button
            onClick={() => {
              onSubmit(); // Call the onSubmit function
              setState(!state); // Toggle the state
            }}
            className="p-2 bg-blue-500 text-white rounded self-start"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileBanner;
