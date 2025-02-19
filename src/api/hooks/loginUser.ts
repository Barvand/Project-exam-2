import { useState } from "react";
import { save } from "../localstorage/save";
import { useNavigate } from "react-router-dom";
import { GetHeaders } from "../headers";
import { useAuth } from "../../utils/AuthProvider"; // Make sure you're importing the hook

interface LoginData {
  email: string;
  password: string;
}

/**
 * Custom hook for handling user login functionality, including form submission, error handling,
 * and success messaging. This hook manages the API request to the login endpoint, stores the token
 * and user profile in local storage, and updates the authentication context.
 * This function is one of the first ones I created, and I switched to different method of API handling later within the project.
 *
 * @function LoginUser
 * @returns {Object} The hook returns an object with the following properties:
 *   - `apiError` {string | null}: Error message if the API request fails.
 *   - `successMessage` {string}: Success message after a successful login.
 *   - `onSubmit` {function}: The function to call when submitting the login form.
 *   - `loading` {boolean}: A flag indicating whether the login request is in progress.
 *
 * @example
 * // Usage:
 * const { apiError, successMessage, onSubmit, loading } = LoginUser();
 *
 * const handleLogin = (data) => {
 *   onSubmit(data); // Call this function when form is submitted
 * };
 *
 * if (apiError) {
 *   console.error(apiError); // Handle error message
 * }
 *
 * if (successMessage) {
 *   console.log(successMessage); // Handle success message
 * }
 */
function LoginUser() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setIsLoading] = useState(false);

  // Destructure the context values
  const { setIsLoggedIn, setUserProfile } = useAuth();

  const onSubmit = async (data: LoginData) => {
    setApiError(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message
    setIsLoading(true);

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: GetHeaders(),
        body: JSON.stringify(data), // Send form data to the API
      });
      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setApiError(
          errorData.errors?.[0]?.message ||
            errorData.message ||
            "An error occurred."
        );

        setTimeout(() => {
          setApiError(null);
        }, 5000);
        return;
      }

      setSuccessMessage("You are successfully logged in.");

      const { data: userData } = await response.json(); // Destructure 'data'
      const { accessToken, ...user } = userData; // Destructure 'accessToken' from 'data'

      save("token", accessToken); // Save token to local storage
      save("profile", user); // Save user profile

      // Update context with login status and user profile
      setIsLoggedIn(true);
      setUserProfile(user);

      navigate(`/profiles/${user.name}`);
    } catch (err) {
      console.error("Error:", err);
      setApiError("An error occurred while logging in.");
    }
  };

  return {
    apiError,
    successMessage,
    onSubmit,
    loading,
  };
}

export default LoginUser;
