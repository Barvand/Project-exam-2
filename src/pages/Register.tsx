import RegisterForm from "../api/hooks/RegisterFormLogic";
import { Helmet } from "react-helmet-async";

function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Holidaze - Register now!</title>
        <meta
          name="description"
          content="Register now on Holidaze and book your dream vacation at the best venues!"
        />
      </Helmet>
      <RegisterForm />
    </>
  );
}

export default RegisterPage;
