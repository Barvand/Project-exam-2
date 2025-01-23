import { useForm, Controller } from "react-hook-form";

interface FormData {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating?: number;
  media?: { url: string; alt: string }[];
  meta?: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
}

const CreatePostForm = () => {
  const { register, handleSubmit, control, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    // API call here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Info */}
      <div>
        <label>Name (required)</label>
        <input {...register("name", { required: true })} />
      </div>
      <div>
        <label>Description (required)</label>
        <textarea {...register("description", { required: true })} />
      </div>
      <div>
        <label>Price (required)</label>
        <input
          type="number"
          {...register("price", { required: true, min: 0 })}
        />
      </div>
      <div>
        <label>Max Guests (required)</label>
        <input
          type="number"
          {...register("maxGuests", { required: true, min: 1 })}
        />
      </div>

      {/* Optional Fields */}
      <div>
        <label>Rating</label>
        <input type="number" {...register("rating", { min: 0, max: 5 })} />
      </div>

      {/* Media */}
      <div>
        <label>Media</label>
        <div>
          <input {...register("media.0.url")} placeholder="Image URL" />
          <input {...register("media.0.alt")} placeholder="Alt Text" />
        </div>
      </div>

      {/* Meta */}
      <div>
        <label>Meta</label>
        <div>
          <label>
            <input type="checkbox" {...register("meta.wifi")} />
            Wifi
          </label>
          <label>
            <input type="checkbox" {...register("meta.parking")} />
            Parking
          </label>
          <label>
            <input type="checkbox" {...register("meta.breakfast")} />
            Breakfast
          </label>
          <label>
            <input type="checkbox" {...register("meta.pets")} />
            Pets
          </label>
        </div>
      </div>

      {/* Location */}
      <div>
        <label>Location</label>
        <input {...register("location.address")} placeholder="Address" />
        <input {...register("location.city")} placeholder="City" />
        <input {...register("location.zip")} placeholder="Zip Code" />
        <input {...register("location.country")} placeholder="Country" />
        <input {...register("location.continent")} placeholder="Continent" />
        <input
          type="number"
          step="0.0001"
          {...register("location.lat")}
          placeholder="Latitude"
        />
        <input
          type="number"
          step="0.0001"
          {...register("location.lng")}
          placeholder="Longitude"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePostForm;
