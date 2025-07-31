import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const AddReviewButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  borderRadius: 0,
  textTransform: "none",
}));
