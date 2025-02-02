import VenuesPage from "./Venues";
import SearchBar from "../components/index/searchBar";

function IndexPage() {
  return (
    <>
      <div className="relative w-full h-[400px]">
        <video
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="/holidazeVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-blue-800/40">
          <h1 className="text-5xl font-bold">Welcome to Holidaze</h1>
          <h2 className="text-4xl text-primaryButton font-semibold">
            Get going, Get Holidazing
          </h2>
        </div>
      </div>

      <div className="container mt-5">
        <SearchBar />
        <VenuesPage />
      </div>
    </>
  );
}

export default IndexPage;
