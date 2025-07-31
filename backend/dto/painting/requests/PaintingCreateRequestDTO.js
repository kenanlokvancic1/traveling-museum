export default class PaintingCreateRequestDTO {
    constructor({ title, artist_id, year, medium, dimensions, image_url, description, location, provenance }) {
      this.title = title;
      this.artist_id = artist_id;
      this.year = year;
      this.medium = medium;
      this.dimensions = dimensions;
      this.image_url = image_url;
      this.description = description;
      this.location = location;
      this.provenance = provenance;
    }
  }
  

  