"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Exhibitions", [
      {
        exhibition_id: 1,
        name: "Impressionist Wonders",
        start_date: new Date("2025-05-01"),
        end_date: new Date("2025-07-15"),
        museum_id: 1,
        description:
          "A collection of late 19th-century Impressionist paintings.",
        status: "in warehouse",
      },
      {
        exhibition_id: 2,
        name: "Modern Abstractions",
        start_date: new Date("2025-06-01"),
        end_date: new Date("2025-08-30"),
        museum_id: 2,
        description: "Bold colors and abstract forms from the 20th century.",
        status: "in transport",
      },
      {
        exhibition_id: 3,
        name: "European Masters",
        start_date: new Date("2025-07-10"),
        end_date: new Date("2025-09-20"),
        museum_id: 1,
        description:
          "Showcasing timeless works from renowned European artists.",
        status: "delivered",
      },
      {
        exhibition_id: 4,
        name: "Renaissance Revival",
        start_date: new Date("2025-04-20"),
        end_date: new Date("2025-06-10"),
        museum_id: 3,
        description: "Exploring the art of the Renaissance era.",
        status: "in warehouse",
      },
      {
        exhibition_id: 5,
        name: "Surreal Dreams",
        start_date: new Date("2025-05-15"),
        end_date: new Date("2025-07-01"),
        museum_id: 2,
        description: "A dive into the world of surrealist painters.",
        status: "in transport",
      },
      {
        exhibition_id: 6,
        name: "Colors of Nature",
        start_date: new Date("2025-06-05"),
        end_date: new Date("2025-08-10"),
        museum_id: 1,
        description: "Landscapes and natural beauty captured in paint.",
        status: "delivered",
      },
      {
        exhibition_id: 7,
        name: "Portraits Through Time",
        start_date: new Date("2025-05-20"),
        end_date: new Date("2025-07-30"),
        museum_id: 3,
        description: "A look at portraiture from classical to modern eras.",
        status: "in warehouse",
      },
      {
        exhibition_id: 8,
        name: "Baroque Brilliance",
        start_date: new Date("2025-04-25"),
        end_date: new Date("2025-06-25"),
        museum_id: 2,
        description: "Dramatic and grandiose art from the Baroque period.",
        status: "in transport",
      },
      {
        exhibition_id: 9,
        name: "Romantic Echoes",
        start_date: new Date("2025-06-15"),
        end_date: new Date("2025-08-25"),
        museum_id: 1,
        description: "Artworks expressing emotion, nature, and individualism.",
        status: "delivered",
      },
      {
        exhibition_id: 10,
        name: "Minimalism in Focus",
        start_date: new Date("2025-05-10"),
        end_date: new Date("2025-06-30"),
        museum_id: 3,
        description: "Exploration of minimalist movements in art.",
        status: "in warehouse",
      },
      {
        exhibition_id: 11,
        name: "Cubist Explorations",
        start_date: new Date("2025-07-01"),
        end_date: new Date("2025-09-01"),
        museum_id: 1,
        description: "Geometric abstraction from Picasso to modern artists.",
        status: "in transport",
      },
      {
        exhibition_id: 12,
        name: "Futurism Forward",
        start_date: new Date("2025-06-20"),
        end_date: new Date("2025-08-15"),
        museum_id: 2,
        description: "Dynamic and forward-thinking artworks of futurists.",
        status: "delivered",
      },
      {
        exhibition_id: 13,
        name: "Neo-Classic Visions",
        start_date: new Date("2025-04-18"),
        end_date: new Date("2025-06-18"),
        museum_id: 3,
        description: "Return to classical forms in modern interpretations.",
        status: "in warehouse",
      },
      {
        exhibition_id: 14,
        name: "Symbolism Unveiled",
        start_date: new Date("2025-05-25"),
        end_date: new Date("2025-07-20"),
        museum_id: 2,
        description: "Myth and meaning in symbolic artworks.",
        status: "in transport",
      },
      {
        exhibition_id: 15,
        name: "Postmodern Perspectives",
        start_date: new Date("2025-07-05"),
        end_date: new Date("2025-09-10"),
        museum_id: 1,
        description: "Diverse and eclectic works of postmodern artists.",
        status: "delivered",
      },
    ]);

    await queryInterface.sequelize.query(`
          SELECT setval('"Exhibitions_exhibition_id_seq"', (SELECT MAX(exhibition_id) FROM "Exhibitions"));
        `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Exhibitions", null, {});
  },
};
