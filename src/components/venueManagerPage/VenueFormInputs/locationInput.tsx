function LocationInput({ formik }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Location</h2>
      <div className="space-y-2">
        <label htmlFor="venueAddress">
          <span className="sr-only"> Address </span>
        </label>
        <input
          {...formik.getFieldProps("location.address")}
          placeholder="Address"
          id="venueAddress"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="venueCity">
          <span className="sr-only"> City </span>
        </label>
        <input
          id="venueCity"
          {...formik.getFieldProps("location.city")}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="venueZip">
          <span className="sr-only"> Zip code </span>
        </label>
        <input
          id="venueZip"
          {...formik.getFieldProps("location.zip")}
          placeholder="ZIP Code"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="venueCountry">
          <span className="sr-only"> Country </span>
        </label>
        <input
          id="venueCountry"
          {...formik.getFieldProps("location.country")}
          placeholder="Country"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}

export default LocationInput;
