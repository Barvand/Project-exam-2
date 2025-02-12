import {
  UseFormRegister,
  UseFormWatch,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

interface ImageFieldProps {
  index: number;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  removeImageField: UseFieldArrayRemove;
  addImageField: UseFieldArrayAppend<FieldValues, "media">;
}

function ImageField({
  index,
  register,
  watch,
  removeImageField,
  addImageField,
}: ImageFieldProps) {
  const imageUrl = watch(`media.${index}.url`);

  return (
    <div className="p-2 rounded-lg">
      <div className="relative">
        <img
          src={imageUrl || "/public/placeholder.png"}
          alt={watch(`media.${index}.alt`) || "Image Preview"}
          className="w-32 h-32 object-cover border rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement; // Cast target to HTMLImageElement
            target.src = "/placeholder.png";
          }}
        />
      </div>

      {/* Image URL Input */}
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none mt-2"
        {...register(`media.${index}.url`)}
        placeholder="Paste the url of an image"
      />

      {/* Alt Text Input */}
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-secondary focus:border-indigo-500 outline-none mt-2"
        {...register(`media.${index}.alt`)}
        placeholder="Tell something about your image"
      />

      <div className="flex justify-between">
        {/* Remove Button */}
        <button
          type="button"
          className="bg-red-500 text-white px-3 py-1 rounded mt-2"
          onClick={() => removeImageField(index)}
        >
          Remove
        </button>
        {/* Add Image Button */}
        <button
          type="button"
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          onClick={addImageField}
        >
          + Add Image
        </button>
      </div>
    </div>
  );
}

export default ImageField;
