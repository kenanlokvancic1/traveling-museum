import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { ProfileDetailsForm } from "../../components/ProfileDetails/ProfileDetailsForm";
import { Container, Box } from "@mui/material";
import { styles } from "./ProfileDetailsPage.styles";

const ProfileDetailsPage = () => {
  return (
    <Box style={styles.root}>
      <Container maxWidth="lg" style={styles.container}>
        <ProfileDetailsForm />
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfileDetailsPage;
