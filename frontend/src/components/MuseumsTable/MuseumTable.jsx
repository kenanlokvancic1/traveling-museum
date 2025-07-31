import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Title,
  AddButton,
  StyledTableContainer,
  StyledTableHeadCell,
  StyledTableCell,
} from "./MuseumTable.styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RoomIcon from "@mui/icons-material/Room";
import { Save } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MapDialog from "./MapDialog/MapDialog";
import { getMuseums, deleteMuseum, updateMuseum } from "../../api/MuseumApi";
import CancelIcon from "@mui/icons-material/Cancel";

const MuseumTable = () => {
  const [data, setData] = useState([]);
  const [openMap, setOpenMap] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState("");
  const [selectedMuseumName, setSelectedMuseumName] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [museumToDelete, setMuseumToDelete] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchMuseums();
  }, []);

  const fetchMuseums = async () => {
    try {
      const response = await getMuseums();
      setData(response.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to fetch museums. Please try again.";
      showSnackbar(errorMessage, "error");
      console.error("Failed to fetch museums:", error);
    }
  };

  const handleDelete = (museum_id) => {
    setMuseumToDelete(museum_id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMuseum(museumToDelete);
      fetchMuseums();
      setOpenDeleteDialog(false);
      showSnackbar("Museum deleted successfully!", "success");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to delete museum. Please try again.";
      showSnackbar(errorMessage, "error");
      console.error("Failed to delete museum:", error);
    }
  };

  const handleEdit = (museum) => {
    setIsEditing(museum.museum_id);
    setEditData({ ...museum });
  };

  const handleSave = async () => {
    try {
      await updateMuseum(editData.museum_id, editData);
      fetchMuseums();
      setIsEditing(null);
      setOpenSaveDialog(false);
      showSnackbar("Museum updated successfully!", "success");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update museum. Please try again.";
      showSnackbar(errorMessage, "error");
      console.error("Failed to save museum:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((museum) =>
    museum.name.toLowerCase().includes(searchQuery)
  );

  const handleOpenMap = (coordinates, museumName) => {
    setSelectedCoordinates(coordinates);
    setSelectedMuseumName(museumName);
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
    setSelectedCoordinates("");
    setSelectedMuseumName("");
  };

  const handleAddMuseum = () => {
    navigate("/museum-form");
  };

  const handleCancelSave = () => {
    setOpenSaveDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Container>
      <Header>
        <Title>Museums</Title>
      </Header>

      <TextField
        label="Search Museums"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        style={{ marginBottom: "16px" }}
      />

      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Location</StyledTableHeadCell>
              <StyledTableHeadCell>Website</StyledTableHeadCell>
              <StyledTableHeadCell>Contact</StyledTableHeadCell>
              <StyledTableHeadCell>Description</StyledTableHeadCell>
              <StyledTableHeadCell>Map</StyledTableHeadCell>
              <StyledTableHeadCell>Actions</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((museum) => (
              <TableRow key={museum.museum_id}>
                <StyledTableCell>
                  {isEditing === museum.museum_id ? (
                    <TextField
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    museum.name
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  {isEditing === museum.museum_id ? (
                    <TextField
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    museum.location
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  {isEditing === museum.museum_id ? (
                    <TextField
                      name="website"
                      value={editData.website}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    <a
                      href={
                        museum.website
                          ? museum.website.startsWith("http://") ||
                            museum.website.startsWith("https://")
                            ? museum.website
                            : `https://${museum.website}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#8D5524" }}
                    >
                      {museum.website || "N/A"}
                    </a>
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  {isEditing === museum.museum_id ? (
                    <TextField
                      name="contact"
                      value={editData.contact}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    museum.contact
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  {isEditing === museum.museum_id ? (
                    <TextField
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                      fullWidth
                    />
                  ) : (
                    museum.description
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  {museum.coordinates ? (
                    <IconButton
                      onClick={() =>
                        handleOpenMap(museum.coordinates, museum.name)
                      }
                    >
                      <RoomIcon color="primary" />
                    </IconButton>
                  ) : (
                    "N/A"
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  {isEditing === museum.museum_id ? (
                    <>
                      <IconButton onClick={() => setOpenSaveDialog(true)}>
                        <Save style={{ color: "#8D5524" }} />
                      </IconButton>
                      <IconButton onClick={() => setIsEditing(null)}>
                        <CancelIcon style={{ color: "#f44336" }} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(museum)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(museum.museum_id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </>
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <AddButton
        onClick={handleAddMuseum}
        variant="contained"
        startIcon={<AddCircle />}
      >
        Add Museum
      </AddButton>

      <MapDialog
        open={openMap}
        onClose={handleCloseMap}
        coordinates={selectedCoordinates}
        museumName={selectedMuseumName}
      />

      <Dialog open={openSaveDialog} onClose={handleCancelSave}>
        <DialogTitle>Save Changes?</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to save the changes?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSave} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Museum?</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this museum?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MuseumTable;
