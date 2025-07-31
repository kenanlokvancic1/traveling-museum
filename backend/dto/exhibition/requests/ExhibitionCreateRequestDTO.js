export default class ExhibitionCreateRequestDTO {
  constructor({ name, start_date, end_date, museum_id, description, status }) {
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
    this.museum_id = museum_id;
    this.description = description;
    this.status = status;
  }
}
