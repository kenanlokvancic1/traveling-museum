import { createMuseum } from "../../api/MuseumApi";

export const submitMuseumForm = async (formData) => {
  try {
    const submissionData = {
      ...formData,
      coordinates: formData.coordinates
        ? formatCoordinatesForSubmission(formData.coordinates)
        : formData.coordinates,
    };

    const response = await createMuseum(submissionData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create museum",
    };
  }
};

export const validateMuseumData = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.location?.trim()) {
    errors.location = "Location is required.";
  }

  if (formData.website && !isValidUrl(formData.website)) {
    errors.website = "Enter a valid website URL.";
  }

  if (formData.contact && !isValidPhone(formData.contact)) {
    errors.contact = "Enter a valid contact number.";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required.";
  }

  if (formData.coordinates && !isValidCoordinates(formData.coordinates)) {
    errors.coordinates =
      "Enter valid coordinates in format: XX.XXXX° N/S, XX.XXXX° E/W";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidPhone = (phone) => {
  return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(phone);
};

const isValidCoordinates = (coords) => {
  // Match pattern like "40.7128° N, 74.0060° W"
  const pattern = /^-?\d+(\.\d+)?° [NS],\s*-?\d+(\.\d+)?° [EW]$/;
  return pattern.test(coords.trim());
};

const formatCoordinatesForSubmission = (coords) => {
  // Convert from "40.7128° N, 74.0060° W" to decimal format
  const parts = coords.split(",").map((part) => part.trim());

  let lat = parseFloat(parts[0]);
  let lng = parseFloat(parts[1]);

  // If South, make latitude negative
  if (parts[0].includes("S")) {
    lat = -lat;
  }

  // If West, make longitude negative
  if (parts[1].includes("W")) {
    lng = -lng;
  }

  return `${lat},${lng}`;
};
