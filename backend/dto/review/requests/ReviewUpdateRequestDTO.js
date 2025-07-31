class ReviewUpdateRequestDTO {
  constructor(data) {
    if (data.rating !== undefined) {
      this.rating = data.rating;
    }
    if (data.comment !== undefined) {
      this.comment = data.comment;
    }
    if (data.user_id !== undefined) {
      this.user_id = data.user_id;
    }
    if (data.exhibition_id !== undefined) {
      this.exhibition_id = data.exhibition_id;
    }
  }
}

export default ReviewUpdateRequestDTO;
