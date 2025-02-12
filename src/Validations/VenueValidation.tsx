import * as yup from "yup";

const venueSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .required("Description for your property is required"),
  media: yup.array().of(
    yup.object().shape({
      url: yup
        .string()
        .url("Must be a valid URL")
        .required("An image URL is required")
        .matches(/^(https?:\/\/)/, "URL must start with http:// or https://"),
    })
  ),
  price: yup
    .number()
    .min(1, "Cmon, you want to lose money?")
    .required("Please enter a price"),

  maxGuests: yup
    .number()
    .min(1, "Are you sure no one is coming?")
    .required("please define the max numbers allowed for your property"),
  rating: yup
    .number()
    .min(1)
    .max(5)
    .default(1)
    .required("Rating cannot be lower then 1 and higher than 5"),
  meta: yup
    .object()
    .shape({
      wifi: yup.boolean().default(false), // Optional (default: false)
      parking: yup.boolean().default(false), // Optional (default: false)
      breakfast: yup.boolean().default(false), // Optional (default: false)
      pets: yup.boolean().default(false), // Optional (default: false)
    })
    .default({ wifi: false, parking: false, breakfast: false, pets: false }),

  location: yup
    .object()
    .shape({
      address: yup.string().nullable().default(null), // Optional (default: null)
      city: yup.string().nullable().default(null), // Optional (default: null)
      zip: yup.string().nullable().default(null), // Optional (default: null)
      country: yup.string().nullable().default(null), // Optional (default: null)
      continent: yup.string().nullable().default(null), // Optional (default: null)
      lat: yup.number().default(0), // Optional (default: 0)
      lng: yup.number().default(0), // Optional (default: 0)
    })
    .default({
      address: null,
      city: null,
      zip: null,
      country: null,
      continent: null,
      lat: 0,
      lng: 0,
    }),
});

export default venueSchema;
