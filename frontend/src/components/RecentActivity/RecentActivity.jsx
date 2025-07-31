import React from "react";
import { Card, CardContent, Typography, List, ListItem, Divider } from "@mui/material";
import { recentActivityStyles } from "./RecentActivity.styles";

const activities = [
  "Exhibition 'Modern Art' opened in Paris.",
  "New artist 'Jane Doe' joined the museum.",
  "Painting 'Sunset' added to the collection.",
  "User 'John Smith' registered.",
  "Painting 'The Starry Night' added to the collection.",
];

const RecentActivity = () => {
  return (
    <Card sx={recentActivityStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={recentActivityStyles.title}>
          Recent Activity
        </Typography>
        <List>
          {activities.map((activity, index) => (
            <React.Fragment key={index}>
              <ListItem sx={recentActivityStyles.item}>{activity}</ListItem>
              {index < activities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
