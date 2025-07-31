export default class ExhibitionPaintingResponseDTO {
    constructor(entity) {
        this.exhibition_id = entity.exhibition_id;
        this.painting_id = entity.painting_id;

        
        // if (entity.Painting) {
        //     this.painting = {
        //         title: entity.Painting.title,
        //         artist_id: entity.Painting.artist_id,
        //         year: entity.Painting.year,
        //         medium: entity.Painting.medium,
        //         dimensions: entity.Painting.dimensions,
        //         image_url: entity.Painting.image_url,
        //         description: entity.Painting.description,
        //         location: entity.Painting.location,
        //         provenance: entity.Painting.provenance,
        //         shares: entity.Painting.shares,
        //     };
        // } else {
        //     this.painting = null;  
        // }
    }
}
