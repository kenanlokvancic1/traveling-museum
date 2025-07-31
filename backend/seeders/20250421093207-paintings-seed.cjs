"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const timestamp = new Date();

    await queryInterface.bulkInsert(
      "Paintings",
      [
        {
          painting_id: 1,
          title: "Starry Night",
          artist_id: 2,
          year: 1889,
          medium: "Oil on canvas",
          dimensions: "73.7 cm × 92.1 cm",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
          description:
            "One of Van Gogh's most famous works, depicting a starry night over a sleepy town.",
          location: "Museum of Modern Art, New York",
          provenance: "Post-Impressionism",
          shares: 0,
        },
        {
          painting_id: 2,
          title: "Sunflowers",
          artist_id: 2,
          year: 1888,
          medium: "Oil on canvas",
          dimensions: "92.1 cm × 73.7 cm",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg",
          description:
            "A famous series of paintings by Van Gogh featuring sunflowers in a vase.",
          location: "National Gallery, London",
          provenance: "Post-Impressionism",
          shares: 0,
        },
        {
          painting_id: 3,
          title: "Guernica",
          artist_id: 1,
          year: 1937,
          medium: "Oil on canvas",
          dimensions: "349 cm × 776 cm",
          image_url:
            "https://cdn.britannica.com/79/91479-050-24F98E12/Guernica-canvas-Pablo-Picasso-Madrid-Museo-Nacional-1937.jpg",
          description:
            "A powerful anti-war piece by Picasso that depicts the bombing of the Basque town of Guernica.",
          location: "Museo Reina Sofía, Madrid",
          provenance: "Cubism",
          shares: 0,
        },
        {
          painting_id: 4,
          title: "Les Demoiselles d’Avignon",
          artist_id: 1,
          year: 1907,
          medium: "Oil on canvas",
          dimensions: "243.9 cm × 233.7 cm",
          image_url:
            "https://www.moma.org/media/W1siZiIsIjQzODQ1MiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MTQ0MFx1MDAzZSJdXQ.jpg?sha=8b2a1c3992bba555",
          description:
            "A revolutionary painting by Picasso that helped to define Cubism.",
          location: "Museum of Modern Art, New York",
          provenance: "Cubism",
          shares: 0,
        },
        {
          painting_id: 5,
          title: "Mona Lisa",
          artist_id: 4,
          year: 1503,
          medium: "Oil on poplar panel",
          dimensions: "77 cm × 53 cm",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/330px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
          description:
            "Perhaps the most famous painting in the world, featuring a woman with a mysterious smile.",
          location: "Louvre Museum, Paris",
          provenance: "Renaissance",
          shares: 0,
        },
        {
          painting_id: 6,
          title: "The Last Supper",
          artist_id: 4,
          year: 1495,
          medium: "Tempera on gesso, pitch, and mastic",
          dimensions: "460 cm × 880 cm",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/1200px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
          description:
            "A depiction of the final meal shared by Jesus and his disciples before his crucifixion.",
          location: "Santa Maria delle Grazie, Milan",
          provenance: "Renaissance",
          shares: 0,
        },
        {
          painting_id: 7,
          title: "Water Lilies",
          artist_id: 3,
          year: 1916,
          medium: "Oil on canvas",
          dimensions: "200 cm × 400 cm",
          image_url:
            "https://collectionapi.metmuseum.org/api/collection/v1/iiif/438008/preview",
          description:
            "Monet's famous depiction of his garden's water lilies in various lighting conditions.",
          location: "Musée de l'Orangerie, Paris",
          provenance: "Impressionism",
          shares: 0,
        },
        {
          painting_id: 8,
          title: "The Scream",
          artist_id: 12,
          year: 1893,
          medium: "Oil, tempera, and pastel on cardboard",
          dimensions: "91 cm × 73.5 cm",
          image_url:
            "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
          description:
            "An iconic representation of existential anguish and despair.",
          location: "National Gallery, Oslo",
          provenance: "Expressionism",
          shares: 0,
        },
        {
          painting_id: 9,
          title: "The Kiss",
          artist_id: 6,
          year: 1907,
          medium: "Oil and gold leaf on canvas",
          dimensions: "180 cm × 180 cm",
          image_url:
            "https://ideyka.com.ua/files/resized/products/4534.1800x1800.jpg",
          description:
            "A symbol of love and intimacy, with ornate gold patterns.",
          location: "Belvedere Museum, Vienna",
          provenance: "Symbolism",
          shares: 0,
        },
        {
          painting_id: 10,
          title: "The Persistence of Memory",
          artist_id: 5,
          year: 1931,
          medium: "Oil on canvas",
          dimensions: "24 cm × 33 cm",
          image_url:
            "https://cdn.britannica.com/96/240496-138-66D89FAD/Salvador-Dali-Persistence-of-Memory.jpg",
          description:
            "Dali's surreal depiction of melting clocks in a dream-like landscape.",
          location: "Museum of Modern Art, New York",
          provenance: "Surrealism",
          shares: 0,
        },
      ],
      {}
    );
    // Reset the sequence to the max painting_id
    await queryInterface.sequelize.query(`
          SELECT setval('"Paintings_painting_id_seq"', (SELECT MAX(painting_id) FROM "Paintings"));
        `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Paintings", null, {});
  },
};
