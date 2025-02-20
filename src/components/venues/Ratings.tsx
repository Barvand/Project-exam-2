export interface StarRatingProps {
  rating: number;
}

/**
 * A component that displays a star rating with a descriptive label.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.rating - The numerical rating (1-5) to display.
 *
 * @description
 * - Displays the given rating as a small badge.
 * - Converts the numeric rating into a descriptive label (e.g., "Excellent!", "Good", etc.).
 * - Defaults to "No ratings yet" if the rating is below 2.
 *
 * @example
 * ```tsx
 * <StarRating rating={4} />
 * ```
 *
 * @returns {JSX.Element} A styled rating display with numerical and textual feedback.
 */

function StarRating({ rating }: StarRatingProps) {
  const getRatingText = (rating: number) => {
    if (rating === 5) return "Excellent!";
    if (rating === 4) return "Great!";
    if (rating === 3) return "Good";
    if (rating === 2) return "Fair";
    if (rating === 1) return "Medium";
    return "No ratings yet";
  };

  return (
    <div className="flex items-center space-x-2">
      <p className="bg-primary text-white text-xs p-1 rounded px-2">{rating}</p>
      <p className="text-xs font-bold bg-black text-accentColor p-1 py-1 rounded">
        {" "}
        {getRatingText(rating)}
      </p>
    </div>
  );
}

export default StarRating;
