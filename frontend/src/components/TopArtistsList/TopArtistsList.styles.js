import { styled } from "@mui/material/styles";
import { Box, List, ListItem } from "@mui/material";

export const ArtistListContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#F5F5F5",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.1)",
}));

export const ArtistItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: "#D8CFC0",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
}));

export const ArtistName = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: "#5D4037",
}));
