import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[^\d]/, // This regex ensures that the name does not start with a number
      "Name cannot start with a number"
    ),
  email: yup
    .string()
    .email("Email must be from the domain @stud.noroff.no")
    .matches(
      /@stud\.noroff\.no$/,
      "Email must be from the domain @stud.noroff.no"
    )
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(24, "Password must be at most 24 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  venueManager: yup.boolean(),
});

export default userSchema;
