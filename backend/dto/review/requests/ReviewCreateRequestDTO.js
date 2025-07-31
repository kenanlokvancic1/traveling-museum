class ReviewCreateRequestDTO {
  constructor(data) {
    this.user_id = data.user_id;
    this.exhibition_id = data.exhibition_id;
    this.rating = data.rating;
    this.comment = data.comment;
  }
}

export default ReviewCreateRequestDTO;
