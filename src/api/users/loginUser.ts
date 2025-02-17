import { useState } from "react";
import { save } from "../localstorage/save";
import { useNavigate } from "react-router-dom";
import { GetHeaders } from "../headers";
import { useAuth } from "../../utils/AuthProvider"; // Make sure you're importing the hook

interface LoginData {
  email: string;
  password: string;
}

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
