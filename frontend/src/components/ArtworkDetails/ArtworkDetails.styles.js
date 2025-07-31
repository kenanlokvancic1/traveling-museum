import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  FormControl,
  Select,
  Button,
} from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: `${theme.spacing(5)} auto`,
  padding: theme.spacing(3.75),
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  border: "2px solid #8D5524",
  maxHeight: "90vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px"
  },
  "&::-webkit-scrollbar-track": {
    background: "#f0f0f0",
    borderRadius: "4px"
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#C4A484",
    borderRadius: "4px",
    "&:hover": {
      background: "#8D5524"
    }
  }
}));

export const TopSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

export const HeaderBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ActionIconsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const ArtworkContentLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  marginTop: theme.spacing(3),
}));

export const ArtworkImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  minWidth: "300px",
  maxWidth: "500px",
}));

export const StyledImage = styled("img")({
  width: "100%",
  height: "400px",
  objectFit: "contain",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

export const StyledDetails = styled(Box)(({ theme }) => ({
  backgroundColor: "#FAFAFA",
  padding: theme.spacing(2.5),
  borderRadius: "10px",
  border: "1px solid #E0E0E0",
  width: "100%",
  minHeight: "400px",
}));

export const StyledInfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
  width: "100%",
}));

export const StyledLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#333",
  width: "30%",
  minWidth: "100px",
  marginRight: theme.spacing(1),
}));

export const StyledValue = styled(Typography)({
  color: "#555",
  width: "70%",
  textAlign: "left",
  wordBreak: "break-word",
});

export const StyledEditField = styled(TextField)(({ theme }) => ({
  width: "70%",
  "& .MuiInputBase-root": {
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.25, 1.75),
  },
}));

export const StyledActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

export const StyledFavoriteIcon = styled(IconButton)(({ isFavorite }) => ({
  color: isFavorite ? "#e53935" : "#B0BEC5",
  transition: "color 0.3s",
  "&:hover": {
    color: "#e53935",
  },
}));

export const StyledSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  backgroundColor: "#F5F5F5",
  borderRadius: "8px",
  textAlign: "center",
  cursor: "pointer",
  fontWeight: 500,
  transition: "background-color 0.3s ease",
  width: "100%",
  "&:hover": {
    backgroundColor: "#ECECEC",
  },
}));

export const ButtonsWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1.25),
  marginTop: theme.spacing(2.5),
  width: "100%",
}));

export const InfoWrapper = styled(Box)({
  flex: 2,
  display: "flex",
  flexDirection: "column",
  minWidth: "500px",
  maxWidth: "800px",
});

export const ImageDialog = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(5px)",
  zIndex: 1300,
});

export const DialogImage = styled("img")({
  maxWidth: "90vw",
  maxHeight: "90vh",
  objectFit: "contain",
  borderRadius: "4px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
});

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2.5),
  right: theme.spacing(2.5),
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  transition: "background-color 0.3s ease, transform 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    transform: "scale(1.1)",
  },
}));

export const CuratorInfoBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
}));

export const StyledFormControl = styled(FormControl)(
  ({ theme, isLastField }) => ({
    width: "70%",
    "& .MuiInputBase-root": {
      backgroundColor: "#fff",
      borderRadius: "5px",
    },
    "& .MuiInputBase-input": {
      padding: "10px 14px",
    },
    marginBottom: isLastField ? 0 : theme.spacing(2),
  })
);

export const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.23)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.87)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

export const FlexBox = styled(Box)({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const StatusBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const ImageBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const ResponsiveContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  flexDirection: "column",
  marginTop: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));
