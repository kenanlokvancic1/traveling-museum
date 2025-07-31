import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  StyledContainer,
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
  StyledImage,
} from "./Reports&AnalyticsPage.styles";

const ReportsAnalyticsPage = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledCard onClick={() => navigate("/exhibitions-report")}>
        <StyledImage src="/src/assets/images/exhibition1.jpg" alt="Exhibitions" />
        <StyledCardActionArea>
          <StyledCardContent>
            <Typography variant="h4">Exhibitions Reports</Typography>
            <Typography variant="body1">
              Dive into exhibition analytics and detailed data.
            </Typography>
          </StyledCardContent>
        </StyledCardActionArea>
      </StyledCard>

      <StyledCard onClick={() => navigate("/paintings-report")}>
        <StyledImage src="/src/assets/images/car1.jpg" alt="Paintings" />
        <StyledCardActionArea>
          <StyledCardContent>
            <Typography variant="h4">Paintings Reports</Typography>
            <Typography variant="body1">
              Explore visual insights and painting stats.
            </Typography>
          </StyledCardContent>
        </StyledCardActionArea>
      </StyledCard>
    </StyledContainer>
  );
};

export default ReportsAnalyticsPage;
