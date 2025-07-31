import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExhibitionReviews } from "../../../api/ReviewApi";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import {
  StyledTableContainer,
  StyledTableCell,
  DataTableCell,
  StyledLink,
} from "./ExhibitionsTable.styles";

const ExhibitionsTable = ({ filteredExhibitions }) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [exhibitionsWithRatings, setExhibitionsWithRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateMedian = (ratings) => {
    if (!ratings.length) return "-";
    const sorted = [...ratings].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? ((sorted[middle - 1] + sorted[middle]) / 2).toFixed(1)
      : sorted[middle].toFixed(1);
  };

  const calculateAverage = (ratings) => {
    if (!ratings.length) return "-";
    const sum = ratings.reduce((acc, curr) => acc + curr, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const formatDateToEuropean = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const exhibitionsWithRatingsData = await Promise.all(
          filteredExhibitions.map(async (exhibition) => {
            try {
              const reviews = await getExhibitionReviews(exhibition.id);
              const ratings = reviews.map(review => review.rating);
              
              return {
                ...exhibition,
                avgRating: calculateAverage(ratings),
                medianRating: calculateMedian(ratings)
              };
            } catch (error) {
              console.error(`Error fetching reviews for exhibition ${exhibition.id}:`, error);
              return {
                ...exhibition,
                avgRating: "-",
                medianRating: "-"
              };
            }
          })
        );
        setExhibitionsWithRatings(exhibitionsWithRatingsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [filteredExhibitions]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedExhibitions = [...exhibitionsWithRatings].sort((a, b) => {
    if (orderBy === "startDate" || orderBy === "endDate") {
      return order === "asc"
        ? new Date(a[orderBy]) - new Date(b[orderBy])
        : new Date(b[orderBy]) - new Date(a[orderBy]);
    }
    if (orderBy === "visitors") {
      return order === "asc"
        ? a.visitors - b.visitors
        : b.visitors - a.visitors;
    }
    if (orderBy === "avgRating" || orderBy === "medianRating") {
      return order === "asc"
        ? a[orderBy] === "-"
          ? -1
          : a[orderBy] - b[orderBy]
        : b[orderBy] === "-"
        ? -1
        : b[orderBy] - a[orderBy];
    }
    return 0;
  });

  if (loading) {
    return (
      <StyledTableContainer>
        <CircularProgress />
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Exhibition Name</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell
              sortDirection={orderBy === "startDate" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "startDate"}
                direction={order}
                onClick={() => handleSort("startDate")}
              >
                Start Date
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell
              sortDirection={orderBy === "endDate" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "endDate"}
                direction={order}
                onClick={() => handleSort("endDate")}
              >
                End Date
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sortDirection={orderBy === "avgRating" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "avgRating"}
                direction={order}
                onClick={() => handleSort("avgRating")}
              >
                Avg Rating
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sortDirection={orderBy === "medianRating" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "medianRating"}
                direction={order}
                onClick={() => handleSort("medianRating")}
              >
                Median Rating
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sortDirection={orderBy === "visitors" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "visitors"}
                direction={order}
                onClick={() => handleSort("visitors")}
              >
                Visitors
              </TableSortLabel>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedExhibitions.map((exhibition, index) => (
            <TableRow key={exhibition.id || index}>
              <DataTableCell>
                <StyledLink
                  onClick={() => navigate(`/exhibitions/${exhibition.id}`)}
                >
                  {exhibition.name}
                </StyledLink>
              </DataTableCell>
              <DataTableCell>{exhibition.status}</DataTableCell>
              <DataTableCell>{formatDateToEuropean(exhibition.startDate)}</DataTableCell>
              <DataTableCell>{formatDateToEuropean(exhibition.endDate)}</DataTableCell>
              <DataTableCell align="center">
                {exhibition.avgRating}
              </DataTableCell>
              <DataTableCell align="center">
                {exhibition.medianRating}
              </DataTableCell>
              <DataTableCell align="center">
                {exhibition.visitors.toLocaleString()}
              </DataTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default ExhibitionsTable;
