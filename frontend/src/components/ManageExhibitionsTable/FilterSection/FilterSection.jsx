import { useState, useEffect } from "react";
import {
  StyledFilterContainer,
  StyledDateContainer,
  StyledSearchInput,
  StyledDateInputWrapper,
  StyledLabel,
  StyledStatusFilter,
  StyledStatusOption,
  StyledDateInput,
} from "./FilterSection.styles";

const statuses = ["All", "Completed", "Ongoing", "Upcoming"];

export function FilterSection({
  setData,
  originalData,
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  status,
  setStatus,
}) {
  useEffect(() => {
    const now = new Date();

    const transformedData = originalData.map((exhibition) => {
      const start = new Date(exhibition.start_date);
      const end = new Date(exhibition.end_date);

      let calculatedStatus = "Upcoming";
      if (end < now) {
        calculatedStatus = "Completed";
      } else if (start <= now && end >= now) {
        calculatedStatus = "Ongoing";
      }

      return {
        id: exhibition.exhibition_id,
        exhibition: exhibition.name,
        status: calculatedStatus,
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
        museum: exhibition.Museum ? exhibition.Museum.name : "Unknown",
        location: exhibition.Museum ? exhibition.Museum.location : "Unknown",
      };
    });

    let filtered = [...transformedData];

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.exhibition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (status !== "All") {
      filtered = filtered.filter((item) => item.status === status);
    }

    if (dateFilter.startDate !== "") {
      filtered = filtered.filter(
        (item) => new Date(item.endDate) >= new Date(dateFilter.startDate)
      );
    }

    if (dateFilter.endDate !== "") {
      filtered = filtered.filter(
        (item) => new Date(item.startDate) <= new Date(dateFilter.endDate)
      );
    }

    setData(filtered);
  }, [searchTerm, status, dateFilter, originalData, setData]);

  const handleStatusChange = (item) => {
    setStatus(item);
  };

  return (
    <StyledFilterContainer>
      <StyledDateContainer>
        <StyledDateInputWrapper>
          <StyledLabel>From</StyledLabel>
          <StyledDateInput
            type="date"
            value={dateFilter.startDate}
            onChange={(e) =>
              setDateFilter({ ...dateFilter, startDate: e.target.value })
            }
          />
        </StyledDateInputWrapper>
        <StyledDateInputWrapper>
          <StyledLabel>To</StyledLabel>
          <StyledDateInput
            type="date"
            value={dateFilter.endDate}
            onChange={(e) =>
              setDateFilter({ ...dateFilter, endDate: e.target.value })
            }
          />
        </StyledDateInputWrapper>
      </StyledDateContainer>

      <StyledSearchInput
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
      />

      <StyledStatusFilter>
        {statuses.map((item) => (
          <StyledStatusOption
            key={item}
            active={status === item}
            onClick={() => handleStatusChange(item)}
          >
            {item}
          </StyledStatusOption>
        ))}
      </StyledStatusFilter>
    </StyledFilterContainer>
  );
}

export default FilterSection;
