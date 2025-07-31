import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
  TableSortLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import {
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../../api/UserApi";
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHeader,
  StyledTableCell,
  CenteredProgressContainer,
  ErrorText,
} from "./UserManagement.styles";
import FilterSection from "./FilterSection";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState(null);

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getAllUsers();
        setUsers(res);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to fetch users. Please try again.";
        setError(errorMessage);
        showSnackbar(errorMessage, "error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditedUserData(user);
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditedUserData({});
  };

  const handleInputChange = (field, value) => {
    setEditedUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = () => {
    setOpenUpdateDialog(true);
  };

  const confirmUpdate = async () => {
    try {
      const updatedUser = await updateUserByAdmin(editUserId, editedUserData);
      setUsers((prev) =>
        prev.map((user) => (user.id === editUserId ? updatedUser : user))
      );
      showSnackbar("User updated successfully!", "success");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update user. Please try again.";
      showSnackbar(errorMessage, "error");
      console.error(error);
    } finally {
      setOpenUpdateDialog(false);
      setEditUserId(null);
      setEditedUserData({});
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUserByAdmin(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      showSnackbar("User deleted successfully!", "success");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to delete user. Please try again.";
      showSnackbar(errorMessage, "error");
      console.error(error);
    } finally {
      setOpenDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    const sortedData = [...users].sort((a, b) =>
      isAsc
        ? String(a[property]).localeCompare(String(b[property]))
        : String(b[property]).localeCompare(String(a[property]))
    );
    setUsers(sortedData);
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleVerifiedFilterChange = (e) => {
    const val = e.target.value;
    setVerifiedFilter(val === "true" ? true : val === "false" ? false : null);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setVerifiedFilter(null);
  };

  const filteredData = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const verifiedMatch =
      verifiedFilter === null || user.isActive === verifiedFilter;
    return searchMatch && verifiedMatch;
  });

  if (loading) {
    return (
      <CenteredProgressContainer>
        <CircularProgress />
      </CenteredProgressContainer>
    );
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <>
      <StyledTableContainer component={Paper}>
        <FilterSection
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          verifiedFilter={verifiedFilter}
          onVerifiedFilterChange={handleVerifiedFilterChange}
          onResetFilters={handleResetFilters}
        />
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableHeader>Name</StyledTableHeader>
              <StyledTableHeader>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={order}
                  onClick={() => handleSort("email")}
                >
                  E-mail
                </TableSortLabel>
              </StyledTableHeader>
              <StyledTableHeader>Verified</StyledTableHeader>
              <StyledTableHeader>Mobile Number</StyledTableHeader>
              <StyledTableHeader>Address</StyledTableHeader>
              <StyledTableHeader>
                <TableSortLabel
                  active={orderBy === "role"}
                  direction={order}
                  onClick={() => handleSort("role")}
                >
                  Role
                </TableSortLabel>{" "}
              </StyledTableHeader>
              <StyledTableHeader>Actions</StyledTableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editUserId === user.id ? (
                    <TextField
                      variant="standard"
                      value={editedUserData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>

                <TableCell>{user.email}</TableCell>
                <StyledTableCell>
                  {user.isActive ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Cancel color="error" />
                  )}
                </StyledTableCell>
                <TableCell>
                  {editUserId === user.id ? (
                    <TextField
                      variant="standard"
                      value={editedUserData.mobile_number || ""}
                      onChange={(e) =>
                        handleInputChange("mobile_number", e.target.value)
                      }
                    />
                  ) : (
                    user.mobile_number || "-"
                  )}
                </TableCell>

                <TableCell>
                  {editUserId === user.id ? (
                    <TextField
                      variant="standard"
                      value={editedUserData.address || ""}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  ) : (
                    user.address || "-"
                  )}
                </TableCell>

                <TableCell>
                  {editUserId === user.id ? (
                    <Select
                      variant="standard"
                      value={editedUserData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                    >
                      <MenuItem value="admin">admin</MenuItem>
                      <MenuItem value="curator">curator</MenuItem>
                      <MenuItem value="user">user</MenuItem>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>

                <TableCell>
                  {editUserId === user.id ? (
                    <>
                      <IconButton
                        onClick={handleSaveClick}
                        sx={{ color: "#8D5524" }}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleCancelEdit}
                        sx={{ color: "error.main" }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(user)}
                        sx={{ color: "#8D5524" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(user)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      <Dialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
      >
        <DialogTitle>Save changes?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
          <Button onClick={confirmUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>
          Are you sure you want to delete user {selectedUser?.name}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
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
    </>
  );
};

export default UserManagement;
