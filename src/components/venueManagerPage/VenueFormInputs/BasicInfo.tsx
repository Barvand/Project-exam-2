function BasicInfo({ formik }: any) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Basic information</h2>
        <div>
          <label
            htmlFor="venueName"
            className="block text-sm font-bold text-gray-700"
          >
            Name <span className="text-red-800">*</span>
          </label>
          <input
            {...formik.getFieldProps("name")}
            id="venueName"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none ${
              formik.touched.name && formik.errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
            }`}
            placeholder="The name of your venue"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="venueDescription"
            className="block text-sm font-bold text-gray-700"
          >
            Description <span className="text-red-800">*</span>
          </label>
          <textarea
            id="venueDescription"
            {...formik.getFieldProps("description")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-1 outline-none ${
              formik.touched.description && formik.errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
            }`}
            placeholder="Write something about your venue"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
