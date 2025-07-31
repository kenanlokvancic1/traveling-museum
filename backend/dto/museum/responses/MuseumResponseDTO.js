export default class MuseumResponseDto {
    constructor(museum) {
      this.id = museum.museum_id;
      this.name = museum.name;
      this.location = museum.location;
      this.website = museum.website;
      this.contact = museum.contact;
      this.description = museum.description;
      this.coordinates = museum.coordinates;
    }
  }
  