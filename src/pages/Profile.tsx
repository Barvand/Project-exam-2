import { useMemo } from "react";
import useFetchAPI from "../api/read";
import { useParams } from "react-router-dom";
import RenderProfile from "../components/profile/renderProfile";
import { GetHeaders } from "../api/headers";
import CreatePostForm from "../components/profile/createVenue";
import BookingsByUser from "../components/profile/BookingsByUser";
import SideMenu from "../components/profile/sideMenu";

function ProfilePage() {
  const { username } = useParams(); // Extract the 'username' from the route parameter

  // Memoize headers to avoid recalculating them on every render
  const headers = useMemo(() => GetHeaders("GET"), []); // Empty array to memoize once

  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`,
    options: {
      method: "GET",
      headers, // Use memoized headers
    },
  });

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div>
      <SideMenu />
      <div className="header">
        <RenderProfile profile={data} />;
      </div>

      <BookingsByUser username={data.name}/>
      <div className="container">
        <h1 className="text-5xl"> Venue manager only </h1>
        <CreatePostForm />
      </div>
    </div>
  );
}

export default ProfilePage;
