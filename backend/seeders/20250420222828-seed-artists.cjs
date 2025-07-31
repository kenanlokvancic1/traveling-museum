"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    await queryInterface.bulkInsert(
      "Artists",
      [
        {
          artist_id: 1,
          name: "Pablo Picasso",
          birth_year: 1881,
          death_year: 1973,
          nationality: "Spanish",
          biography:
            'Pablo Picasso was one of the most influential artists of the 20th century. He is best known for co-founding the Cubist movement, inventing constructed sculpture, and creating collage. Picasso spent much of his life in France, where he developed many of his most famous works, including "Guernica," a mural that depicts the horrors of the Spanish Civil War.',
          image_url: "https://polska-costa.com/img/article/2024/09/17272637541791",
        },
        {
          artist_id: 2,
          name: "Vincent van Gogh",
          birth_year: 1853,
          death_year: 1890,
          nationality: "Dutch",
          biography:
            "Vincent van Gogh was a Dutch Post-Impressionist painter who is among the most famous and influential figures in the history of Western art. Despite only producing around 2,100 artworks, including about 860 oil paintings, his use of color and bold brushwork influenced many artists and gave way to modern art movements. Van Gogh struggled with mental health issues throughout his life, culminating in his tragic suicide.",
          image_url: "https://media.vogue.fr/photos/5c8a55363d44a0083ccbef54/1:1/w_4287,h_4287,c_limit/GettyImages-625257378.jpg",
        },
        {
          artist_id: 3,
          name: "Claude Monet",
          birth_year: 1840,
          death_year: 1926,
          nationality: "French",
          biography:
            "Claude Monet was a French painter and a founder of the Impressionist movement. Monet is best known for his landscapes, particularly his series on water lilies, the Japanese bridge, and the houses of Parliament. He broke away from traditional methods of painting and instead focused on capturing the effects of light and atmosphere, revolutionizing the art world and changing the way we view the natural world.",
          image_url: "https://cdn.britannica.com/57/250457-050-342611AD/Claude-Monet-French-Impressionist-painter.jpg",
        },
        {
          artist_id: 4,
          name: "Leonardo da Vinci",
          birth_year: 1452,
          death_year: 1519,
          nationality: "Italian",
          biography:
            'Leonardo da Vinci was an Italian Renaissance polymath who is widely considered one of the greatest painters of all time. He was also a scientist, engineer, and inventor, leaving behind notebooks filled with sketches, designs, and observations. His most famous works, such as "Mona Lisa" and "The Last Supper," have had an immeasurable impact on art history, and his studies in anatomy, flight, and engineering demonstrate his forward-thinking intellect.',
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxEfo_-2PDOOAEM45KvlnS5m6fX9M3V86cug&s",
        },
        {
          artist_id: 5,
          name: "Salvador Dalí",
          birth_year: 1904,
          death_year: 1989,
          nationality: "Spanish",
          biography:
            'Salvador Dalí was a prominent Spanish surrealist artist known for his eccentric and imaginative works. Dalí sought to challenge the conventions of art and reality, drawing on his dreams and subconscious to create bizarre and often provocative images. His most famous painting, "The Persistence of Memory," features melting clocks and is an iconic representation of the surrealist movement.',
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEly0Jts91GTbxP-gp3edbyLHZm8Z5Pe17oA&s",
        },
        {
          artist_id: 6,
          name: "Frida Kahlo",
          birth_year: 1907,
          death_year: 1954,
          nationality: "Mexican",
          biography:
            'Frida Kahlo was a Mexican painter known for her deeply personal and emotive self-portraits. Her work is celebrated for its exploration of identity, postcolonialism, gender, and class. Kahlo’s physical pain, caused by a near-fatal bus accident and numerous surgeries, is often reflected in her symbolic, vivid works. "The Two Fridas" and "Self-Portrait with Thorn Necklace and Hummingbird" are among her most iconic pieces.',
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLiI7O-xBwbWTOQ24k4BpKbXbM1gjD0n8zg&s",
        },
        {
          artist_id: 7,
          name: "Jackson Pollock",
          birth_year: 1912,
          death_year: 1956,
          nationality: "American",
          biography:
            'Jackson Pollock was an American painter and a leading figure in the abstract expressionist movement. Pollock is best known for his "drip" paintings, where he allowed paint to be poured or dripped onto a canvas, creating large, chaotic, yet mesmerizing works. His innovative use of space and form radically altered the landscape of modern art. "No. 5, 1948" is one of his most famous works.',
          image_url: "https://sothebys-com.brightspotcdn.com/e5/5c/00d849a348a49f038ce0ad401a1b/jackson-pollock-working-in-his-studio.jpg",
        },
        {
          artist_id: 8,
          name: "Andy Warhol",
          birth_year: 1928,
          death_year: 1987,
          nationality: "American",
          biography:
            'Andy Warhol was an American artist who was a leading figure in the visual art movement known as pop art. His work explores the relationship between artistic expression, culture, and advertisement. Warhol famously said, "In the future, everyone will be world-famous for 15 minutes." His famous works include the "Campbell’s Soup Cans" and portraits of celebrities like Marilyn Monroe.',
          image_url: "https://hamiltonselway.com/wp-content/uploads/2017/08/Warhol.jpg",
        },
        {
          artist_id: 9,
          name: "Georgia O'Keeffe",
          birth_year: 1887,
          death_year: 1986,
          nationality: "American",
          biography:
            'Georgia O\'Keeffe was an American modernist artist, best known for her large, magnified depictions of flowers and natural landscapes. Her works, such as "Black Iris" and "Sky Above Clouds," broke away from traditional perspectives and explored abstraction and the connection between nature and art. O\'Keeffe’s style helped redefine American art in the 20th century.',
          image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJfsRS1kqV5E3OAJDLtbJrsZQAQ8Zxy8Ekzg&s",
        },
        {
          artist_id: 10,
          name: "Henri Matisse",
          birth_year: 1869,
          death_year: 1954,
          nationality: "French",
          biography:
            'Henri Matisse was a French artist, renowned for his use of color and fluidity of form. He was one of the leading artists in modern art and a key figure in Fauvism. Matisse’s works, such as "The Dance" and "Woman with a Hat," revolutionized the way color and composition were understood in painting. His later works included striking cut-out sculptures and collages.',
          image_url: "https://cdn.britannica.com/23/189523-050-214F59F1/Henri-Matisse-photograph-Alvin-Langdon-Coburn-1913.jpg",
        },
        {
          artist_id: 11,
          name: "Mark Rothko",
          birth_year: 1903,
          death_year: 1970,
          nationality: "American",
          biography:
            'Mark Rothko was an American painter, widely recognized for his contribution to abstract expressionism. Known for his use of color and large, rectangular fields of color, Rothko sought to express universal human emotions through simplicity. His works, such as "No. 61 (Rust and Blue)" and "Orange and Yellow," are meditative and often evoke intense emotional responses.',
          image_url: "https://www.mark-rothko.org/assets/img/Mark-Rothko-Photo.jpg",
        },
        {
          artist_id: 12,
          name: "Edvard Munch",
          birth_year: 1863,
          death_year: 1944,
          nationality: "Norwegian",
          biography:
            'Edvard Munch was a Norwegian painter and printmaker, best known for his iconic painting "The Scream." His works often explored themes of anxiety, death, and existential despair. Munch’s expressionist style had a profound influence on the art world, with works such as "The Madonna" and "The Sick Child" exemplifying his exploration of emotional depth.',
          image_url: "https://example.com/munch.jpg",
        },
        {
          artist_id: 13,
          name: "J.M.W. Turner",
          birth_year: 1775,
          death_year: 1851,
          nationality: "British",
          biography:
            'J.M.W. Turner was an English Romantic landscape painter, known for his expressive and atmospheric landscapes. His revolutionary techniques in the use of light and color have had a lasting influence on the development of modern painting. Turner’s famous works include "The Fighting Temeraire" and "Rain, Steam and Speed," which showcase his mastery of capturing the sublime beauty of nature.',
          image_url: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-600031727jpg--.jpg",
        },
        {
          artist_id: 14,
          name: "Diego Rivera",
          birth_year: 1886,
          death_year: 1957,
          nationality: "Mexican",
          biography:
            "Diego Rivera was a Mexican painter, best known for his large-scale murals that depicted the social and political struggles of the working class. Rivera’s murals, including those at the National Preparatory School in Mexico City and the Detroit Institute of Arts, explore themes of revolution, industrial progress, and the lives of everyday people. As a prominent figure in the Mexican muralism movement, Riveras works reflect his commitment to portraying the struggles of the working class and his belief in the power of social change.",
          image_url: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-600031727jpg--.jpg",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Artists", null, {});
  },
};
