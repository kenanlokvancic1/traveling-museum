import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const ExhibitionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(3),
}));

export const ExhibitionImage = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "auto",
  marginBottom: theme.spacing(4),
}));
