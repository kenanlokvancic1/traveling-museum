export default class ExhibitionResponseDTO {
  constructor(exhibition) {
    this.exhibition_id = exhibition.exhibition_id;
    this.name = exhibition.name;
    this.start_date = exhibition.start_date;
    this.end_date = exhibition.end_date;
    this.museum_id = exhibition.museum_id;
    this.description = exhibition.description;
    this.status = exhibition.status;

    if (exhibition.Museum) {
      this.Museum = {
        name: exhibition.Museum.name,
        location: exhibition.Museum.location,
      };
    }
  }
}
