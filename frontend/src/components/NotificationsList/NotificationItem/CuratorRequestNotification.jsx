import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  updateCuratorRequestStatus,
  getCuratorRequestById,
} from "../../../api/CuratorRequestApi";
import { updateNotification } from "../../../api/NotificationApi";
import { getUserById } from "../../../api/UserApi";

const CuratorRequestNotification = ({
  notification,
  onStatusUpdate,
  inModal = false,
}) => {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [userName, setUserName] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const details = JSON.parse(notification.details);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getUserById(details.applicantId);
        setUserName(user.name);
      } catch (error) {
        console.error("Error fetching user name:", error);
        onStatusUpdate?.("Error fetching user details", "error");
      }
    };
    fetchUserName();
  }, [details.applicantId, onStatusUpdate]);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const request = await getCuratorRequestById(details.requestId);
        setRequestStatus(request?.status || null);
      } catch (error) {
        setRequestStatus("processed");
      }
    };
    fetchRequestDetails();
  }, [details.requestId]);

  const handleAction = async (status) => {
    try {
      await updateCuratorRequestStatus(details.requestId, status);
      await updateNotification(notification.notification_id, { read: true });
      setConfirmDialog(false);
      setRequestStatus(status);

      onStatusUpdate?.(
        `Curator request ${status} successfully. Email notification sent to the user.`,
        "success"
      );
    } catch (error) {
      console.error("Error updating request:", error);
      onStatusUpdate?.(
        error.response?.data?.message ||
          "Failed to update curator request status",
        "error"
      );
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const openConfirmDialog = (action) => {
    setActionType(action);
    setConfirmDialog(true);
  };

  return (
    <div>
      {inModal && requestStatus === "pending" && (
        <div style={{ marginTop: "16px" }}>
          <Button
            color="primary"
            onClick={() => openConfirmDialog("approve")}
            sx={{ mr: 1 }}
          >
            Approve
          </Button>
          <Button color="error" onClick={() => openConfirmDialog("reject")}>
            Reject
          </Button>
        </div>
      )}

      {inModal && requestStatus && requestStatus !== "pending" && (
        <Typography
          sx={{
            marginTop: "16px",
            color: requestStatus === "approved" ? "success.main" : "error.main",
            fontStyle: "italic",
          }}
        >
          This request has been {requestStatus}
        </Typography>
      )}

      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>
          {actionType === "approve" ? "Approve Request" : "Reject Request"}
        </DialogTitle>
        <DialogContent>
          <Typography component="div">
            Are you sure you want to {actionType} this curator request from{" "}
            {userName || "User"}?
            {actionType === "approve" &&
              " This will grant curator privileges to the user."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button
            color={actionType === "approve" ? "primary" : "error"}
            onClick={() =>
              handleAction(actionType === "approve" ? "approved" : "rejected")
            }
            autoFocus
          >
            Confirm {actionType}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CuratorRequestNotification;
