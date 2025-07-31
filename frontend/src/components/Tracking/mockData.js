const mockData = [
  {
    id: 1,
    title: "Impressionist Wonders",
    status: "in transport",
    destination: "Louvre, Paris",
    transportMethods: ["Air Freight", "Truck"],
    museum: "Louvre Museum",
    museumCoordinates: "48.8606,2.3376",
    paintings: [
      {
        title: "Sunset",
        image:
          "https://images.saatchiart.com/saatchi/703030/art/8367098/7431698-HSC00001-7.jpg",
      },
      {
        title: "Reflection",
        image:
          "https://rukminim3.flixcart.com/image/850/1000/jy7kyvk0/painting/h/2/g/p0670-paf-original-imafhnggafz8fcrd.jpeg?q=20&crop=false",
      },
    ],
  },
  {
    id: 2,
    title: "Modern Art Expo",
    status: "in warehouse",
    destination: "",
    transportMethods: [],
    museum: "",
    museumCoordinates: null,
    paintings: [],
  },
  {
    id: 3,
    title: "Baroque Showcase",
    status: "delivered",
    destination: "Uffizi Gallery, Florence",
    transportMethods: ["Train", "Courier"],
    museum: "Uffizi Gallery",
    museumCoordinates: "43.7687, 11.2558",
    paintings: [
      {
        title: "Saints",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Caravaggio_-_Saint_Matthew_and_the_Angel.jpg",
      },
      {
        title: "Angel",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Angel_Announcing_the_Birth_of_Christ.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Renaissance Wonders",
    status: "delivered",
    destination: "Vatican Museums, Vatican City",
    transportMethods: ["Air Freight"],
    museum: "Vatican Museums",
    museumCoordinates: { lat: 41.9029, lng: 12.4534 },
    paintings: [
      {
        title: "The School of Athens",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6c/Raphael_School_of_Athens.jpg",
      },
    ],
  },
  {
    id: 5,
    title: "Post-Impressionist Retreat",
    status: "in warehouse",
    destination: "Van Gogh Museum, Amsterdam",
    transportMethods: ["Ship", "Train"],
    museum: "Van Gogh Museum",
    museumCoordinates: { lat: 52.3584, lng: 4.8811 },
    paintings: [
      {
        title: "Starry Night",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/c6/Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      },
    ],
  },
  {
    id: 6,
    title: "Futuristic Art Exhibit",
    status: "in transport",
    destination: "Museum of Modern Art, New York",
    transportMethods: ["Air Freight"],
    museum: "Museum of Modern Art",
    museumCoordinates: { lat: 40.7614, lng: -73.9776 },
    paintings: [
      {
        title: "Les Demoiselles d'Avignon",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/Pablo_Picasso_-_Les_Demoiselles_d%27Avignon.jpg",
      },
    ],
  },
  {
    id: 7,
    title: "Impressionism on the Move",
    status: "delivered",
    destination: "Art Institute of Chicago",
    transportMethods: ["Courier"],
    museum: "Art Institute of Chicago",
    museumCoordinates: { lat: 41.8796, lng: -87.6237 },
    paintings: [
      {
        title: "Water Lilies",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6f/Monet_-_Water_Lilies_1906.jpg",
      },
    ],
  },
  {
    id: 8,
    title: "Cubism Showcase",
    status: "in warehouse",
    destination: "Tate Modern, London",
    transportMethods: ["Train"],
    museum: "Tate Modern",
    museumCoordinates: { lat: 51.5076, lng: -0.1276 },
    paintings: [
      {
        title: "Guernica",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/3/32/PicassoGuernica.jpg",
      },
    ],
  },
  {
    id: 9,
    title: "Surrealist Vision",
    status: "in transport",
    destination: "Salvador Dalí Museum, Florida",
    transportMethods: ["Air Freight", "Truck"],
    museum: "Salvador Dalí Museum",
    museumCoordinates: { lat: 27.7736, lng: -82.6368 },
    paintings: [
      {
        title: "The Persistence of Memory",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/d4/The_Persistence_of_Memory.jpg",
      },
    ],
  },
  {
    id: 10,
    title: "Abstract Expressionism",
    status: "delivered",
    destination: "Guggenheim Museum, New York",
    transportMethods: ["Truck", "Air Freight"],
    museum: "Guggenheim Museum",
    museumCoordinates: { lat: 40.783, lng: -73.959 },
    paintings: [
      {
        title: "No. 5, 1948",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/No_5%2C_1948%2C_by_Jackson_Pollock.jpg",
      },
    ],
  },
  {
    id: 11,
    title: "Ancient Egyptian Mysteries",
    status: "in warehouse",
    destination: "Egyptian Museum, Cairo",
    transportMethods: ["Ship"],
    museum: "Egyptian Museum",
    museumCoordinates: { lat: 30.0473, lng: 31.2331 },
    paintings: [
      {
        title: "The Death of Cleopatra",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a9/The_Death_of_Cleopatra.jpg",
      },
    ],
  },
  {
    id: 12,
    title: "Renaissance at its Peak",
    status: "delivered",
    destination: "Uffizi Gallery, Florence",
    transportMethods: ["Air Freight", "Train"],
    museum: "Uffizi Gallery",
    museumCoordinates: { lat: 43.7687, lng: 11.2558 },
    paintings: [
      {
        title: "The Birth of Venus",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/27/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project.jpg",
      },
    ],
  },
  {
    id: 13,
    title: "Famous Portraits",
    status: "in warehouse",
    destination: "National Gallery, London",
    transportMethods: ["Air Freight"],
    museum: "National Gallery",
    museumCoordinates: { lat: 51.5081, lng: -0.1281 },
    paintings: [
      {
        title: "Mona Lisa",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a7/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
      },
    ],
  },
  {
    id: 14,
    title: "The Art of the 20th Century",
    status: "in transport",
    destination: "Museum of Contemporary Art, Chicago",
    transportMethods: ["Ship"],
    museum: "Museum of Contemporary Art",
    museumCoordinates: { lat: 41.9109, lng: -87.6298 },
    paintings: [
      {
        title: "Campbell's Soup Cans",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/6e/Andy_Warhol%2C_Campbell%27s_Soup_Cans%2C_1962%2C_Collection_of_Museum_of_Modern_Art%2C_NY.jpg",
      },
    ],
  },
  {
    id: 15,
    title: "Avant-Garde Exhibition",
    status: "delivered",
    destination: "Centre Pompidou, Paris",
    transportMethods: ["Air Freight", "Courier"],
    museum: "Centre Pompidou",
    museumCoordinates: { lat: 48.8607, lng: 2.3522 },
    paintings: [
      {
        title: "Fountain",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/2/26/Ma%C3%AFtre_Fouet_-_Fountain.jpg",
      },
    ],
  },
];

export default mockData;
