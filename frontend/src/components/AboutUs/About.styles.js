import { styled } from "@mui/material/styles";
import { Box, Typography, Container } from "@mui/material";

export const AboutWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#C7BFAB",
  padding: theme.spacing(15, 2),
}));

export const StyledContainer = styled(Container)({
  maxWidth: "xl",
});

export const AboutContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    width: "40%",
    marginBottom: 0,
    marginRight: theme.spacing(2),
  },
}));

export const MainImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  display: "block",
  marginBottom: "10px",
}));

export const Caption = styled(Typography)(({ theme }) => ({
  marginTop: "4px",
  color: "black",
  textAlign: "center",
}));

export const RightContent = styled(Box)(({ theme }) => ({
  width: "100%",
  color: "black",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    width: "55%",
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}));

export const ContactText = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const BoldEmailText = styled(Typography)({
  fontWeight: "bold",
});
