function LocationInput({ formik }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <div className="space-y-2">
        <input
          {...formik.getFieldProps("location.address")}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          {...formik.getFieldProps("location.city")}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          {...formik.getFieldProps("location.zip")}
          placeholder="ZIP Code"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          {...formik.getFieldProps("location.country")}
          placeholder="Country"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}

export default LocationInput;
