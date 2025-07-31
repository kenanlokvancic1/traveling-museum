import { Typography, Rating, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ReviewContainer,
  ReviewHeader,
  UserContainer,
  ReviewActions,
  ReviewText,
} from "./ReviewItem.style";

function ReviewItem({
  review,
  isUserReview = false,
  canEdit = false,
  isAdmin = false,
  onEdit,
  onDelete,
}) {
  const handleEdit = (event) => {
    event.preventDefault();
    onEdit();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(review.review_id);
  };

  return (
    <ReviewContainer>
      <ReviewHeader>
        <UserContainer>
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {review.username || "Anonymous"}
            </Typography>
            {isUserReview && (
              <Typography variant="caption" color="text.secondary">
                (Your Review)
              </Typography>
            )}
          </Box>
        </UserContainer>

        <Box display="flex" alignItems="center">
          <Rating value={review.rating} precision={1} readOnly size="small" />
          <ReviewActions>
            {canEdit && (
              <IconButton
                size="small"
                onClick={handleEdit}
                aria-label="edit review"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            {(canEdit || isAdmin) && (
              <IconButton
                size="small"
                onClick={handleDelete}
                aria-label="delete review"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </ReviewActions>
        </Box>
      </ReviewHeader>

      <ReviewText variant="body2">{review.comment}</ReviewText>
    </ReviewContainer>
  );
}

export default ReviewItem;
