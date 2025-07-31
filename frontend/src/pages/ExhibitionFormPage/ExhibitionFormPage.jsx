import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import ExhibitionForm from "../../components/ExhibitionForm";
import { ContentWrapper } from "./ExhibitionFormPage.styles";
import { submitExhibitionForm } from "../../components/ExhibitionForm/exhibitionFormHelper";

const ExhibitionFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (exhibitionData) => {
    try {
      setLoading(true);
      const result = await submitExhibitionForm(exhibitionData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/exhibitions/${result.data.exhibition_id}`);
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Failed to create exhibition:", err);
      setError(err.message || "Failed to create exhibition");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <ContentWrapper>
      <ExhibitionForm onSubmit={handleFormSubmit} isLoading={loading} />
      <Snackbar
        open={success || !!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
        >
          {success
            ? "Exhibition created successfully!"
            : error || "Failed to create exhibition"}
        </Alert>
      </Snackbar>
    </ContentWrapper>
  );
};

export default ExhibitionFormPage;
