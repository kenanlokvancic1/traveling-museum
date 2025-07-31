import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  InputAdornment,
  Tooltip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";

import { getMyProfile, updateMyProfile } from "../../api/UserApi";

import { StyledTextField } from "../common/StyleTextField/StyleTextField";
import { StyledButton } from "../common/StyledButton/StyledButton";
import {
  styles,
  ProfileAvatar,
  ProfileTitle,
  SaveButton,
} from "./ProfileDetails.styles";

import Modal from "./Modal/Modal";
import { PasswordChangeForm, PasswordResetForm } from "../PasswordManagement";
import { AccountDeletionModal } from "../AccountDeletion";
import { logoutUser } from "../../api/AuthApi";

export const ProfileDetailsForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    mobile_number: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] =
    useState(false);
  const [showAccountDeletionModal, setShowAccountDeletionModal] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setFormData({
          email: data.email || "",
          name: data.name || "",
          address: data.address || "",
          mobile_number: data.mobile_number || "",
        });
        setOriginalData(data);
      } catch (err) {
        console.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field) => (e) => {
    if (field !== "email") {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirmDialog(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const updatedData = {
        name: formData.name,
        address: formData.address,
        mobile_number: formData.mobile_number,
      };
      await updateMyProfile(updatedData);
      setStatusMessage({
        text: "Profile updated successfully!",
        success: true,
      });
    } catch (err) {
      setStatusMessage({ text: "Failed to update profile.", success: false });
    } finally {
      setOpenConfirmDialog(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Box style={styles.mainContainer}>
      <Box style={styles.header}>
        <Box style={styles.avatarSection}>
          <ProfileAvatar>
            <Typography variant={styles.headerTypography.variant}>
              {formData.name?.charAt(0) || "?"}
            </Typography>
          </ProfileAvatar>
          <ProfileTitle variant={styles.titleTypography.variant}>
            My Profile
          </ProfileTitle>
        </Box>
      </Box>

      {statusMessage && (
        <Box
          style={
            statusMessage.success ? styles.successMessage : styles.errorMessage
          }
        >
          <Typography>{statusMessage.text}</Typography>
        </Box>
      )}

      <Box component="form" style={styles.form} onSubmit={handleSubmit}>
        <Grid container direction="column" style={styles.formSection}>
          <Grid item xs={12}>
            <Box style={styles.inputGroup}>
              <Typography variant={styles.linkTypography.variant}>
                Mail
              </Typography>
              <Tooltip title="Email cannot be changed" placement="top">
                <StyledTextField
                  fullWidth
                  type="email"
                  value={formData.email}
                  disabled
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <BlockIcon color="disabled" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-root": { cursor: "not-allowed" },
                    "& .MuiInputBase-input": { cursor: "not-allowed" },
                  }}
                />
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box style={styles.inputGroup}>
              <Typography variant={styles.linkTypography.variant}>
                Profile Name
              </Typography>
              <StyledTextField
                fullWidth
                value={formData.name}
                onChange={handleChange("name")}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box style={styles.inputGroup}>
              <Typography variant={styles.linkTypography.variant}>
                Address
              </Typography>
              <StyledTextField
                fullWidth
                value={formData.address}
                onChange={handleChange("address")}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box style={styles.inputGroup}>
              <Typography variant={styles.linkTypography.variant}>
                Telephone
              </Typography>
              <StyledTextField
                fullWidth
                value={formData.mobile_number}
                onChange={handleChange("mobile_number")}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <SaveButton>
              <StyledButton variant="contained" type="submit">
                Save Changes
              </StyledButton>
            </SaveButton>
          </Grid>
        </Grid>
      </Box>

      <Divider style={styles.divider} />

      <Stack spacing={styles.linksStack.spacing} style={styles.linksStack}>
        <Typography component={Link} to="/favourites" style={styles.link}>
          My Favorites
        </Typography>
        <Typography
          component="button"
          onClick={() => setShowPasswordChangeModal(true)}
          style={styles.logoutButton}
        >
          Password Management
        </Typography>
        <Typography
          component="button"
          onClick={() => setShowAccountDeletionModal(true)}
          style={styles.logoutButton}
        >
          Delete Account
        </Typography>
        <Typography
          component="button"
          onClick={handleLogout}
          style={styles.logoutButton}
        >
          Log Out
        </Typography>
      </Stack>

      {showPasswordChangeModal && (
        <Modal onClose={() => setShowPasswordChangeModal(false)}>
          <PasswordChangeForm
            onSubmit={() => setShowPasswordChangeModal(false)}
            onForgotPassword={() => {
              setShowPasswordChangeModal(false);
              setShowPasswordResetModal(true);
            }}
          />
        </Modal>
      )}

      {showPasswordResetModal && (
        <Modal onClose={() => setShowPasswordResetModal(false)}>
          <PasswordResetForm
            onSubmit={() => setShowPasswordResetModal(false)}
            onCancel={() => setShowPasswordResetModal(false)}
          />
        </Modal>
      )}

      {showNotificationSettingsModal && (
        <Modal onClose={() => setShowNotificationSettingsModal(false)}>
          <NotificationSettingsForm
            onClose={() => setShowNotificationSettingsModal(false)}
          />
        </Modal>
      )}

      <AccountDeletionModal
        open={showAccountDeletionModal}
        onClose={() => setShowAccountDeletionModal(false)}
      />

      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save these changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmUpdate}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
