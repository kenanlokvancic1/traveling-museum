import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FilterSection } from "./FilterSection/FilterSection";
import ResetFilters from "../../components/common/ResetFilters";
import {
  StyledTableContainer,
  StyledTableHeader,
  StyledLink,
  ResetButtonContainer,
} from "./ManageExhibitionsTable.styles";
import { getAllExhibitions, deleteExhibition } from "../../api/ExhibitionApi";

const ManageExhibitionsTable = () => {
  const navigate = useNavigate();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("startDate");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exhibitionToDelete, setExhibitionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [status, setStatus] = useState("All");

  const formatDateToEuropean = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
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
    if (exhibitions) {
      const transformedData = exhibitions.map((exhibition) => ({
        id: exhibition.exhibition_id,
        exhibition: exhibition.name,
        status: exhibition.status,
        startDate: new Date(exhibition.start_date).toISOString().split("T")[0],
        endDate: new Date(exhibition.end_date).toISOString().split("T")[0],
        museum: exhibition.Museum ? exhibition.Museum.name : "Unknown",
        location: exhibition.Museum ? exhibition.Museum.location : "Unknown",
      }));
      setData(transformedData);
    }
  }, [exhibitions]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    const sortedData = [...data].sort((a, b) => {
      if (property === "startDate" || property === "endDate") {
        return isAsc
          ? new Date(a[property]) - new Date(b[property])
          : new Date(b[property]) - new Date(a[property]);
      }
      return isAsc
        ? a[property].localeCompare(b[property])
        : b[property].localeCompare(a[property]);
    });

    setData(sortedData);
  };

  const handleDeleteClick = (exhibition) => {
    setExhibitionToDelete(exhibition);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (exhibitionToDelete) {
      try {
        setLoading(true);
        await deleteExhibition(exhibitionToDelete.id);
        setExhibitions(
          exhibitions.filter((ex) => ex.exhibition_id !== exhibitionToDelete.id)
        );
        setDeleteDialogOpen(false);
        setExhibitionToDelete(null);
      } catch (err) {
        setError(err.message || "Failed to delete exhibition");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setExhibitionToDelete(null);
  };

  const handleEditClick = (id) => {
    navigate(`/exhibitions/${id}`);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateFilter({ startDate: "", endDate: "" });
    setStatus("All");

    const transformedData = exhibitions.map((exhibition) => ({
      id: exhibition.exhibition_id,
      exhibition: exhibition.name,
      status: exhibition.status,
      startDate: new Date(exhibition.start_date).toISOString().split("T")[0],
      endDate: new Date(exhibition.end_date).toISOString().split("T")[0],
      museum: exhibition.Museum ? exhibition.Museum.name : "Unknown",
      location: exhibition.Museum ? exhibition.Museum.location : "Unknown",
    }));
    setData(exhibitions);
  };

  if (loading && data.length === 0) {
    return (
      <StyledTableContainer>
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      </StyledTableContainer>
    );
  }

  if (error) {
    return (
      <StyledTableContainer>
        <Alert severity="error">{`Error loading exhibitions: ${error}`}</Alert>
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer>
      <ResetButtonContainer>
        <ResetFilters onClick={handleResetFilters} />
      </ResetButtonContainer>

      <FilterSection
        setData={setData}
        originalData={exhibitions}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        status={status}
        setStatus={setStatus}
      />

      <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHeader>Exhibition</StyledTableHeader>
              <StyledTableHeader>Status</StyledTableHeader>
              <StyledTableHeader>
                <TableSortLabel
                  active={orderBy === "startDate"}
                  direction={order}
                  onClick={() => handleSort("startDate")}
                >
                  Start Date
                </TableSortLabel>
              </StyledTableHeader>
              <StyledTableHeader>
                <TableSortLabel
                  active={orderBy === "endDate"}
                  direction={order}
                  onClick={() => handleSort("endDate")}
                >
                  End Date
                </TableSortLabel>
              </StyledTableHeader>
              <StyledTableHeader>Museum</StyledTableHeader>
              <StyledTableHeader>Actions</StyledTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.exhibition}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{formatDateToEuropean(row.startDate)}</TableCell>
                <TableCell>{formatDateToEuropean(row.endDate)}</TableCell>
                <TableCell>{row.museum}</TableCell>
                <TableCell>
                  <StyledLink to={`/exhibitions/${row.id}`}>View</StyledLink>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditClick(row.id)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(row)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Exhibition</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the exhibition "
            {exhibitionToDelete?.exhibition}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledTableContainer>
  );
};

export default ManageExhibitionsTable;
