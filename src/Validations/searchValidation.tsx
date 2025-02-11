import * as yup from "yup";

const searchSchema = yup.object().shape({
  destination: yup.string().required("Find your destination"),
});

export default searchSchema;
