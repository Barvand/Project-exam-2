import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface VenueFilterProps {
  activeSort: string;
  sortOrder: string;
  changeSortBy: (sortBy: string) => void;
  toggleSortOrder: () => void;
}

/**
 * A component that provides sorting functionality for venue listings.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.activeSort - The currently selected sorting key (`created`, `name`, `price`).
 * @param {string} props.sortOrder - The current sorting order (`asc` or `desc`).
 * @param {Function} props.changeSortBy - Function to change the sorting key.
 * @param {Function} props.toggleSortOrder - Function to toggle between ascending and descending sorting order.
 *
 * @description
 * - Displays a dropdown for selecting sorting criteria (`Date`, `Name`, `Price`).
 * - Provides a button to toggle sorting order (`ascending` or `descending`).
 * - Updates the sorting state when a new option is selected.
 * - Uses icons (`IoIosArrowUp` and `IoIosArrowDown`) to indicate sorting order.
 *
 * @example
 * ```tsx
 * <VenueFilters
 *   activeSort="price"
 *   sortOrder="asc"
 *   changeSortBy={(sortBy) => console.log("Sorting by:", sortBy)}
 *   toggleSortOrder={() => console.log("Toggled sort order")}
 * />
 * ```
 *
 * @returns {JSX.Element} A sorting control component with dropdown and sorting order toggle.
 */

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
    <div className="mb-5 pb-5 bg-accentColor p-5">
      <div className="container">
        <h2 className="text-center text-3xl py-5 text-white font-bold">
          Find your dream <span className="text-primary">destination</span>
        </h2>
      </div>

      <div className="flex flex-wrap items-center container justify-end gap-1">
        {/* Custom Dropdown for sorting options */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-primary"> Sort by </p>
            <button
              className="cursor-pointer py-2 px-5 rounded font-bold border-bg-shadeAccent shadow-lg transition-all duration-200 bg-shadeAccent text-white hover:bg-black hover:text-white flex items-center"
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
            <ul className="absolute top-full left-0 mt-2 w-full bg-shadeAccent border text-primary rounded shadow-lg z-10">
              {[
                { label: "Date", sortKey: "created" },
                { label: "Name", sortKey: "name" },
                { label: "Price", sortKey: "price" },
              ].map(({ label, sortKey }) => (
                <li
                  key={sortKey}
                  className="cursor-pointer py-1 px-2 hover:bg-customPurple-100 font-bold text-black"
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
          className={`py-2 px-2 rounded h-[40px] flex justify-center items-center font-bold transition-all duration-200 text-white ${
            sortOrder === "asc"
              ? " text-white bg-shadeAccent"
              : "bg-shadeAccent hover:text-white hover:bg-black"
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
    </div>
  );
}

export default VenueFilters;
