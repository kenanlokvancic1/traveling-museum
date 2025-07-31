import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  Title,
  Message,
  SubMessage,
  BackButton,
} from "./NotFoundPage.styles";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title variant="h1">404</Title>
      <Message variant="h6">This page is lost in time and space</Message>
      <SubMessage variant="body2">
        We couldn't find what you were looking for. It might have been moved,
        deleted, or never existed.
      </SubMessage>
      <BackButton onClick={() => navigate("/")}>Return to Home</BackButton>
    </Wrapper>
  );
};
