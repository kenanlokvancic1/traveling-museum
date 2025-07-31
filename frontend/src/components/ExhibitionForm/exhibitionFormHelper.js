import { createExhibition, updateExhibition } from "../../api/ExhibitionApi";
import { getMuseums } from "../../api/MuseumApi";
import { getAllPaintings } from "../../api/PaintingApi";
import { createExhibitionPainting } from "../../api/ExhibitionPainting";

export const EXHIBITION_STATUSES = [
  "in warehouse",
  "in transport",
  "delivered",
];

export const submitExhibitionForm = async (formData, isEditing = false) => {
  try {
    const { isValid, errors } = validateExhibitionData(formData);
    if (!isValid) {
      return {
        success: false,
        error: Object.values(errors)[0],
      };
    }

    const submissionData = {
      name: formData.name.trim(),
      start_date: formData.startDate,
      end_date: formData.endDate,
      museum_id: parseInt(formData.museum, 10),
      description: formData.description ? formData.description.trim() : null,
      status: formData.status || "in warehouse",
    };

    const response = isEditing
      ? await updateExhibition(formData.id, submissionData)
      : await createExhibition(submissionData);

    if (!isEditing && formData.selectedPaintings?.length > 0) {
      await Promise.all(
        formData.selectedPaintings.map((paintingId) =>
          createExhibitionPainting(response.exhibition_id, paintingId)
        )
      );
    }

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error submitting exhibition form:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to save exhibition",
    };
  }
};

export const fetchMuseums = async () => {
  try {
    const response = await getMuseums();
    return response.data.map((museum) => ({
      id: museum.museum_id,
      name: museum.name,
    }));
  } catch (error) {
    console.error("Failed to fetch museums:", error);
    throw error;
  }
};

export const fetchPaintings = async () => {
  try {
    const response = await getAllPaintings();
    return response.map((painting) => ({
      id: painting.painting_id,
      title: painting.title,
      image_url: painting.image_url,
    }));
  } catch (error) {
    console.error("Failed to fetch paintings:", error);
    throw error;
  }
};

export const validateExhibitionData = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!formData.endDate) {
    errors.endDate = "End date is required";
  }

  if (!formData.museum) {
    errors.museum = "Museum is required";
  }

  if (!formData.status) {
    errors.status = "Status is required";
  } else if (!EXHIBITION_STATUSES.includes(formData.status)) {
    errors.status = "Invalid status selected";
  }

  if (formData.startDate && formData.endDate) {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (startDate >= endDate) {
      errors.endDate = "End date must be after start date";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
