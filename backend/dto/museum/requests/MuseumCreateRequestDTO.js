export default class MuseumCreateRequestDto {
    constructor({ name, location, website, contact, description, coordinates }) {
      if (!name || !location) {
        throw new Error('Name and location are required.');
      }
  
      this.name = name;
      this.location = location;
      this.website = website || null;
      this.contact = contact || null;
      this.description = description || null;
      this.coordinates = coordinates || null;
    }
  }
  