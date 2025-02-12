function CommoditiesInput({ formik }: any) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Commodities</h2>
      <div className="flex justify-between flex-wrap">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            {...formik.getFieldProps("meta.wifi")}
            className="form-checkbox text-indigo-600"
          />
          <span>Wifi</span>
        </label>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            {...formik.getFieldProps("meta.parking")}
            className="form-checkbox text-indigo-600"
          />
          <span>Parking</span>
        </label>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            {...formik.getFieldProps("meta.breakfast")}
            className="form-checkbox text-indigo-600"
          />
          <span>Breakfast</span>
        </label>
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            {...formik.getFieldProps("meta.pets")}
            className="form-checkbox text-indigo-600"
          />
          <span>Pets</span>
        </label>
      </div>
    </div>
  );
}

export default CommoditiesInput;
