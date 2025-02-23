function PricingInput({ formik }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Pricing information</h2>
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-col">
          <label
            htmlFor="venuePrice"
            className="block text-sm font-bold text-gray-700"
          >
            Price / night $ <span className="text-red-800">*</span>
          </label>
          <input
            id="venuePrice"
            type="number"
            {...formik.getFieldProps("price")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none ${
              formik.touched.price && formik.errors.price
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
            }`}
            placeholder="Price in $$"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="text-red-500">{formik.errors.price}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="venueGuests"
            className="block text-sm font-bold text-gray-700"
          >
            Max Guests <span className="text-red-800">*</span>
          </label>
          <input
            id="venueGuests"
            type="number"
            {...formik.getFieldProps("maxGuests")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none ${
              formik.touched.maxGuests && formik.errors.maxGuests
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
            }`}
            placeholder="The amount of guests"
          />
          {formik.touched.maxGuests && formik.errors.maxGuests && (
            <div className="text-red-500">{formik.errors.maxGuests}</div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="venueRating"
          className="block text-sm font-bold text-gray-700"
        >
          Rating <span className="text-red-800">*</span>
        </label>
        <input
          type="number"
          id="venueRating"
          {...formik.getFieldProps("rating")}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none ${
            formik.touched.rating && formik.errors.rating
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
          }`}
          placeholder="1 - bad / 5 - excellent"
        />
        {formik.touched.rating && formik.errors.rating && (
          <div className="text-red-500">{formik.errors.rating}</div>
        )}
      </div>
    </div>
  );
}

export default PricingInput;
