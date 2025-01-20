// import React, { useState } from "react";

// // Interface for form state
// export interface FormData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface Errors {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// function UseFormLogic() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState<Errors>({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors: Errors = {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };

//     // Username validation
//     if (!formData.name.trim()) {
//       newErrors.name = "Username is required.";
//     } else {
//       const userNameRegex = /^(?=.{4,20}$)[a-zA-Z0-9]+$/;
//       if (!userNameRegex.test(formData.name)) {
//         newErrors.name =
//           "Username must be between 4 and 20 characters and can only contain letters and numbers.";
//       }
//     }

//     // Email validation
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email =
//         "Please enter a valid email address with the domain @stud.noroff.no.";
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//     }

//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//     }

//     setErrors(newErrors);
//     return Object.values(newErrors).every((error) => error === "");
//   };

//   return {
//     formData,
//     setFormData,
//     errors,
//     handleInputChange,
//   };
// }

// export default UseFormLogic;
