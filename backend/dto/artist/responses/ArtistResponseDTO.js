export default class ArtistResponseDTO {
  constructor(artist) {
    this.artist_id = artist.artist_id;
    this.name = artist.name;
    this.birth_year = artist.birth_year;
    this.death_year = artist.death_year;
    this.nationality = artist.nationality;
    this.biography = artist.biography;
    this.image_url = artist.image_url;
  }
}
