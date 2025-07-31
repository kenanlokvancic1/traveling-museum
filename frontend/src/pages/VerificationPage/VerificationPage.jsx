import React from "react";
import { Box } from "@mui/material";
import VerificationScreen from "../../components/VerificationScreen";

const VerificationPage = () => {
  return (
    <Box>
      <VerificationScreen
        open={true}
        onClose={() => console.log("Closed!")}
        onVerify={(code) => console.log("Verified with code:", code)}
        onResend={() => console.log("Resending code...")}
      />
    </Box>
  );
};

export default VerificationPage;
