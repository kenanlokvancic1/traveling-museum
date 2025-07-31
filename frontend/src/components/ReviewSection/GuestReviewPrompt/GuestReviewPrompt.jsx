import { Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  GuestMessageBox,
  LockIconStyled,
  MessageText,
} from "./GuestReviewPrompt.style";

function GuestReviewPrompt({
  title = "Add Your Review",
  message = "to experience the full features of the traveling museum",
}) {
  const navigate = useNavigate();

  const handleSignUpClick = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <GuestMessageBox>
      <LockIconStyled />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <MessageText variant="body2">
        <Link href="#" onClick={handleSignUpClick} color="primary">
          Sign Up
        </Link>{" "}
        or{" "}
        <Link href="#" onClick={handleLoginClick} color="primary">
          Log in
        </Link>{" "}
        {message}
      </MessageText>
    </GuestMessageBox>
  );
}

export default GuestReviewPrompt;
