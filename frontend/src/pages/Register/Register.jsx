import React, { useState } from "react";
import { RootContainer } from "../../components/Register/RootContainer/RootContainer";
import { LeftPanel } from "../../components/Register/LeftPanel/LeftPanel";
import { RightPanel } from "../../components/Register/RightPanel/RightPanel";
import { Title } from "../../components/Register/Title/Title";
import { ScreenContainer } from "../../components/Register/ScreenContainer/ScreenContainer";
import RegisterForm from "../../components/Register/Form";
import VerificationScreen from "../../components/VerificationScreen";
import { registerUser } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../components/CustomToast";

export default function RegisterPage() {
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const result = await registerUser(formData);
      setEmail(formData.email);
      setShowVerification(true);
      showSuccessToast(
        "Registration successful! Please check your email for verification."
      );
    } catch (error) {
      console.error("Registration failed", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      showErrorToast(errorMessage);
    }
  };

  const handleVerified = () => {
    console.log("Verification successful. Redirecting to login page.");
    showSuccessToast("Email verified successfully! Redirecting to login.");
    navigate("/login");
  };

  return (
    <ScreenContainer>
      {showVerification ? (
        <VerificationScreen
          open={showVerification}
          onClose={() => setShowVerification(false)}
          email={email}
          onVerified={handleVerified}
        />
      ) : (
        <RootContainer>
          <LeftPanel>
            <Title variant="h5">Register</Title>
            <RegisterForm onSubmit={handleSubmit} />
          </LeftPanel>
          <RightPanel />
        </RootContainer>
      )}
    </ScreenContainer>
  );
}
