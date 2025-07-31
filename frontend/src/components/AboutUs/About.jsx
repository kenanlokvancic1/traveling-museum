import React from "react";
import { Typography } from "@mui/material";
import {
  AboutWrapper,
  StyledContainer,
  AboutContentWrapper,
  ImageBox,
  MainImage,
  Caption,
  RightContent,
  ContactText,
  BoldEmailText,
} from "./About.styles";

const About = () => {
  return (
    <AboutWrapper>
      <StyledContainer>
        <AboutContentWrapper>
          <ImageBox>
            <MainImage
              src="/src/assets/images/ourmuseum.webp"
              alt="Main Museum"
            />
            <Caption variant="subtitle1">Our Museum</Caption>
          </ImageBox>

          <RightContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Our Mission
            </Typography>

            <Typography variant="body1">
              Traveling Museum is a platform designed to make art and culture
              more accessible by enabling museums to host traveling exhibitions
              and loan artwork from one another. We believe that great art
              shouldn't be confined to a single location—our goal is to help
              institutions share their collections, collaborate on exhibits, and
              reach audiences far beyond their walls. Whether it's a small local
              gallery or a large national museum, Traveling Museum provides the
              tools to organize, manage, and promote temporary exhibitions with
              ease. By connecting institutions, we foster cultural exchange,
              broaden exposure for artists and collections, and create enriching
              experiences for communities everywhere.
            </Typography>

            <ContactText>
              <Typography variant="body1">
                If you want to host our exhibition, contact us on
              </Typography>
              <BoldEmailText variant="body1" component="span">
                info@travelingmuseum.com
              </BoldEmailText>
            </ContactText>
          </RightContent>
        </AboutContentWrapper>
      </StyledContainer>
    </AboutWrapper>
  );
};

export default About;
