import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import {
  StyledFilterContainer,
  StyledSearchInput,
  StyledDropdownContainer,
} from "./FilterSection.styles";

const locations = [
  "All",
  "Museum of Modern Art, New York",
  "National Gallery, London",
  "Museo Reina Sofía, Madrid",
  "Louvre Museum, Paris",
  "Santa Maria delle Grazie, Milan",
  "Musée de l'Orangerie, Paris",
  "National Gallery, Oslo",
  "Belvedere Museum, Vienna",
];

const provenances = [
  "All",
  "Post-Impressionism",
  "Cubism",
  "Renaissance",
  "Impressionism",
  "Expressionism",
  "Symbolism",
  "Surrealism",
];

export function FilterSection({
  locationFilter,
  setLocationFilter,
  provenanceFilter,
  setProvenanceFilter,
  searchFilter,
  setSearchFilter,
}) {
  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleProvenanceChange = (e) => {
    setProvenanceFilter(e.target.value);
  };

  return (
    <StyledFilterContainer>
      <StyledDropdownContainer>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            onChange={handleLocationChange}
            label="Location"
            autoWidth
          >
            {locations.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Provenance</InputLabel>
          <Select
            value={provenanceFilter}
            onChange={handleProvenanceChange}
            label="Provenance"
            autoWidth
          >
            {provenances.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </StyledDropdownContainer>

      <StyledSearchInput
        label="Search"
        value={searchFilter}
        onChange={handleSearchChange}
        variant="outlined"
      />
    </StyledFilterContainer>
  );
}

export default FilterSection;
