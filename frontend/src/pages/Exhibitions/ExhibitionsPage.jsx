import React, { useState, useEffect } from "react";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import ExhibitionCard from "../../components/Exhibitions/ExhibitionCard";
import SearchBar from "../../components/common/SearchBar";
import ViewToggle from "../../components/common/ViewToggle";
import SortBySelect from "../../components/common/SortBySelect";
import FilterTabs from "../../components/common/FilterTabs";
import PaginationControls from "../../components/common/PaginationControls";
import ExhibitionGrid from "../../components/common/ExhibitionGrid";
import ControlsContainer from "../../components/common/ControlsContainer";
import ResetFilters from "../../components/common/ResetFilters";
import {
  PageContainer,
  PageHeader,
  PageTitle,
  StyledDivider,
  SearchContainer,
  RootBox,
  LoadingBox,
  ErrorAlert,
} from "./Exhibitions.styles";
import {
  filterTabs,
  sortOptions,
  filterExhibitions,
  getPaginatedExhibitions,
  getPageCount,
  mapExhibitionsData,
} from "./exhibitionsHelper";
import { getExhibitionsByTimeframe } from "../../api/ExhibitionApi";

const ExhibitionsPage = () => {
  const [timeframeData, setTimeframeData] = useState({
    current: [],
    past: [],
    future: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [exhibitions, setExhibitions] = useState([]);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getExhibitionsByTimeframe();
        setTimeframeData(data);

        const mappedData = await mapExhibitionsData(data);
        setExhibitions(mappedData);
      } catch (err) {
        setError(err.message || "Failed to fetch exhibitions");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  const handleLayoutChange = (event, newLayout) => {
    if (newLayout !== null) {
      setLayout(newLayout);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setPage(1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleResetFilters = () => {
    setLayout("grid");
    setPage(1);
    setFilter("all");
    setSearchTerm("");
    setSortBy("recent");
  };

  const filteredExhibitions = filterExhibitions(
    exhibitions,
    filter,
    searchTerm,
    sortBy
  );

  const paginatedExhibitions = getPaginatedExhibitions(
    filteredExhibitions,
    page,
    itemsPerPage
  );

  const pageCount = getPageCount(filteredExhibitions.length, itemsPerPage);

  const renderExhibitionCard = (exhibition) => (
    <ExhibitionCard exhibition={exhibition} layout={layout} />
  );

  return (
    <RootBox>
      <PageContainer>
        <PageHeader>
          <PageTitle variant="h3">Exhibitions</PageTitle>
          <Typography variant="subtitle1">
            Discover art exhibitions from around the world
          </Typography>
        </PageHeader>

        <ControlsContainer
          controls={[
            <ResetFilters key="reset-filters" onClick={handleResetFilters} />,
            <SortBySelect
              key="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              options={sortOptions}
            />,
            <ViewToggle
              key="view-toggle"
              value={layout}
              onChange={handleLayoutChange}
            />,
          ]}
        >
          <FilterTabs
            value={filter}
            onChange={handleFilterChange}
            tabs={filterTabs}
          />
        </ControlsContainer>

        <SearchContainer>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search exhibitions..."
          />
        </SearchContainer>

        <StyledDivider />

        {loading ? (
          <LoadingBox>
            <CircularProgress />
          </LoadingBox>
        ) : error ? (
          <ErrorAlert severity="error">
            Error loading exhibitions: {error}
          </ErrorAlert>
        ) : (
          <>
            <ExhibitionGrid
              items={paginatedExhibitions}
              layout={layout}
              renderItem={renderExhibitionCard}
            />

            <PaginationControls
              count={pageCount}
              page={page}
              onChange={handlePageChange}
            />
          </>
        )}
      </PageContainer>
      <Footer />
    </RootBox>
  );
};

export default ExhibitionsPage;
