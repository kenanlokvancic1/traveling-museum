import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Background,
  Wrapper,
  Title,
  Message,
  SubMessage,
  BackButton,
} from "./UnauthorizedPage.styles";

export const UnauthorizedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  return (
    <Background>
      <Wrapper>
        <Title variant="h1">401 Unauthorized</Title>
        <Message variant="h6">Access denied. You don’t have the clearance.</Message>
        <SubMessage variant="body2">
          You might be missing credentials, or trying to access something that's off-limits.
        </SubMessage>
        <BackButton onClick={() => navigate(from)}>
          Return to Safety
        </BackButton>
      </Wrapper>
    </Background>
  );
};
