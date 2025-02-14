export interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  const getRatingText = (rating: number) => {
    if (rating === 5) return "Excellent!";
    if (rating === 4) return "Great!";
    if (rating === 3) return "Good";
    if (rating === 2) return "Fair";
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
