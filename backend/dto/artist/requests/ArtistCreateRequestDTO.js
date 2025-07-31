export default class ArtistCreateRequestDTO {
  constructor({ name, birth_year, death_year, nationality, biography, image_url}) {
    this.name = name;
    this.birth_year = birth_year;
    this.death_year = death_year;
    this.nationality = nationality || null; 
    this.biography = biography || null;
    this.image_url = image_url || null;
  }
}
