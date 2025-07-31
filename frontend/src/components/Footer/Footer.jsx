import React, { useState } from "react";
import { Typography, TableRow, TableCell, Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledTableFooter, ContactInfo, CuratorLink } from "./Footer.styles";
import CuratorRequestDialog from "../CuratorRequest/CuratorRequestDialog";

const Footer = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleCuratorLinkClick = () => {
    if (!user) {
      setSnackbar({
        open: true,
        message: "Please log in to apply for curator position",
        severity: "info"
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (user.role === "curator" || user.role === "admin") {
      setSnackbar({
        open: true,
        message: "You already have curator or admin privileges",
        severity: "info"
      });
      return;
    }

    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <StyledTableFooter>
      <TableRow>
        <TableCell align="center" colSpan={1}> 
          <ContactInfo>
            <Typography variant="h6" component="h3">Travelling Museum</Typography>
            <Typography variant="body2" component="p">Logavina 10</Typography>
            <Typography variant="body2" component="p">71000 Sarajevo</Typography>
            <Typography variant="body2" component="p">033-555-555</Typography>
            <Typography variant="body2" component="p">teamcharlietravellingmuseum@gmail.com</Typography>
            {user?.role !== "curator" && user?.role !== "admin" && (
              <CuratorLink onClick={handleCuratorLinkClick}>
                Become a Curator
              </CuratorLink>
            )}
          </ContactInfo>
          
          {user && user.role === "user" && (
            <CuratorRequestDialog 
              open={openDialog}
              onClose={() => setOpenDialog(false)}
            />
          )}
        </TableCell>
      </TableRow>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledTableFooter>
  );
};

export default Footer;