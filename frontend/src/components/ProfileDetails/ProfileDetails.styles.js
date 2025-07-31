import { styled } from "@mui/material/styles";
import { Box, TextField, Button, Divider, Typography } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: 800,
  margin: "0 auto",
  padding: theme.spacing(3),
}));

export const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "&.Mui-disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.action.disabled,
      },
      "& .MuiInputAdornment-root": {
        color: theme.palette.action.disabled,
      },
    },
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: theme.palette.text.disabled,
  },
}));

export const AvatarSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  textTransform: "none",
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}));

export const ProfileAvatar = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#1976d2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("sm")]: {
    width: "60px",
    height: "60px",
  },
}));

export const ProfileTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#333",
  fontSize: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

export const SaveButton = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  marginTop: "1rem",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

export const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "3rem 4rem",
  },
  header: {
    marginBottom: "3rem",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#1976d2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontWeight: 600,
    color: "#333",
    fontSize: "2.5rem",
  },
  form: {
    width: "100%",
  },
  formGrid: {
    xs: 12,
    md: 12,
    lg: 12,
  },
  formGridFull: {
    xs: 12,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "0.5rem",
  },
  saveButton: {
    marginTop: "1rem",
    padding: "1rem 2.5rem",
    borderRadius: "4px",
    fontSize: "1.1rem",
  },
  divider: {
    margin: "1rem 0 2rem 0",
    backgroundColor: "#ddd",
  },
  linksStack: {
    maxWidth: "300px",
    marginTop: "1rem",
    paddingLeft: "1rem",
    spacing: 3,
  },
  link: {
    color: "#1976d2",
    textDecoration: "none",
    display: "block",
    fontSize: "1.2rem",
    fontWeight: 500,
    transition: "color 0.2s, transform 0.2s",
    paddingLeft: "0.5rem",
    paddingBottom: "0.5rem",
    borderLeft: "3px solid transparent",
    "&:hover": {
      color: "#0d47a1",
      textDecoration: "none",
      transform: "translateX(5px)",
      borderLeft: "3px solid #1976d2",
    },
  },
  logoutButton: {
    color: "#1976d2",
    textDecoration: "none",
    display: "block",
    fontSize: "1.2rem",
    fontWeight: 500,
    transition: "color 0.2s, transform 0.2s",
    paddingLeft: "0.5rem",
    paddingBottom: "0.5rem",
    borderLeft: "3px solid transparent",
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    "&:hover": {
      color: "#0d47a1",
      textDecoration: "none",
      transform: "translateX(5px)",
      borderLeft: "3px solid #1976d2",
    },
  },
  inputField: {
    size: "medium",
    fullWidth: true,
    "& .MuiInputBase-input": {
      fontSize: "1.4rem",
      padding: "1rem",
    },
  },
  headerTypography: {
    variant: "h3",
  },
  titleTypography: {
    variant: "h2",
  },
  linkTypography: {
    variant: "h6",
    fontSize: "1.3rem",
    fontWeight: 600,
  },
  successMessage: {
    backgroundColor: "#e6f7e8",
    color: "#2e7d32",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
  errorMessage: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "1rem",
    borderRadius: "4px",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
};
