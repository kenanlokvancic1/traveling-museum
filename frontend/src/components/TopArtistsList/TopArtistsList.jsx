import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";
import { ArtistListContainer, ArtistItem, ArtistName } from "./TopArtistsList.styles";
import { getTopArtists } from "../../api/ArtistApi";

const TopArtistsList = () => {
  const [artists, setArtists] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const topArtists = await getTopArtists();
        setArtists(topArtists);
      } catch (error) {
        console.error("Error fetching top artists:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, []);

  if (loading) {
    return (
      <ArtistListContainer>
        <Typography variant="h5" gutterBottom>
          Top 3 Artists
        </Typography>
        <CircularProgress />
      </ArtistListContainer>
    );
  }

  if (error) {
    return (
      <ArtistListContainer>
        <Typography color="error">Error: {error}</Typography>
      </ArtistListContainer>
    );
  }

  return (
    <ArtistListContainer>
      <Typography variant="h5" gutterBottom>
        Top 3 Artists
      </Typography>
      <List>
        {artists.map((artist, index) => (
          <ArtistItem key={artist.artist_id}>
            <ListItem>
              <ListItemText
                primary={<ArtistName>{artist.name}</ArtistName>}
                secondary={`Paintings in Exhibitions: ${artist.exhibitionPaintingsCount}`}
              />
            </ListItem>
          </ArtistItem>
        ))}
      </List>
    </ArtistListContainer>
  );
};

export default TopArtistsList;
