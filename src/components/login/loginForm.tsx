import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../error-handling/error";

export function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [validFields, setValidFields] = useState({
    email: false,
    password: false,
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Please enter a valid email",
      required: true,
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Basic email validation
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "password",
      label: "password",
      errorMessage: "password must be more than 3 characters",
      required: true,
      pattern: /^.{3,}$/, // Minimum 3 characters
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    const field = inputs.find((input) => input.name === name);
    if (field) {
      const isValid = field.pattern.test(value);
      setValidFields({ ...validFields, [name]: isValid });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const field = inputs.find((input) => input.name === name);
    if (field) {
      const isValid = field.pattern.test(value);
      setValidFields({ ...validFields, [name]: isValid });

      setErrors({
        ...errors,
        [name]: isValid || !value ? "" : field.errorMessage,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allValid = Object.values(validFields).every((isValid) => isValid);
    if (allValid) {
      // Assuming password is part of the form, add it here if necessary
      const { email, password } = values; // Ensure you're including all necessary fields

      fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Adjust this as needed
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(
                data.errors?.[0]?.message || "Something went wrong."
              );
            });
          }
          return res.json(); // Return the data for the next `.then()` block
        })
        .then((data) => {
          const accessToken = data.data.accessToken; // Correctly access the token here
          console.log("Access Token:", accessToken);
          localStorage.setItem("accessToken", accessToken);
          setShowMessage(true);
          navigate("/profile");
        })
        .catch((error) => setErrors({ general: error.message }));
    }
  };

  return (
    <form className="p-6 text-black" onSubmit={handleSubmit}>
      <h2 className="text-3xl text-black my-3 text-center">Write to us</h2>
      {inputs.map((input) => (
        <div key={input.id} className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor={input.name}
            >
              {input.label} <span className="text-red-500">*</span>
            </label>
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={values[input.name]}
              required={input.required}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors[input.name]
                  ? "border-red-500"
                  : validFields[input.name]
                  ? "border-green-500"
                  : "border-gray-200"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-blue-500 focus:bg-white`}
            />
            {errors[input.name] && (
              <p className="text-red-500 text-xs italic">
                {errors[input.name]}
              </p>
            )}
          </div>
        </div>
      ))}
      {showMessage && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded bg-green-50">
          Form submitted. Please wait...
        </div>
      )}
      {errors.general && <ErrorMessage message={errors.general} />}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
