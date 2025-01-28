import VenuesPage from "./Venues";
import SearchBar from "../components/index/searchBar";

function IndexPage() {
 

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="flex flex-col">
            <div className="h-96 text-center flex flex-col justify-center gap-5">
              <h1 className="text-5xl text-bold"> Welcome to Holidaze </h1>
              <h2 className="text-4xl text-primaryButton text-bold">
                Get going, Get Holidazing
              </h2>
            </div>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <VenuesPage />
      </div>
    </>
  );
}

export default IndexPage;
