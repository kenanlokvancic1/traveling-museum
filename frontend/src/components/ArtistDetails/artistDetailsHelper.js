import { useState } from "react";
import { updateArtist } from "../../api/ArtistApi";

export const isValidImageUrl = (url) => {
  if (!url) return true;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export const useArtistEditor = (initialArtist) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedArtist, setEditedArtist] = useState(initialArtist);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState(initialArtist);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedArtist(artist);
    setError(null);
  };

  const handleChange = (field, value) => {
    setEditedArtist((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError(null);
  };

  const handleCancelEdit = () => {
    setEditedArtist(artist);
    setIsEditing(false);
    setError(null);
  };

  const validateArtist = (artist) => {
    if (!artist.name?.trim()) return "Name is required";
    if (!artist.birth_year) return "Birth year is required";
    if (artist.death_year && artist.death_year < artist.birth_year) {
      return "Death year must be after birth year";
    }
    if (!artist.nationality?.trim()) return "Nationality is required";
    if (artist.image_url && !isValidImageUrl(artist.image_url)) {
      return "Please enter a valid image URL (http:// or https://)";
    }
    return null;
  };

  const handleSave = async () => {
    const validationError = validateArtist(editedArtist);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedArtist = {
        ...editedArtist,
        artist_id: artist.artist_id,
        death_year: editedArtist.death_year || null,
        image_url: editedArtist.image_url?.trim() || null,
      };

      const response = await updateArtist(artist.artist_id, updatedArtist);

      setArtist(response);
      setEditedArtist(response);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update artist");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEditing,
    editedArtist,
    error,
    isLoading,
    artist,
    handleEditToggle,
    handleChange,
    handleCancelEdit,
    handleSave,
  };
};
