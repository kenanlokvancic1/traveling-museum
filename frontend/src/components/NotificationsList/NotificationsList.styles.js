import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { Notifications as NotificationIcon } from "@mui/icons-material";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: "40px",
  width: "100%",
  maxWidth: "1300px",
  backgroundColor: "white",
  position: "relative",
  minHeight: "100vh" 
});

export const Title = styled(Typography)({
  fontSize: "1.8rem",
  fontWeight: "bold",
  color: "#8D5524",
  textTransform: "uppercase",
  letterSpacing: "1px",
  borderBottom: "2px solid #8D5524",
  paddingBottom: "5px",
  marginBottom: "20px",
});

export const FilterContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
});

export const FilterButton = styled(Button)(({ active }) => ({
  color: active ? "#8D5524" : "grey",
  fontWeight: "bold",
  textDecoration: active ? "underline" : "none",
  backgroundColor: active ? "#FAE5D3" : "transparent",
  padding: "8px 16px",
  borderRadius: "8px",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "#F1EBDE",
  },
}));

export const ListContainer = styled(Box)({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
});

export const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "3px solid #8D5524",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "10px",
  minWidth: "300px",
  maxWidth: "600px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const ModalIcon = styled(NotificationIcon)({
  color: "#8D5524",
  fontSize: "40px",
  alignSelf: "center",
});

export const ModalTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
});

export const ModalTimestamp = styled(Typography)({
  fontSize: "0.9rem",
  color: "gray",
  textAlign: "center",
});

export const ModalDetails = styled(Typography)({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const CloseButton = styled(Button)({
  backgroundColor: "#8D5524",
  color: "white",
  "&:hover": {
    backgroundColor: "#6B3E1E",
  },
});

export const StyledSnackbar = styled(Snackbar)({
  position: 'fixed', 
  bottom: '24px', 
  transform: 'translateX(-50%)',
  width: 'fit-content',
  zIndex: 9999 
});

export const StyledAlert = styled(Alert)(({ severity }) => ({
  minWidth: '300px',
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  backgroundColor: severity === 'success' ? '#edf7ed' : '#fdeded',
  color: severity === 'success' ? '#1e4620' : '#5f2120',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  border: `1px solid ${severity === 'success' ? '#4caf50' : '#ef5350'}`,
  '& .MuiAlert-message': {
    flex: 1,
    textAlign: 'center',
    margin: 'auto',
    fontSize: '16px',
    padding: '8px 0'
  },
  '& .MuiAlert-icon': {
    marginRight: '12px',
    alignSelf: 'center',
    color: severity === 'success' ? '#4caf50' : '#ef5350'
  }
}));

export const NotificationContainer = styled('div')({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});
