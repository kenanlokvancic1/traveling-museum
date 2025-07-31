class FavoriteResponseDTO {
  constructor(favorite) {
    this.id = favorite.id;
    this.painting_id = favorite.painting_id;
    this.user_id = favorite.user_id;
  }
}

export default FavoriteResponseDTO;
