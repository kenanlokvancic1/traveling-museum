"use client";
import React, { useState, useEffect } from "react";
import { Modal, Typography } from "@mui/material";
import NotificationItem from "./NotificationItem/NotificationItem";
import {
  Container,
  Title,
  FilterContainer,
  FilterButton,
  ListContainer,
  ModalBox,
  ModalIcon,
  ModalTitle,
  ModalTimestamp,
  ModalDetails,
  CloseButton,
  StyledSnackbar,
  StyledAlert,
  NotificationContainer
} from "./NotificationsList.styles";
import { useNotifications } from "../../contexts/NotificationsContext";
import { formatTimestamp } from '../../utils/dateUtils';
import { getUserById } from "../../api/UserApi";
import CuratorRequestNotification from "./NotificationItem/CuratorRequestNotification";

const formatDetailTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', timestamp);
      return 'Invalid date';
    }
    
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};

const NotificationsList = () => {
  const { notifications, markAsRead, markAsUnread, deleteNotification } = useNotifications();
  const [filter, setFilter] = useState("All");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const handleOpenDetails = (notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.notification_id);
    }
  };

  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };

  const fetchUserDetails = async (userId) => {
    try {
      const user = await getUserById(userId);
      setUserDetails(prev => ({ ...prev, [userId]: user }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleNotificationUpdate = (message, severity) => {
    handleCloseDetails();
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const filteredNotifications = notifications
    .filter((notif) => {
      if (filter === "All") return true;
      const timeAgo = formatTimestamp(notif.time);
      return timeAgo === filter;
    })
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  const renderNotificationDetails = (notification) => {
    if (isCuratorRequest(notification)) {
      const parsedDetails = JSON.parse(notification.details);
      const applicantName = userDetails[parsedDetails.applicantId]?.name || 'Loading...';
      
      return (
        <ModalDetails>
          <div>
            <Typography variant="h6" component="div" gutterBottom>
              Curator Request Details
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              <strong>From:</strong> {applicantName} (User ID: {parsedDetails.applicantId})
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              <strong>Message:</strong> {parsedDetails.message}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              <strong>CV:</strong>{' '}
              <a href={parsedDetails.cv_url} target="_blank" rel="noopener noreferrer">
                View CV
              </a>
            </Typography>
            <CuratorRequestNotification 
              notification={notification}
              onStatusUpdate={handleNotificationUpdate}
              inModal={true}
            />
          </div>
        </ModalDetails>
      );
    }
    return <ModalDetails>{notification.details}</ModalDetails>;
  };

  const isCuratorRequest = (notification) => {
    try {
      const parsedDetails = JSON.parse(notification.details);
      return parsedDetails.type === "CURATOR_REQUEST";
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (selectedNotification && isCuratorRequest(selectedNotification)) {
      const parsedDetails = JSON.parse(selectedNotification.details);
      if (parsedDetails.applicantId && !userDetails[parsedDetails.applicantId]) {
        fetchUserDetails(parsedDetails.applicantId);
      }
    }
  }, [selectedNotification]);

  return (
    <NotificationContainer>
      <Container>
        <Title>
          Notifications
        </Title>

        <FilterContainer>
          {["All", "Today", "Yesterday", "Last Week", "Last Month"].map((category) => (
            <FilterButton key={category} active={filter === category} onClick={() => setFilter(category)}>
              {category}
            </FilterButton>
          ))}
        </FilterContainer>

        <ListContainer>
          {filteredNotifications.map((notif) => (
            <NotificationItem
              key={notif.notification_id}
              notification={notif}
              onMarkUnread={() => markAsUnread(notif.notification_id)}
              onDelete={() => deleteNotification(notif.notification_id)}
              markAsRead={markAsRead}
              onOpenDetails={() => handleOpenDetails(notif)}
            />
          ))}
        </ListContainer>

        <Modal open={!!selectedNotification} onClose={handleCloseDetails}>
          <ModalBox>
            {selectedNotification && (
              <>
                <ModalIcon />
                <ModalTitle>{selectedNotification.title}</ModalTitle>
                <ModalTimestamp>
                  {formatDetailTimestamp(selectedNotification.time)}
                </ModalTimestamp>
                {renderNotificationDetails(selectedNotification)}
                <CloseButton onClick={handleCloseDetails}>Close</CloseButton>
              </>
            )}
          </ModalBox>
        </Modal>

        <StyledSnackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <StyledAlert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </StyledAlert>
        </StyledSnackbar>
      </Container>
    </NotificationContainer>
  );
};

export default NotificationsList;
