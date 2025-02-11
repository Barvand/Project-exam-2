import { useState } from "react";
import ManageVenues from "../components/venueManagerPage/ManageVenues";
import CreateVenueForm from "../components/venueManagerPage/createVenueForm";
import Modal from "../components/modals/Modal";

function VenueManagerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container">
      <ManageVenues />

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
  );
}

export default VenueManagerPage;
