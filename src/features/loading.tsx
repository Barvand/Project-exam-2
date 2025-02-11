function Loading() {
  return (
    <div className="card p-4 rounded-lg shadow-lg bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="h-56 w-full bg-gray-300 rounded-lg"></div>

      {/* Title Placeholder */}
      <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div>

      {/* Text Placeholder */}
      <div className="mt-2 h-4 w-full bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 w-5/6 bg-gray-300 rounded"></div>

      {/* Additional Info */}
      <div className="mt-4 flex gap-4">
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
      </div>

      {/* Button Placeholder */}
      <div className="mt-6 h-10 w-1/2 bg-gray-300 rounded-lg"></div>
    </div>
  );
}

export default Loading;
