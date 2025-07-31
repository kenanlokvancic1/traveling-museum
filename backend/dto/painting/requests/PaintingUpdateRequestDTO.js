export default class PaintingUpdateRequestDTO {
  constructor({
    title,
    year,
    medium,
    dimensions,
    image_url,
    description,
    location,
    provenance,
    artist_id,
    shares,
  }) {
    this.title = title;
    this.year = year;
    this.medium = medium;
    this.dimensions = dimensions;
    this.image_url = image_url;
    this.description = description;
    this.location = location;
    this.provenance = provenance;
    this.artist_id = artist_id;
    this.shares = shares;
  }
}
