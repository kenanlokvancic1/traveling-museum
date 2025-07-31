import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";

export const PageContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    marginBottom: theme.spacing(3),
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(13),
}));