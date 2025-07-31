import { useState, useEffect, useMemo, useCallback } from "react";
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
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  DialogContentText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FilterSection } from "./FilterSection/FilterSection";
import ResetFilters from "../../components/common/ResetFilters";
import {
  StyledTableContainer,
  StyledTableHeader,
  StyledLink,
  ResetButtonContainer,
} from "./ManagePaintingsTable.styles";
import { getAllPaintings } from "../../api/PaintingApi";
import { getArtistById } from "../../api/ArtistApi";

const ManagePaintingsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");

  const [searchFilter, setSearchFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [provenanceFilter, setProvenanceFilter] = useState("All");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchPaintings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const paintings = await getAllPaintings(1, 100);

      const paintingsWithArtistNames = await Promise.all(
        paintings.map(async (painting) => {
          try {
            const artist = await getArtistById(painting.artist_id);
            return {
              ...painting,
              artistName: artist.name,
            };
          } catch (err) {
            console.error(
              `Failed to fetch artist for painting ${painting.painting_id}`
            );
            return {
              ...painting,
              artistName: "Unknown Artist",
            };
          }
        })
      );

      setData(paintingsWithArtistNames);
    } catch (err) {
      setError("Failed to fetch paintings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaintings();
  }, [fetchPaintings]);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    const sorted = [...data].sort((a, b) =>
      isAsc
        ? a[property]?.localeCompare(b[property] || "")
        : b[property]?.localeCompare(a[property] || "")
    );
    setData(sorted);
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetFilters = () => {
    setSearchFilter("");
    setLocationFilter("All");
    setProvenanceFilter("All");
  };

  const openDeleteDialog = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setSelectedId(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setData(data.filter((item) => item.id !== selectedId));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      closeDeleteDialog();
    }
  };

  const filteredData = useMemo(() => {
    const searchLower = searchFilter.toLowerCase();
    return data.filter((row) => {
      const titleMatch = row.title?.toLowerCase().includes(searchLower);
      const artistMatch = row.artist_id?.toString().includes(searchLower);
      const locationMatch =
        locationFilter === "All" || row.location === locationFilter;
      const provenanceMatch =
        provenanceFilter === "All" || row.provenance === provenanceFilter;
      return (titleMatch || artistMatch) && locationMatch && provenanceMatch;
    });
  }, [data, searchFilter, locationFilter, provenanceFilter]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <StyledTableContainer>
      <ResetButtonContainer>
        <ResetFilters onClick={handleResetFilters} />
      </ResetButtonContainer>

      <FilterSection
        setData={setData}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        provenanceFilter={provenanceFilter}
        setProvenanceFilter={setProvenanceFilter}
      />

      <TableContainer component={Paper} sx={{ maxHeight: 480 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHeader>Painting</StyledTableHeader>
              <StyledTableHeader>Artist</StyledTableHeader>
              <StyledTableHeader>Location</StyledTableHeader>
              <StyledTableHeader>
                <TableSortLabel
                  active={orderBy === "provenance"}
                  direction={order}
                  onClick={() => handleSort("provenance")}
                >
                  Provenance
                </TableSortLabel>
              </StyledTableHeader>
              <StyledTableHeader>Details</StyledTableHeader>
              <StyledTableHeader>Actions</StyledTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.painting_id}>
                <TableCell>{row.title || "N/A"}</TableCell>
                <TableCell>
                  <StyledLink to={`/artists/${row.artist_id}`}>
                    {row.artistName || "Unknown Artist"}
                  </StyledLink>
                </TableCell>
                <TableCell>{row.location || "N/A"}</TableCell>
                <TableCell>{row.provenance || "N/A"}</TableCell>
                <TableCell>
                  <StyledLink to={`/artworks/${row.painting_id}`}>
                    View
                  </StyledLink>
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/artworks/${row.painting_id}`}
                    aria-label="edit"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(row.painting_id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this painting? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledTableContainer>
  );
};

export default ManagePaintingsTable;
