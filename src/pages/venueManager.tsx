import CreateVenueForm from "../components/venueManagerPage/createVenueForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../api/api";
import Modal from "../components/modals/Modal";
import RenderVenueBookings from "../components/venueManagerPage/RenderVenueBookings";
import Loading from "../features/loading";
import { Helmet } from "react-helmet-async";
import InformationIcon from "../features/icons/Information";
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
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
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
      <Helmet>
        <title>Holidaze - Venue Manager Page </title>
        <meta
          name="description"
          content="Venue Manager page, update venues, list venues, venues, money, manager"
        />
      </Helmet>
      <div className="">
        <div className="mb-2 pb-2 bg-accentColor p-4">
          <h1 className="text-center text-3xl py-5 text-primary font-bold">
            Venue Manager
          </h1>
        </div>
      </div>
      <div className="container px-3">
        <div className="text-white bg-primary font-bold py-4 p-2 my-5 flex gap-2 items-center">
          <InformationIcon />
          <h2 className="text-sm sm:text-md">
            On the venue manager page, you are able to list a venue, update and
            delete. Most importantly, you are able to see who booked your venue
            and when their reservation is. All information is displayed per
            venue.
          </h2>
        </div>
      </div>
      {profile.venueManager ? (
        <div className="container flex flex-col gap-2 p-4">
          <RenderVenueBookings data={venues} />

          <div className="">
            <h2 className="text-xl transition-all duration-300">
              Would you like to add a venue?
            </h2>
          </div>

          {/* Button to open modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded mt-2 self-start"
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
        <div className="container p-1">
          <h1 className="text-2xl text-center">
            You are not a venue manager, please visit your profile page to
            become one
          </h1>
        </div>
      )}
      {error}
    </>
  );
}

export default VenueManagerPage;
