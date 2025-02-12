import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface RegistrationProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  venueManager: boolean;
}

function CreateUser() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (data: RegistrationProps) => {
    setApiError("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Send form data to the API
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Capture the error message from the response
        setApiError(errorData.errors[0]?.message || "An error occurred.");
        // Reset the error after 5 seconds
        setTimeout(() => {
          setApiError(null);
        }, 5000);
        throw new Error(errorData.errors[0]?.message || "Failed to register.");
      }
      setSuccessMessage(
        "You have successfully created an account, please log in."
      );
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return {
    apiError,
    successMessage,
    onSubmit,
  };
}

export default CreateUser;
