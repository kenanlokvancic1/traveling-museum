import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Card } from "@mui/material";

export const StyledReportContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#FAFAFA",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  border: "1px solid #E0E0E0",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "opacity 0.3s ease-in-out",
  marginBottom: theme.spacing(2),

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f0f0f0",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#C4A484",
    borderRadius: "4px",
    "&:hover": {
      background: "#8D5524",
    },
  },
}));

export const ReportWrapper = styled(Box)(({ theme, isOpen }) => ({
  position: "relative",
  width: "100%",
  marginTop: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  maxHeight: isOpen ? "none" : "0px",
  overflow: "hidden"
}));

export const StyledReportHeader = styled(Typography)(({ theme }) => ({
  color: "#8D5524",
  marginBottom: theme.spacing(2),
  fontWeight: 600,
}));

export const StyledActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const StyledAddForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #E0E0E0",
}));

export const StyledSortButton = styled(Button)(({ theme }) => ({
  color: "#8D5524",
  borderColor: "#8D5524",
  "&:hover": {
    borderColor: "#8D5524",
    backgroundColor: "rgba(141, 85, 36, 0.04)",
  },
}));

export const StyledAddButton = styled(Button)(({ isCancel }) => ({
  color: isCancel ? "#d32f2f" : "#8D5524",
  borderColor: isCancel ? "#d32f2f" : "#8D5524",
  "&:hover": {
    borderColor: isCancel ? "#d32f2f" : "#8D5524",
    backgroundColor: isCancel
      ? "rgba(211, 47, 47, 0.04)"
      : "rgba(141, 85, 36, 0.04)",
  },
}));

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8D5524",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#6d4219",
  },
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#4CAF50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#388E3C",
  },
}));

export const StyledCardGrid = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
  minHeight: "100px",
}));

export const StyledReportCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "box-shadow 0.3s ease",
  width: "100%",
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  },
}));

export const StyledCardText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const StyledDateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: "italic",
  marginBottom: theme.spacing(1),
}));

export const StyledImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const StyledImageBox = styled(Box)({
  position: "relative",
  width: "100px",
  height: "100px",
});

export const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "4px",
});

export const StyledRemoveButton = styled(Button)({
  position: "absolute",
  top: -8,
  right: -8,
  minWidth: "24px",
  width: "24px",
  height: "24px",
  padding: 0,
  borderRadius: "50%",
  backgroundColor: "#d32f2f",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#b71c1c"
  }
});

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  border: '1px dashed #C4A484',
  margin: theme.spacing(2, 0),
  minHeight: '200px'
}));

export const StyledReportSection = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f0f0f0',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#C4A484',
    borderRadius: '4px',
    '&:hover': {
      background: '#8D5524'
    }
  }
}));
