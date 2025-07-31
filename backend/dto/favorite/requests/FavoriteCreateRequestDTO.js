class FavoriteCreateRequestDTO {
  constructor(data) {
    this.painting_id = data.painting_id;
    this.user_id = data.user_id;
  }
}

export default FavoriteCreateRequestDTO;
