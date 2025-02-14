import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import SearchBar from "../components/index/searchBar";

interface VenueFilterProps {
  activeSort: string;
  sortOrder: string;
  changeSortBy: (sortBy: string) => void;
  toggleSortOrder: () => void;
}

function VenueFilters({
  activeSort,
  sortOrder,
  changeSortBy,
  toggleSortOrder,
}: VenueFilterProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown state
  const [selectedSort, setSelectedSort] = useState(activeSort);

  // Toggle dropdown open/close
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle selection change from custom dropdown
  const handleSortChange = (sortKey: string) => {
    changeSortBy(sortKey); // Pass the selected sortKey to parent
    setSelectedSort(sortKey); // Update the local selected value
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="mb-5 pb-5 bg-primary container mt-2 rounded p-5">
      <h2 className="text-center text-3xl py-5 text-white font-bold">
        Find your dream <span className="text-accentColor">destination</span>
      </h2>

      <div className="flex flex-wrap items-center container justify-end">
        {/* Custom Dropdown for sorting options */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-white"> Sort by </p>
            <button
              className="cursor-pointer py-2 px-5 rounded font-bold border border-customPurple-500 shadow-lg transition-all duration-200 bg-white text-customPurple-500 hover:bg-customPurple-500 hover:text-white flex items-center"
              onClick={handleDropdownToggle}
            >
              {selectedSort === "created" && "Date"}
              {selectedSort === "name" && "Name"}
              {selectedSort === "price" && "Price"}
              <span className="ml-2">
                {dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </button>
          </div>

          {dropdownOpen && (
            <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-customPurple-500 rounded shadow-lg z-10">
              {[
                { label: "Date", sortKey: "created" },
                { label: "Name", sortKey: "name" },
                { label: "Price", sortKey: "price" },
              ].map(({ label, sortKey }) => (
                <li
                  key={sortKey}
                  className="cursor-pointer py-1 px-2 hover:bg-customPurple-100 font-bold text-customPurple-500"
                  onClick={() => handleSortChange(sortKey)}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Button for toggling ascending/descending */}
        <button
          className={`py-2 px-3 rounded h-[42px] flex justify-center items-center font-bold transition-all duration-200 border border-customPurple-500 shadow-lg ${
            sortOrder === "asc"
              ? "bg-customPurple-500 text-white "
              : "bg-white text-customPurple-500 hover:bg-customPurple-500 hover:text-white"
          }`}
          onClick={toggleSortOrder}
        >
          {sortOrder === "asc" && (
            <IoIosArrowUp className="text-xl font-bold" />
          )}
          {sortOrder === "desc" && (
            <IoIosArrowDown className="text-xl font-bold" />
          )}
        </button>
      </div>

      {/* Search bar */}
      <SearchBar />
    </div>
  );
}

export default VenueFilters;
