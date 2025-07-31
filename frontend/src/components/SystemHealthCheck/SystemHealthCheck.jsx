import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { SystemHealthCheckContainer, SystemHealthTitle, StatusContainer } from "./SystemHealthCheck.styles";

const mockSystemStatus = {
  serverStatus: "Running",
  databaseStatus: "Online",
  apiStatus: "Operational",
  cpuUsage: 50, 
};

const SystemHealthCheck = () => {
  return (
    <SystemHealthCheckContainer>
      <SystemHealthTitle>System Health Check</SystemHealthTitle>
      <StatusContainer>
        <Typography variant="h6">Server: {mockSystemStatus.serverStatus}</Typography>
        <Typography variant="h6">Database: {mockSystemStatus.databaseStatus}</Typography>
        <Typography variant="h6">API: {mockSystemStatus.apiStatus}</Typography>
        <Typography variant="h6">CPU Usage: {mockSystemStatus.cpuUsage}%</Typography>
        <CircularProgress variant="determinate" value={mockSystemStatus.cpuUsage} />
      </StatusContainer>
    </SystemHealthCheckContainer>
  );
};

export default SystemHealthCheck;
