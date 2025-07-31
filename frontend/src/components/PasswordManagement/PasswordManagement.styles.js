export const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "24px",
    fontWeight: 500,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
  spaceButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  forgotPasswordLink: {
    color: "#1976d2",
    cursor: "pointer",
    fontSize: "0.875rem",
    marginTop: "8px",
    textAlign: "right",
  },
  errorMessage: {
    color: "#c62828",
    fontSize: "0.875rem",
    marginTop: "8px",
  },
  instructionText: {
    marginBottom: "16px",
  },
  inputField: {
    width: "100%",
  },
  formControl: {
    marginBottom: "16px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.87)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(0, 0, 0, 0.6)",
      "&.Mui-focused": {
        color: "#1976d2",
      },
    },
    "& .MuiInputAdornment-root": {
      color: "rgba(0, 0, 0, 0.54)",
    },
  },
};
