import LoginForm from "../components/login/loginForm";
import { Helmet } from "react-helmet-async";

function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Holidaze - Log in</title>
        <meta
          name="description"
          content="Holidaze, login page, holiday, vacation,  sun, beach"
        />
      </Helmet>
      <LoginForm />;
    </>
  );
}

export default LoginPage;
