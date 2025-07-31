import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { styles } from "./AccountDeletion.styles";
import {
  handleInitialDeletion,
  handleFinalAccountDeletion,
} from "./accountDeletionHelper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

const AccountDeletionModal = ({ open, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: null }));
    }
  };

  const handleConfirmToggle = (e) => {
    setConfirmDelete(e.target.checked);
    if (errors.confirmation) {
      setErrors((prev) => ({ ...prev, confirmation: null }));
    }
  };

  const handleInitialDeleteClick = () => {
    handleInitialDeletion(
      password,
      confirmDelete,
      setErrors,
      setLoading,
      setShowConfirmDialog
    );
  };

  const handleFinalDeleteClick = async () => {
    await handleFinalAccountDeletion(
      password,
      setLoading,
      setErrors,
      navigate,
      dispatch,
      logout
    );
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={loading ? null : onClose}
        slotProps={{
          paper: {
            style: styles.dialogPaper,
          },
        }}
      >
        <DialogContent>
          <Box sx={styles.titleContainer}>
            <WarningIcon sx={styles.warningIcon} />
            <Typography variant="h6" sx={styles.titleText}>
              Delete Account
            </Typography>
          </Box>

          <Typography sx={styles.description}>
            This action cannot be undone. Once your account is deleted, all your
            data will be permanently removed.
          </Typography>

          <Typography sx={styles.warningText}>
            To confirm deletion, please enter your password and check the
            confirmation box below.
          </Typography>

          <TextField
            sx={styles.passwordField}
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
            error={Boolean(errors.password)}
            helperText={errors.password}
            margin="normal"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={confirmDelete}
                onChange={handleConfirmToggle}
                disabled={loading}
              />
            }
            label="I understand that this action cannot be undone"
            sx={styles.confirmationCheckbox}
          />
          {errors.confirmation && (
            <Typography sx={styles.errorMessage}>
              {errors.confirmation}
            </Typography>
          )}

          {errors.general && (
            <Typography sx={styles.errorMessage}>{errors.general}</Typography>
          )}

          <Box sx={styles.buttonsContainer}>
            <Button
              sx={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={styles.deleteButton}
              onClick={handleInitialDeleteClick}
              disabled={loading || !confirmDelete}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Delete Account"
              )}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showConfirmDialog}
        onClose={loading ? null : () => setShowConfirmDialog(false)}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Are you absolutely sure?
          </Typography>
          <Typography>
            This action is irreversible and will permanently delete your
            account.
          </Typography>
          <Box sx={styles.confirmDialogButtons}>
            <Button
              onClick={loading ? null : () => setShowConfirmDialog(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFinalDeleteClick}
              variant="contained"
              disabled={loading}
              sx={styles.confirmDeleteButton}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Yes, delete"
              )}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountDeletionModal;