import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface VenueFilterProps {
  activeSort: string;
  sortOrder: string;
  changeSortBy: string;
  limit: number;
  changeLimit: number;
}
function VenueFilters({
  activeSort,
  sortOrder,
  changeSortBy,
  limit,
  changeLimit,
}: VenueFilterProps) {
  return (
    <div className="mb-5 pb-5 border-b">
      <h2 className="text-center text-xl py-5 text-customPurple-900 font-bold">
        Find your dream destination
      </h2>
      {/* Buttons & Limit Selector */}

      <div className="flex flex-wrap items-center gap-2 justify-center">
        {/* Sort By Created Date */}
        <div className="relative group">
          <button
            className={`py-1 px-5 rounded w-52 flex justify-evenly items-center ${
              activeSort === "created"
                ? "bg-customPurple-500 text-customPurple-50"
                : "bg-customPurple-50 text-customPurple-900"
            }`}
            onClick={() => changeSortBy("created")}
          >
            Sort By Created Date
          </button>
          <div className="absolute hidden group-hover:block bg-black text-white text-sm p-2 rounded mt-1 left-0">
            Sort by Price: {sortOrder === "asc" ? "New to old" : "Old to new"}
          </div>
        </div>
        {/* Sort By Name */}
        <div className="relative group">
          <button
            className={`py-1 px-5 rounded w-52 flex justify-evenly items-center ${
              activeSort === "name"
                ? "bg-customPurple-500 text-customPurple-50"
                : "bg-customPurple-50 text-customPurple-900"
            }`}
            onClick={() => changeSortBy("name")}
          >
            Sort By Name
            {activeSort === "name" &&
              (sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />)}
          </button>
          {/* Tooltip */}
          <div className="absolute hidden group-hover:block bg-black text-white text-sm p-2 rounded mt-1 left-0">
            Sort by Name
          </div>
        </div>

        {/* Sort By Price */}
        <div className="relative group">
          <button
            className={`py-1 px-5 rounded w-32 flex justify-evenly items-center ${
              activeSort === "price"
                ? "bg-customPurple-500 text-customPurple-50"
                : "bg-customPurple-50 text-customPurple-900"
            }`}
            onClick={() => changeSortBy("price")}
          >
            Price
            {activeSort === "price" &&
              (sortOrder === "asc" ? <IoIosArrowUp /> : <IoIosArrowDown />)}
          </button>
          {/* Tooltip */}
          <div className="absolute hidden group-hover:block bg-black text-white text-sm p-2 rounded mt-1 left-0">
            Sort by Price: {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </div>
        </div>
        {/* Limit Selector */}
        <select
          className="py-1 px-5 rounded bg-customPurple-50 text-customPurple-500"
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
    </div>
  );
}

export default VenueFilters;
