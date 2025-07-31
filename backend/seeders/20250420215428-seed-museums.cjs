module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Museums", [
      {
        museum_id: 1,
        name: "National Museum of Art",
        location: "New York, USA",
        website: "www.nmofart.com",
        contact: "1234567890",
        description: "A museum of fine arts.",
        coordinates: "40.7128° N, 74.0060° W",
      },
      {
        museum_id: 2,
        name: "Louvre Museum",
        location: "Paris, France",
        website: "www.louvre.fr",
        contact: "9876543210",
        description: "World-renowned museum in Paris.",
        coordinates: "48.8606° N, 2.3376° E",
      },
      {
        museum_id: 3,
        name: "British Museum",
        location: "London, UK",
        website: "www.britishmuseum.org",
        contact: "02079423456",
        description: "The largest and most comprehensive museum in the world.",
        coordinates: "51.5194° N, 0.1270° W",
      },
      {
        museum_id: 4,
        name: "Uffizi Gallery",
        location: "Florence, Italy",
        website: "www.uffizi.it",
        contact: "0552388656",
        description:
          "Art gallery in Florence, Italy, home to the works of Michelangelo and Botticelli.",
        coordinates: "43.7667° N, 11.2545° E",
      },
      {
        museum_id: 5,
        name: "Vatican Museums",
        location: "Vatican City",
        website: "www.museivaticani.va",
        contact: "0669881",
        description: "A group of art museums in Vatican City.",
        coordinates: "41.9029° N, 12.4534° E",
      },
      {
        museum_id: 6,
        name: "Prado Museum",
        location: "Madrid, Spain",
        website: "www.museodelprado.es",
        contact: "913302800",
        description:
          "Spanish national art museum, known for works by Velázquez and Goya.",
        coordinates: "40.4138° N, 3.6921° W",
      },
      {
        museum_id: 7,
        name: "Rijksmuseum",
        location: "Amsterdam, Netherlands",
        website: "www.rijksmuseum.nl",
        contact: "0206747000",
        description:
          "Museum in Amsterdam with a collection of Dutch Golden Age paintings.",
        coordinates: "52.3600° N, 4.8852° E",
      },
      {
        museum_id: 8,
        name: "The Museum of Modern Art",
        location: "New York, USA",
        website: "www.moma.org",
        contact: "2127089400",
        description:
          "Museum of modern art, including works by Van Gogh and Picasso.",
        coordinates: "40.7614° N, 73.9776° W",
      },
      {
        museum_id: 9,
        name: "The Met",
        location: "New York, USA",
        website: "www.metmuseum.org",
        contact: "2125357710",
        description:
          "The Metropolitan Museum of Art, one of the largest and most prestigious art museums in the world.",
        coordinates: "40.7792° N, 73.9634° W",
      },
      {
        museum_id: 10,
        name: "State Hermitage Museum",
        location: "Saint Petersburg, Russia",
        website: "www.hermitagemuseum.org",
        contact: "8127109050",
        description:
          "A museum of art and culture, one of the largest in the world.",
        coordinates: "59.9398° N, 30.3146° E",
      },
      {
        museum_id: 11,
        name: "Art Institute of Chicago",
        location: "Chicago, USA",
        website: "www.artic.edu",
        contact: "3124433600",
        description:
          "Art museum known for its Impressionist and Post-Impressionist works.",
        coordinates: "41.8796° N, 87.6237° W",
      },
      {
        museum_id: 12,
        name: "The National Gallery",
        location: "London, UK",
        website: "www.nationalgallery.org.uk",
        contact: "02077470000",
        description:
          "The National Gallery houses over 2,300 paintings in the heart of London.",
        coordinates: "51.5074° N, 0.1278° W",
      },
      {
        museum_id: 13,
        name: "Museum of Contemporary Art",
        location: "Los Angeles, USA",
        website: "www.moca.org",
        contact: "2136266222",
        description: "Museum of contemporary art in Los Angeles.",
        coordinates: "34.0522° N, 118.2437° W",
      },
      {
        museum_id: 14,
        name: "National Gallery of Art",
        location: "Washington, USA",
        website: "www.nga.gov",
        contact: "2027374215",
        description:
          "The National Gallery houses a collection of European and American art.",
        coordinates: "38.8913° N, 77.0199° W",
      },
    ]);

  await queryInterface.sequelize.query(`
    SELECT setval('\"Museums_museum_id_seq\"', (SELECT MAX("museum_id") FROM "Museums"));
  `);
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete("Museums", null, {});
},
};
