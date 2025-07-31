import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const SelectExhibition = ({
  exhibitions,
  selectedExhibition,
  setSelectedExhibition,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="exhibition-select-label">Select Exhibition</InputLabel>
      <Select
        labelId="exhibition-select-label"
        id="exhibition-select"
        value={selectedExhibition ?? ""}
        onChange={(e) => setSelectedExhibition(e.target.value || null)}
        label="Select Exhibition"
      >
        <MenuItem value="">
          <Typography sx={{ fontStyle: "bold" }}>All Exhibitions</Typography>
        </MenuItem>
        {exhibitions.map((exhibition) => (
          <MenuItem
            key={exhibition.exhibition_id}
            value={exhibition.exhibition_id}
          >
            {exhibition.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectExhibition;
