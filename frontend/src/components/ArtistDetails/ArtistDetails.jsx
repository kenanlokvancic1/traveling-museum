import {
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  Alert,
} from "@mui/material";
import { Edit, Save, Cancel, Share } from "@mui/icons-material";
import {
  StyledContainer,
  StyledImage,
  StyledDetails,
  StyledEditField,
  TopSection,
  HeaderBox,
  InfoWrapper,
  DatesText,
  BioText,
  ActionsBar,
  CuratorActionButtons,
  ArtistContentLayout,
  ArtistImageContainer,
} from "./ArtistDetails.styles";
import { useArtistEditor, isValidImageUrl } from "./artistDetailsHelper";

const ArtistDetails = ({ artist: initialArtist, isCurator, isLoggedIn }) => {
  const {
    isEditing,
    editedArtist,
    error,
    isLoading,
    artist,
    handleEditToggle,
    handleChange,
    handleCancelEdit,
    handleSave,
  } = useArtistEditor(initialArtist);

  if (!artist) {
    return <Typography>Loading artist details...</Typography>;
  }

  return (
    <StyledContainer>
      <TopSection>
        <HeaderBox>
          {isEditing ? (
            <TextField
              fullWidth
              label="Artist Name"
              value={editedArtist.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              variant="outlined"
              size="small"
              error={!editedArtist.name}
              helperText={!editedArtist.name && "Name is required"}
            />
          ) : (
            <Typography variant="h4" component="h1">
              {artist.name || "Unnamed Artist"}
            </Typography>
          )}
          <ActionsBar>
            <IconButton aria-label="Share artist">
              <Share />
            </IconButton>
            {isCurator && (
              <CuratorActionButtons>
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      startIcon={<Save />}
                      variant="outlined"
                      color="success"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      startIcon={<Cancel />}
                      variant="outlined"
                      color="error"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEditToggle}
                    startIcon={<Edit />}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                )}
              </CuratorActionButtons>
            )}
          </ActionsBar>
        </HeaderBox>
        <Divider />
      </TopSection>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ArtistContentLayout>
        <ArtistImageContainer>
          {isEditing ? (
            <>
              <StyledImage
                src={
                  editedArtist.image_url ||
                  "https://via.placeholder.com/500x300.png?text=No+Image"
                }
                alt={editedArtist.name || "Artist image"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x300.png?text=Invalid+Image+URL";
                }}
              />
              <TextField
                fullWidth
                label="Image URL"
                value={editedArtist.image_url || ""}
                onChange={(e) => {
                  const url = e.target.value.trim();
                  handleChange("image_url", url || null);
                }}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                placeholder="Enter image URL"
                helperText="Enter a valid image URL or leave empty to remove image"
                error={
                  editedArtist.image_url &&
                  !isValidImageUrl(editedArtist.image_url)
                }
              />
            </>
          ) : (
            <StyledImage
              src={
                artist.image_url ||
                "https://via.placeholder.com/500x300.png?text=No+Image"
              }
              alt={artist.name || "Artist image"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/500x300.png?text=Invalid+Image+URL";
              }}
            />
          )}
        </ArtistImageContainer>

        <InfoWrapper>
          <StyledDetails>
            {isEditing ? (
              <>
                <TextField
                  label="Birth Year"
                  type="number"
                  value={editedArtist.birth_year || ""}
                  onChange={(e) => handleChange("birth_year", e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                  error={!editedArtist.birth_year}
                  helperText={
                    !editedArtist.birth_year && "Birth year is required"
                  }
                />
                <TextField
                  label="Death Year (if applicable)"
                  type="number"
                  value={editedArtist.death_year || ""}
                  onChange={(e) => handleChange("death_year", e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <DatesText variant="h6">
                {artist.birth_year || "N/A"} - {artist.death_year || "Present"}
              </DatesText>
            )}

            {isEditing ? (
              <TextField
                label="Nationality"
                value={editedArtist.nationality || ""}
                onChange={(e) => handleChange("nationality", e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 2 }}
                error={!editedArtist.nationality}
                helperText={
                  !editedArtist.nationality && "Nationality is required"
                }
              />
            ) : (
              <Typography variant="body2" color="textSecondary" component="p">
                Nationality: {artist.nationality || "Not Available"}
              </Typography>
            )}

            {isEditing ? (
              <StyledEditField
                label="Biography"
                multiline
                minRows={6}
                value={editedArtist.biography || ""}
                onChange={(e) => handleChange("biography", e.target.value)}
                variant="outlined"
                fullWidth
              />
            ) : (
              <BioText component="p">
                {artist.biography || "No biography available."}
              </BioText>
            )}
          </StyledDetails>
        </InfoWrapper>
      </ArtistContentLayout>
    </StyledContainer>
  );
};

export default ArtistDetails;
