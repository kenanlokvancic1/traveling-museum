import React from "react";
import Login from "../../components/Login/Login";
import { LoginPageContainer } from "./LoginPage.styles";

const LoginPage = () => {
  return (
    <LoginPageContainer>
      <Login />
    </LoginPageContainer>
  );
};

export default LoginPage;