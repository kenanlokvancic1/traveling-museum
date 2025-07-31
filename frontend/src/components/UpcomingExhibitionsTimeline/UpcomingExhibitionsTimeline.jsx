import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { Typography, CircularProgress } from "@mui/material";
import { TimelineContainer, TimelineTitle, TimelineDate } from "./UpcomingExhibitionsTimeline.styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getAllExhibitions } from "../../api/ExhibitionApi";

const UpcomingExhibitionsTimeline = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        setLoading(true);
        const allExhibitions = await getAllExhibitions();
        
        const currentDate = dayjs();
        const upcomingExhibitions = allExhibitions
          .filter(exhibition => dayjs(exhibition.start_date).isAfter(currentDate))
          .sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)))
          .slice(0, 4); 

        setExhibitions(upcomingExhibitions);
      } catch (err) {
        console.error("Error fetching exhibitions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  if (loading) {
    return (
      <TimelineContainer>
        <TimelineTitle><CalendarMonthIcon/> Upcoming Exhibitions</TimelineTitle>
        <CircularProgress />
      </TimelineContainer>
    );
  }

  if (error) {
    return (
      <TimelineContainer>
        <TimelineTitle><CalendarMonthIcon/> Upcoming Exhibitions</TimelineTitle>
        <Typography color="error">Error loading exhibitions: {error}</Typography>
      </TimelineContainer>
    );
  }

  return (
    <TimelineContainer>
      <TimelineTitle><CalendarMonthIcon/> Upcoming Exhibitions</TimelineTitle>
      <Timeline>
        {exhibitions.map((exhibition, index) => {
          const daysLeft = dayjs(exhibition.start_date).diff(dayjs(), "day");
          const duration = dayjs(exhibition.end_date).diff(dayjs(exhibition.start_date), "day");
          
          return (
            <TimelineItem key={exhibition.exhibition_id}>
              <TimelineSeparator>
                <TimelineDot sx={{ bgcolor: '#8B7355' }} />
                {index < exhibitions.length - 1 && <TimelineConnector sx={{ bgcolor: '#8B7355' }} />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1" fontWeight={600}>{exhibition.name}</Typography>
                <TimelineDate>
                  {dayjs(exhibition.start_date).format("MMMM D, YYYY")} ({daysLeft} days left)
                </TimelineDate>
                <Typography variant="caption" color="textSecondary">
                  Duration: {duration} days
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </TimelineContainer>
  );
};

export default UpcomingExhibitionsTimeline;
