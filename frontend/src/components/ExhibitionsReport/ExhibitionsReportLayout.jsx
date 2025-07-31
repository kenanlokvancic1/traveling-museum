import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Box } from "@mui/material";
import ExhibitionsFilter from "./ExhibitionsFilter/ExhibitionsFilter";
import ExhibitionsTable from "./ExhibitionsTable/ExhibitionsTable";
import ExhibitionsStatusChart from "../ExhibitionsStatusChart/ExhibitionsStatusChart";
import TopRatedExhibitionsChart from "../TopRatedExhibitionsChart/TopRatedExhibitionsChart";
import ExhibitionsInsights from "../ExhibitionsInsights/ExhibitionsInsights";
import MonthlyActivityOverview from "../MonthlyActivityOverview/MonthlyActivityOverview";
import UpcomingExhibitionsTimeline from "../UpcomingExhibitionsTimeline";
import {
  ReportContainer,
  ReportTitle,
  FilterContainer,
  TableWrapper,
  LoaderWrapper,
  ErrorAlert,
} from "./ExhibitionsReportLayout.styles";
import { getAllExhibitions } from "../../api/ExhibitionApi";

const ExhibitionsReportLayout = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllExhibitions();
        setExhibitions(data);
      } catch (err) {
        setError(err.message || "Failed to fetch exhibitions");
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  useEffect(() => {
    if (exhibitions && exhibitions.length > 0) {
      const transformedData = exhibitions.map((exhibition) => {
        const avgRating =
          exhibition.status === "future"
            ? "-"
            : (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
        const medianRating =
          exhibition.status === "future"
            ? "-"
            : Math.round(parseFloat(avgRating));

        let visitors = 0;
        if (exhibition.status === "delivered") {
          visitors = Math.floor(Math.random() * 4500) + 500;
        } else if (
          exhibition.status === "in transport" ||
          exhibition.status === "in warehouse"
        ) {
          visitors = Math.floor(Math.random() * 1500) + 100;
        }

        let displayStatus = "Unknown";
        switch (exhibition.status) {
          case "delivered":
            displayStatus = "Completed";
            break;
          case "in transport":
          case "in warehouse":
            displayStatus = "Ongoing";
            break;
          default:
            const currentDate = new Date();
            const startDate = new Date(exhibition.start_date);
            if (startDate > currentDate) {
              displayStatus = "Upcoming";
            }
        }

        return {
          id: exhibition.exhibition_id,
          name: exhibition.name,
          status: displayStatus,
          startDate: new Date(exhibition.start_date)
            .toISOString()
            .split("T")[0],
          endDate: new Date(exhibition.end_date).toISOString().split("T")[0],
          avgRating,
          medianRating,
          visitors,
        };
      });

      setReportData(transformedData);
    }
  }, [exhibitions]);

  const filteredExhibitions = reportData.filter(
    (exhibition) =>
      exhibition.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (status === "" || exhibition.status === status)
  );

  if (loading && reportData.length === 0) {
    return (
      <ReportContainer maxWidth="lg">
        <ReportTitle variant="h4">Exhibitions Report</ReportTitle>
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      </ReportContainer>
    );
  }

  if (error) {
    return (
      <ReportContainer maxWidth="lg">
        <ReportTitle variant="h4">Exhibitions Report</ReportTitle>
        <ErrorAlert severity="error">
          Error loading exhibitions: {error}
        </ErrorAlert>
      </ReportContainer>
    );
  }

  return (
    <ReportContainer maxWidth="lg">
      <ReportTitle variant="h4">Exhibitions Report</ReportTitle>

      <FilterContainer>
        <ExhibitionsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          status={status}
          setStatus={setStatus}
        />
      </FilterContainer>

      <TableWrapper>
        <ExhibitionsTable filteredExhibitions={filteredExhibitions} />
      </TableWrapper>

      <Box sx={{ width: '100%', my: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ width: '48%', height: '100%' }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <ExhibitionsStatusChart />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ width: '48%', height: '100%' }}>
            <Box sx={{ height: '120%', width: '100%' }}>
              <TopRatedExhibitionsChart />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <UpcomingExhibitionsTimeline exhibitions={exhibitions} />
      <MonthlyActivityOverview />
      <ExhibitionsInsights />
    </ReportContainer>
  );
};

export default ExhibitionsReportLayout;
