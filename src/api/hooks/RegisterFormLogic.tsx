import { Formik, Form } from "formik";
import userSchema from "../../Validations/UserValidation";
import { postData } from "../api";
import { useState } from "react";
import RegisterFormInputs from "../../components/register/RegisterFormInputs";
import { useNavigate } from "react-router-dom";

export interface RegistrationProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  venueManager?: boolean;
}

/**
 * RegisterForm component renders a user registration form using Formik and Yup for validation.
 * On submission, it sends the data to the registration API endpoint. If registration is successful,
 * a success message is displayed and the user is redirected to the login page after a short delay.
 * In the event of an error, an error message is displayed temporarily.
 *
 * @component
 * @example
 * // Render the registration form:
 * <RegisterForm />
 *
 * @returns {JSX.Element} The registration form component.
 */
function RegisterForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(""); // Holds the success message
  const [errorMessage, setErrorMessage] = useState(""); // Holds the error message
  const [errorVisible, setErrorVisible] = useState(false); // Controls visibility of error message

  /**
   * Handles the registration form submission by calling the registration endpoint.
   * Displays a success message and redirects to the login page if the registration is successful.
   * Displays an error message temporarily if the registration fails.
   *
   * @async
   * @param {RegistrationProps} values - The form values for registration.
   * @returns {Promise<void>}
   */
  const handleFormSubmit = async (values: RegistrationProps) => {
    try {
      await postData("auth/register", values); // Make the API call to register the user
      setErrorMessage(""); // Clear any previous error messages
      setSuccessMessage(
        "Registration successful! You will be redirected to the login page"
      ); // Set the success message
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: unknown) {
      setSuccessMessage(""); // Clear the success message in case of failure

      if (error instanceof Error) {
        setErrorMessage(error.message); // Set the error message
        setErrorVisible(true); // Show the error message

        setTimeout(() => {
          setErrorVisible(false); // Hide the error message
          setErrorMessage(""); // Optionally reset the error message
        }, 5000); // Timeout duration in milliseconds (5 seconds)
      } else {
        setErrorMessage("An unknown error occurred."); // Handle unknown error types
        setErrorVisible(true); // Show the error message
        setTimeout(() => {
          setErrorVisible(false); // Hide the error message
          setErrorMessage(""); // Optionally reset the error message
        }, 5000); // Timeout duration in milliseconds (5 seconds)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-page">
      <div
        className={`max-w-md w-full bg-white rounded-xl shadow-lg p-8 ${
          errorVisible ? "border-2 border-red-500" : ""
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            venueManager: false,
          }}
          validationSchema={userSchema} // Use Yup validation schema
          onSubmit={handleFormSubmit} // Form submit handler
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="space-y-4">
              <RegisterFormInputs
                touched={touched}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>

        {/* Success and Error Messages */}
        {successMessage && (
          <div
            className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg"
            style={{ zIndex: 9999 }}
          >
            {successMessage}
          </div>
        )}
        {errorVisible && errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded-lg shadow-lg mt-2">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
