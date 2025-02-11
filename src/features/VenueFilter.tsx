import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import SearchBar from "../components/index/searchBar";

interface VenueFilterProps {
  activeSort: string;
  sortOrder: string;
  changeSortBy: (sortBy: string) => void;
  limit: number;
  changeLimit: (limit: number) => void;
}

function VenueFilters({
  activeSort,
  sortOrder,
  changeSortBy,
  limit,
  changeLimit,
}: VenueFilterProps) {
  return (
    <div className="mb-5 pb-5 asymmetric">
      <h2 className="text-center text-3xl py-5 text-customPurple-50 font-bold">
        Find your dream <span className="text-accentColor">destination</span>
      </h2>

      <div className="flex flex-wrap items-center gap-2 container">
        {[
          { label: "Sort By Created Date", sortKey: "created" },
          { label: "Sort By Name", sortKey: "name" },
          { label: "Price", sortKey: "price" },
        ].map(({ label, sortKey }) => (
          <div className="relative group" key={sortKey}>
            <button
              className={`py-2 px-5 rounded flex justify-center items-center font-bold transition-all duration-200 border border-customPurple-500 shadow-lg hover:bg-customPurple-500 hover:text-white ${
                activeSort === sortKey
                  ? "bg-customPurple-500 text-white"
                  : "bg-white text-customPurple-500"
              }`}
              onClick={() => changeSortBy(sortKey)}
            >
              {label}
              {activeSort === sortKey &&
                (sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />)}
            </button>
            <div className="absolute hidden group-hover:block bg-black text-white text-sm p-2 rounded mt-1 left-0 z-50">
              Sort by {label}:{" "}
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </div>
          </div>
        ))}

        <select
          className="py-2 px-5 rounded duration-200 border border-customPurple-500 shadow-lg hover:bg-customPurple-500 hover:text-white bg-white text-customPurple-500 font-bold"
          value={limit}
          onChange={(e) => changeLimit(Number(e.target.value))}
        >
          {[5, 10, 20, 50, 100].map((value) => (
            <option key={value} value={value}>
              {value} per page
            </option>
          ))}
        </select>

        <div className="flex-1">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default VenueFilters;
