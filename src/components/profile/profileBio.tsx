import { FaPencilAlt } from "react-icons/fa";

function ProfileBio({
  profile,
  localStorageName,
  setState,
  state,
  onChange,
  onSubmit,
}) {
  return (
    <>
      <div className="p-5 border rounded shadow-md">
        {state ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={onChange}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Enter bio"
          />
        ) : (
          <>
            <h1 className="text-5xl text-customPurple-950">{profile.name}</h1>
            <p className="text-1xl">{profile.bio}</p>
          </>
        )}
        {/* Toggle Edit Mode and Save */}
        {localStorageName === profile.name && (
          <div className="flex justify-between p-4">
            <button
              onClick={() => setState(!state)}
              className={`bg-primary text-white rounded-full p-3 border hover:border-white hover:bg-secondary ${
                state
                  ? "py-2 px-6 rounded-lg bg-indigo-600 text-white border-none"
                  : ""
              }`}
            >
              {state ? "Cancel" : <FaPencilAlt />}
            </button>
            {state && localStorageName === profile.name && (
              <button
                onClick={onSubmit}
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
              >
                Save Changes
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileBio;
