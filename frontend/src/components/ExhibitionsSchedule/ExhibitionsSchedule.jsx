import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import {
  ScheduleContainer,
  ScheduleHeader,
  EventList,
  EventItem,
  EventTitle,
  EventDate,
} from "./ExhibitionsSchedule.styles";

const exhibitions = [
  { id: 1, title: "Impressionist Wonders", date: "2025-04-10" },
  { id: 2, title: "Modern Art Expo", date: "2025-04-15" },
  { id: 3, title: "Baroque Showcase", date: "2025-04-22" },
];

const ExhibitionSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [highlightedDays, setHighlightedDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const daysToHighlight = exhibitions.map((ex) => dayjs(ex.date).date());
    setHighlightedDays(daysToHighlight);
  }, []);

  const filtered = exhibitions.filter(
    (ex) =>
      dayjs(ex.date).format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")
  );

  const handleExhibitionClick = (id) => {
    navigate(`/exhibitions/${id}`);
  };

  const CustomDay = (props) => {
    const { day, outsideCurrentMonth } = props;
    const isHighlighted = highlightedDays.includes(day.date());

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={
          isHighlighted ? (
            <CircleIcon sx={{ fontSize: 16, color: "#8D5524" }} />
          ) : undefined
        }
      >
        <PickersDay {...props} outsideCurrentMonth={outsideCurrentMonth} />
      </Badge>
    );
  };

  return (
    <ScheduleContainer>
      <ScheduleHeader>Exhibition Schedule</ScheduleHeader>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={setSelectedDate}
          slots={{
            day: CustomDay,
          }}
        />
      </LocalizationProvider>
      <EventList>
        {filtered.length > 0 ? (
          filtered.map((event) => (
            <EventItem
              key={event.id}
              onClick={() => handleExhibitionClick(event.id)}
            >
              <EventTitle>{event.title}</EventTitle>
              <EventDate>{dayjs(event.date).format("MMMM D, YYYY")}</EventDate>
            </EventItem>
          ))
        ) : (
          <p>No exhibitions on this date.</p>
        )}
      </EventList>
    </ScheduleContainer>
  );
};

export default ExhibitionSchedule;
