import useFetchAPI from "../api/read";
import { useParams } from "react-router-dom";
import RenderProfile from "../components/profile/renderProfile";
import { GetHeaders } from "../api/headers";

function ProfilePage() {
  const { username } = useParams(); // Extract the 'id' from the route parameter

  const { data, isLoading, isError } = useFetchAPI({
    url: `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true`,
    options: {
      headers: GetHeaders("GET"),
    },
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return <RenderProfile profile={data} />;
}

export default ProfilePage;
