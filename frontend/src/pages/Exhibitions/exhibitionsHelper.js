import { getExhibitionAverageRating } from "../../api/ReviewApi";
import { getPaintingsByExhibition } from "../../api/ExhibitionPainting";

const DEFAULT_FALLBACK_IMAGES = {
  current:
    "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  past: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  future:
    "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
};

const formatDate = (dateString) =>
  new Date(dateString).toISOString().split("T")[0];

const fetchRatingData = async (exhibitionId) => {
  try {
    const ratingData = await getExhibitionAverageRating(exhibitionId);
    return {
      rating: parseFloat(ratingData.averageRating),
      reviewCount: ratingData.totalReviews,
    };
  } catch (error) {
    console.error(
      `Error fetching rating for exhibition ${exhibitionId}:`,
      error
    );
    return { rating: 0, reviewCount: 0 };
  }
};

const fetchFirstPaintingImage = async (exhibitionId, fallbackImage) => {
  try {
    const paintings = await getPaintingsByExhibition(exhibitionId);
    if (paintings && paintings.length > 0) {
      return paintings[0].image_url || fallbackImage;
    }
  } catch (error) {
    console.error(
      `Error fetching paintings for exhibition ${exhibitionId}:`,
      error
    );
  }
  return fallbackImage;
};

const mapExhibitionsByStatus = async (exhibitions, status) => {
  return Promise.all(
    exhibitions.map(async (exhibition) => {
      const ratingData = await fetchRatingData(exhibition.exhibition_id);
      const fallbackImage = DEFAULT_FALLBACK_IMAGES[status];
      const imageUrl = await fetchFirstPaintingImage(
        exhibition.exhibition_id,
        fallbackImage
      );

      return {
        id: exhibition.exhibition_id,
        title: exhibition.name,
        imageUrl,
        startDate: formatDate(exhibition.start_date),
        endDate: formatDate(exhibition.end_date),
        location: exhibition.Museum
          ? `${exhibition.Museum.name}, ${exhibition.Museum.location}`
          : "Unknown",
        rating: ratingData.rating,
        reviewCount: ratingData.reviewCount,
        status,
        description: exhibition.description,
      };
    })
  );
};

export const mapExhibitionsData = async (timeframeData) => {
  const allExhibitions = [];

  if (timeframeData.current) {
    const currentMapped = await mapExhibitionsByStatus(
      timeframeData.current,
      "current"
    );
    allExhibitions.push(...currentMapped);
  }

  if (timeframeData.past) {
    const pastMapped = await mapExhibitionsByStatus(timeframeData.past, "past");
    allExhibitions.push(...pastMapped);
  }

  if (timeframeData.future) {
    const futureMapped = await mapExhibitionsByStatus(
      timeframeData.future,
      "future"
    );
    allExhibitions.push(...futureMapped);
  }

  return allExhibitions;
};

export const filterTabs = [
  { value: "all", label: "All Exhibitions" },
  { value: "current", label: "Current" },
  { value: "future", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "rating", label: "Highest Rated" },
  { value: "az", label: "A-Z" },
];

export const filterExhibitions = (exhibitions, filter, searchTerm, sortBy) => {
  let filtered = [...exhibitions];

  if (filter !== "all") {
    filtered = filtered.filter((exhibition) => exhibition.status === filter);
  }

  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (exhibition) =>
        exhibition.title.toLowerCase().includes(lowerSearch) ||
        exhibition.location.toLowerCase().includes(lowerSearch)
    );
  }

  switch (sortBy) {
    case "rating":
      filtered = filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "recent":
      filtered = filtered.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      break;
    case "az":
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return filtered;
};

export const getPaginatedExhibitions = (exhibitions, page, itemsPerPage) => {
  return exhibitions.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};

export const getPageCount = (totalCount, itemsPerPage) => {
  return Math.ceil(totalCount / itemsPerPage);
};
