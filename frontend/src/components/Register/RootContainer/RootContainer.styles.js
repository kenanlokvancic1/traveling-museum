import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledRootContainer = styled(Box)(({ theme }) => ({
  width: "50%",

  margin: "75px auto 40px",
  display: "flex",
  border: "1px solid #000",
  backgroundColor: "#D9D9D9",
  [theme.breakpoints.down("md")]: {
    width: "75%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    flexDirection: "column",
    margin: "20px auto",
    maxHeight: "75vh",
  },
}));
