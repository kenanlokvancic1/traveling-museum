import React from "react";
import { Delete } from "@mui/icons-material";
import {
  NotificationContainer,
  NotificationIcon,
  NotificationTextContainer,
  NotificationTitle,
  NotificationTimeAgo,
  NotificationActions,
  DeleteButton,
} from "./NotificationItem.styles";
import { formatTimestamp } from '../../../utils/dateUtils';
import { Typography } from '@mui/material';

const NotificationItem = ({ notification, onDelete, onOpenDetails, onStatusUpdate }) => {
  const { read, title, time, notification_id, details } = notification;

  const isCuratorRequest = () => {
    try {
      const parsedDetails = JSON.parse(details);
      return parsedDetails.type === "CURATOR_REQUEST";
    } catch (e) {
      return false;
    }
  };

  if (isCuratorRequest()) {
    return (
      <NotificationContainer read={read} onClick={() => onOpenDetails(notification)}>
          <NotificationIcon read={read} />
          <NotificationTextContainer>
          <NotificationTitle read={read}>
            {title}
          </NotificationTitle>
          <NotificationTimeAgo>{formatTimestamp(time)}</NotificationTimeAgo>
          </NotificationTextContainer>
          <Typography component="div" variant="body2" color="textSecondary">
            Click to view or respond
          </Typography>
        <NotificationActions>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification_id);
            }}
          >
            <Delete />
          </DeleteButton>
        </NotificationActions>
      </NotificationContainer>
    );
  }

  return (
    <NotificationContainer read={read} onClick={() => onOpenDetails(notification)}>
      <NotificationIcon read={read} />
      <NotificationTextContainer>
        <NotificationTitle read={read}>
          {title}
        </NotificationTitle>
        <NotificationTimeAgo>{formatTimestamp(time)}</NotificationTimeAgo>
      </NotificationTextContainer>
      <NotificationActions>
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification_id);
          }}
        >
          <Delete />
        </DeleteButton>
      </NotificationActions>
    </NotificationContainer>
  );
};

export default NotificationItem;
