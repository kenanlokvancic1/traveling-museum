import { Box, TableFooter, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const StyledTableFooter = styled(TableFooter)({
  backgroundColor: "#8D5524",
  color: "white",
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});


export const ContactInfo = styled(Box)({
  marginBottom: "15px",
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  '& .MuiTypography-root': {
    color: '#ffffff',
  },
  '& .MuiTypography-h6': {
    fontWeight: '600',
    marginBottom: '8px'
  },
  '& .MuiTypography-body2': {
    fontSize: '0.95rem',
    lineHeight: '1.5'
  }
});

export const CuratorLink = styled('div')({
  color: '#ffffff',
  fontSize: '1.1rem',
  fontWeight: '500',
  cursor: 'pointer',
  position: 'relative',
  width: 'fit-content',
  padding: '4px 0',
  marginTop: '16px',
  textDecoration: 'underline',
  textDecorationStyle: 'solid',
  textDecorationColor: 'rgba(255, 255, 255, 0.5)',
  textUnderlineOffset: '4px',
  animation: `${pulse} 2s infinite ease-in-out`,
  '&:hover': {
    textDecoration: 'none',
    animation: 'none'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '0',
    left: '0',
    backgroundColor: '#ffffff',
    transition: 'width 0.3s ease-in-out'
  },
  '&:hover::after': {
    width: '100%'
  }
});