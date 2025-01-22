import { useState, useEffect } from "react";
import { GetHeaders } from "../api/headers";
import { useParams } from "react-router-dom";
import RenderProfile from "../components/profile/renderProfile";


function ProfilePage() {
  const [data, setData] = useState([]); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const [page, setPage] = useState(1);

  const { username } = useParams<{ username: string }>(); // Get username from URL
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings/`,
          {
            headers: GetHeaders("GET"),
          }
        );
        const result = await response.json();
        const data = result.data;
        setData(data); // Set the fetched data
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchProfileData();
  }, [page]);

  // Loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
   <RenderProfile profile={data}/> 
  );
}

export default ProfilePage;
