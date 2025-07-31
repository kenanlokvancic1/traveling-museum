import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export const ScheduleContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  padding: "40px",
  gap: "30px",
  height: "100vh",
  paddingTop: "120px",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  overflow: "hidden",
});

export const ScheduleHeader = styled(Typography)({
  fontSize: "32px",
  fontWeight: "bold",
  color: "#8D5524",
});

export const StyledCalendar = styled(DateCalendar)({
  width: "100%",
  maxWidth: "850px",
  height: "600px",
  backgroundColor: "#fafafa",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",

  "& .MuiDayCalendar-monthContainer": {
    height: "900px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
  },

  "& .MuiDayCalendar-header": {
    fontSize: "1.5rem",
    width: "60px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },

  "& .MuiPickersDay-root": {
    width: "50px",
    height: "50px",
    fontSize: "1.3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  "& .MuiPickersDay-daySelected": {
    backgroundColor: "#C7BFAB",
    color: "#fff",
  },
});

export const EventList = styled(Box)({
  width: "100%",
  maxWidth: "850px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  paddingBottom: "10px",
});

export const EventItem = styled(Box)({
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    backgroundColor: "#C7BFAB",
    color: "#8D5524",
    transform: "scale(1.05)",
    cursor: "pointer",
  },
});

export const EventTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
});

export const EventDate = styled(Typography)({
  fontSize: "14px",
  color: "#666",
});
