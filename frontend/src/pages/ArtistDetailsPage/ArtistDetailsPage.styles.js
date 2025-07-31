import styled from "@emotion/styled";
import { Container, Box } from "@mui/material";

export const PageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const PageContainer = styled(Container)`
  flex: 1;
  padding-top: ${({ theme }) => theme.spacing(16)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: ${({ isCurator }) =>
    isCurator ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
`;
