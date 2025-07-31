import React, { useState, useRef } from "react";
import { Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  InputContainer,
  StyledTextField,
  StyledDialogActions,
  ResendButton,
  ContinueButton,
  CheckIconWrapper,
} from "./VerificationScreen.styles";
import { verifyCode, sendVerificationCode } from "../../api/AuthApi";
import { showSuccessToast, showErrorToast } from "../CustomToast";
import { ToastContainer } from "react-toastify";

const VerificationScreen = ({ open, onClose, email, onVerified }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [maxResendAttemptsReached, setMaxResendAttemptsReached] =
    useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      setTimeout(() => onVerify(newCode.join("")), 500);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (!newCode[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const onVerify = async (code) => {
    try {
      const response = await verifyCode(email, code);
      if (response.success) {
        showSuccessToast("Verification successful! Redirecting to login...");
        setTimeout(() => {
          onVerified();
        }, 5000);
      } else {
        setError(
          response.message || "Invalid verification code. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred during verification. Please try again."
      );
      console.error("Verification error:", err);
    }
  };

  const handleResendCode = async (email) => {
    try {
      const response = await sendVerificationCode(email );
      if (response.success) {
        showSuccessToast(
          "A new verification code has been sent to your email address."
        );
        setMaxResendAttemptsReached(false);
      } else {
        if (response.message.includes("Maximum resend attempts reached")) {
          setMaxResendAttemptsReached(true);
          showErrorToast(
            "Maximum resend attempts reached. Please contact admin at admin@example.com."
          );
        } else {
          showErrorToast(
            response.message ||
              "An error occurred while sending the code. Please try again."
          );
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while sending the code. Please try again."
      );
      console.error("Resend code error:", err);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle component="div">
        <CheckIconWrapper>
          <CheckCircleOutlineIcon />
        </CheckIconWrapper>
        Verification Required
      </StyledDialogTitle>

      <StyledDialogContent>
        <Typography variant="body1" component="div">
          We have sent a verification code to your email.
        </Typography>
        <Typography variant="body1" component="div">
          Please enter the 6-digit code below.
        </Typography>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <InputContainer>
          {code.map((digit, index) => (
            <StyledTextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              type="text"
              variant="outlined"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputMode="numeric"
            />
          ))}
        </InputContainer>
      </StyledDialogContent>

      <StyledDialogActions>
        <ResendButton
          onClick={() => handleResendCode(email)}
          disabled={maxResendAttemptsReached}
        >
          Resend Code
        </ResendButton>

        <ContinueButton onClick={() => onVerify(code.join(""))}>
          Continue
        </ContinueButton>
      </StyledDialogActions>

      <ToastContainer />
    </StyledDialog>
  );
};

export default VerificationScreen;
