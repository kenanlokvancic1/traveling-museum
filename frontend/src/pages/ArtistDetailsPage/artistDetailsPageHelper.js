export const getMockArtist = () => ({
  id: 1,
  name: "Pablo Picasso",
  birthYear: "1881",
  deathYear: "1973",
  bio: "Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist, and stage designer who spent most of his adult life in France. One of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture, the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by German and Italian air forces during the Spanish Civil War.",
  avatarUrl:
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Pablo_picasso_1.jpg",
});

export const getUserRoles = (user) => {
  const isCurator = user && (user.role === "curator" || user.role === "admin");
  const isLoggedIn = !!user;
  return { isCurator, isLoggedIn };
};
