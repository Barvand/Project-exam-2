import { Field } from "formik";

/**
 * A form component that provides input fields for user registration.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {Object} props.touched - Formik touched object indicating which fields have been interacted with.
 * @param {Object} props.errors - Formik errors object containing validation messages.
 * @param {boolean} props.isSubmitting - Indicates whether the form is currently submitting.
 *
 * @description
 * - Renders input fields for name, email, password, and password confirmation.
 * - Includes a checkbox option for users to register as a venue manager.
 * - Uses Formik's `<Field>` component for controlled form inputs.
 * - Displays validation errors when fields are invalid.
 * - Disables the submit button when the form is submitting.
 *
 * @example
 * ```tsx
 * <RegisterFormInputs touched={formik.touched} errors={formik.errors} isSubmitting={formik.isSubmitting} />
 * ```
 *
 * @returns {JSX.Element} A set of form inputs for user registration.
 */
function RegisterFormInputs({ touched, errors, isSubmitting }: any) {
  return (
    <>
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <Field
          name="name"
          id="name"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
            touched.name && errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
          }`}
          placeholder="Enter your name"
        />
        {touched.name && errors.name && (
          <div className="text-red-500 text-sm mt-1">{errors.name}</div>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Field
          id="email"
          name="email"
          type="email"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
            touched.email && errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
          }`}
          placeholder="Enter your email"
        />
        {touched.email && errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Field
          id="password"
          name="password"
          type="password"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
            touched.password && errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
          }`}
          placeholder="Enter your password"
        />
        {touched.password && errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
            touched.confirmPassword && errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-secondary focus:border-indigo-500"
          }`}
          placeholder="Confirm your password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <div className="text-red-500 text-sm mt-1">
            {errors.confirmPassword}
          </div>
        )}
      </div>

      {/* Venue Manager Checkbox */}
      <div>
        <label
          htmlFor="venueManager"
          className="block text-sm font-medium text-gray-700"
        >
          Want to become a venue manager?
        </label>
        <Field
          id="venueManager"
          name="venueManager"
          type="checkbox"
          className="border rounded border-gray-300 focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accentColor hover:bg-customPurple-900 text-black hover:text-white font-bold py-2.5 rounded-lg transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </>
  );
}

export default RegisterFormInputs;
