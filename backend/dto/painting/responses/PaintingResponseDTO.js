export default class PaintingResponseDTO {
  constructor(painting) {
    this.painting_id = painting.painting_id;
    this.title = painting.title;
    this.artist_id = painting.artist_id;
    this.year = painting.year;
    this.medium = painting.medium;
    this.dimensions = painting.dimensions;
    this.image_url = painting.image_url;
    this.description = painting.description;
    this.location = painting.location;
    this.provenance = painting.provenance;
    this.shares = painting.shares;
    this.createdAt = painting.createdAt;
    this.updatedAt = painting.updatedAt;
  }
}
