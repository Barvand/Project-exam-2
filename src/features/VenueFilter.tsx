import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function VenueFilters({
  activeSort,
  sortOrder,
  changeSortBy,
  limit,
  changeLimit,
}) {
  return (
    <div className="mb-10 pb-5 border-b">
      <h1 className="text-4xl py-2"> Find your dream destination! </h1>
  
      {/* Sort By Buttons */}
      <button
        className={`border py-1 px-5 rounded bg-primary mr-2 ${
          activeSort === "name" ? "bg-blue-500 text-white" : "bg-primary"
        }`}
        onClick={() => changeSortBy("name")}
      >
        Sort By Name
      </button>
      <div className="relative group">
        <button
          className={`border py-1 px-5 rounded ${
            activeSort === "price" ? "bg-blue-500 text-white" : "bg-primary"
          }`}
          onClick={() => changeSortBy("price")}
        >
          Price{" "}
          {activeSort === "price" &&
            (sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </button>
        <div className="absolute hidden group-hover:block bg-black text-white text-sm p-2 rounded mt-1">
          Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
        </div>
      </div>

      <button
        className={`border py-1 px-5 rounded bg-primary mr-2 ${
          activeSort === "created" ? "bg-blue-500 text-white" : "bg-primary"
        }`}
        onClick={() => changeSortBy("created")}
      >
        Sort By Created Date
      </button>

      {/* Limit Selector */}
      <select
        className="border py-1 px-5 rounded bg-primary"
        value={limit}
        onChange={(e) => changeLimit(Number(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
        <option value={50}>50 per page</option>
        <option value={100}>100 per page</option>
      </select>
    </div>
  );
}

export default VenueFilters;
