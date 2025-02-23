import React from "react";

interface ImageInputProps {
  currentImage: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  addImage: () => void;
  images: string[];
}

function ImageInput({
  currentImage,
  handleInputChange,
  addImage,
  images,
  error,
}: ImageInputProps) {
  return (
    <div>
      <label htmlFor="venueImages" className="text-xl">
        Add Images of Your Venue
      </label>
      <div className="space-y-2">
        <input
          id="venueImages"
          type="text"
          placeholder="Enter image URL"
          value={currentImage}
          onChange={handleInputChange}
          className={`w-full p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="button"
          onClick={addImage}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md"
        >
          Add Image
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Image Preview</h3>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-16 h-16 object-cover mb-2"
              />
              <p className="text-sm">{`Image ${index + 1}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
