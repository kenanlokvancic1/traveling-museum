export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${start} - ${end}`;
};

export const getStatusLabel = (status) => {
  switch (status) {
    case "past":
      return "Past";
    case "current":
      return "Current";
    case "future":
      return "Upcoming";
    default:
      return "";
  }
};

export const determineExhibitionStatus = (startDate, endDate) => {
  const today = new Date();
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  if (endDateObj < today) {
    return "past";
  }

  if (startDateObj > today) {
    const daysUntilStart = Math.floor(
      (startDateObj - today) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilStart >= 30) {
      return "future";
    }

    return "future";
  }

  return "current";
};
