import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../Validations/LoginValidation";
// Removed the custom SuccessMessage and ErrorMessage components to use inline styling instead
import LoginUser from "../../api/users/loginUser";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { apiError, successMessage, onSubmit } = LoginUser();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Log in!
        </h2>

        {/* Inline API Error Message */}
        {apiError && (
          <div className="mt-3 text-red-500 font-semibold">{apiError}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-indigo-500 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-customPurple-900 text-white font-medium py-3 rounded-lg transition-colors flex justify-center"
          >
            Login <CiLogin className="text-2xl ml-2" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>

      {successMessage && (
        <div
          className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
