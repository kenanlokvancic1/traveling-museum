export const galleryTabs = [
  { value: 0, label: "All" },
  { value: 1, label: "Artworks" },
  { value: 2, label: "Artists" },
];

export const filterArtworks = (artworks, searchTerm) => {
  if (!searchTerm) return artworks;

  return artworks.filter(
    (artwork) =>
      artwork.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artist?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const filterArtists = (artists, searchTerm) => {
  if (!searchTerm) return artists;

  return artists.filter((artist) =>
    artist.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
