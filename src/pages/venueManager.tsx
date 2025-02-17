import CreateVenueForm from "../components/venueManagerPage/createVenueForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";
import Modal from "../components/modals/Modal";
import RenderManagerVenues from "../components/venueManagerPage/RenderVenues";
import Loading from "../features/loading";
function VenueManagerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const [venues, setVenues] = useState([]); // Store multiple venues
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>([]);


  // Fetch profile data
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetchData(`holidaze/profiles/${username}`);
        setProfile(response.data); // Store profile data
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    fetchProfiles();
  }, [username]);

  // Fetch venue data
  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetchData(
          `holidaze/profiles/${username}/venues/?_bookings?_venues`
        );
        setVenues(response.data); // Store venue data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [username]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg absolute bottom-[200px] right-[10px]">
          {error || "Error loading data. Please try again later."}
        </div>
      </div>
    );
  }

  return (
    <>
      {profile.venueManager ? (
        <div className="container">
          <RenderManagerVenues venues={venues} userName={username} />

          <h2 className="text-xl transition-all duration-300">
            Would you like to add your own venue?
          </h2>

          {/* Button to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Venue
          </button>

          {/* Modal Component */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create a New Venue"
          >
            <div className="container">
              <CreateVenueForm />
            </div>
          </Modal>
        </div>
      ) : (
        <h1 className="text-2xl text-center">
          You are not a venue manager, please visit your profile page to become
          one
        </h1>
      )}
      {error}
    </>
  );
}

export default VenueManagerPage;
