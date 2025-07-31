export const styles = {
  dialogPaper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "24px",
    maxWidth: "450px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "8px",
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#d32f2f",
    textAlign: "center",
  },
  warningIcon: {
    fontSize: "64px",
    color: "#d32f2f",
    marginBottom: "8px",
  },
  description: {
    color: "#555",
    marginBottom: "16px",
    fontSize: "1rem",
    textAlign: "center",
  },
  warningText: {
    color: "#d32f2f",
    fontWeight: 500,
    fontSize: "1.1rem",
    marginBottom: "16px",
    textAlign: "center",
  },
  passwordField: {
    width: "100%",
    marginTop: "16px",
    marginBottom: "16px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginTop: "24px",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    color: "white",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "#555",
    border: "1px solid #ccc",
    padding: "8px 16px",
  },
  confirmationCheckbox: {
    marginTop: "16px",
  },
  errorMessage: {
    color: "#d32f2f",
    fontSize: "0.9rem",
    marginTop: "8px",
  },
  confirmDialogButtons: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "flex-end",
  },
  confirmDeleteButton: {
    marginLeft: "8px",
  },
};
