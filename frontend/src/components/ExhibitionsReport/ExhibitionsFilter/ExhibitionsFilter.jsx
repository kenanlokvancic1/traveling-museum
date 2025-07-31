import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { filterStyles } from "./ExhibitionsFilter.styles";

const ExhibitionsFilter = ({ searchTerm, setSearchTerm, status, setStatus }) => {
  return (
    <Box sx={filterStyles.container}>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TextField
        select
        label="Filter by Status"
        variant="outlined"
        fullWidth
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Ongoing">Ongoing</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Upcoming">Upcoming</MenuItem>
      </TextField>
    </Box>
  );
};

export default ExhibitionsFilter;
