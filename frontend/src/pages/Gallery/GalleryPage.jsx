import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import Footer from "../../components/Footer/Footer.jsx";
import ArtworkCard from "../../components/Gallery/ArtworkCard/ArtworkCard.jsx";
import ArtistCard from "../../components/Gallery/ArtistCard";
import SearchBar from "../../components/common/SearchBar";
import FilterTabs from "../../components/common/FilterTabs";
import GalleryGrid from "../../components/Gallery/GalleryGrid";
import {
  RootBox,
  PageContainer,
  PageHeader,
  PageTitle,
  SectionTitle,
  StyledDivider,
  SearchContainer,
  TabsContainer,
} from "./Gallery.styles";
import { galleryTabs, filterArtworks, filterArtists } from "./galleryHelper";
import { getAllArtists } from "../../api/ArtistApi";
import { getAllPaintings } from "../../api/PaintingApi";

const GalleryPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [artistsData, setArtistsData] = useState([]);
  const [paintingsData, setPaintingsData] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists(1, 100);
        setArtistsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
        setArtistsData([]);
      }
    };

    const fetchPaintings = async () => {
      try {
        const data = await getAllPaintings(1, 100);
        setPaintingsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch paintings:", error);
        setPaintingsData([]);
      }
    };

    fetchArtists();
    fetchPaintings();
  }, []);

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredArtworks = filterArtworks(paintingsData, searchTerm);
  const filteredArtists = filterArtists(artistsData, searchTerm);

  const renderArtworkCard = (artwork) => <ArtworkCard artwork={artwork} />;
  const renderArtistCard = (artist) => <ArtistCard artist={artist} />;

  const renderContent = () => {
    if (tabValue === 0) {
      return (
        <>
          <SectionTitle variant="h4">Featured Artworks</SectionTitle>
          <GalleryGrid
            items={filteredArtworks}
            renderItem={renderArtworkCard}
            linkPath="/artworks/"
            gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            noResultsMessage="No artworks found matching your search."
          />
          <SectionTitle variant="h4">Notable Artists</SectionTitle>
          <GalleryGrid
            items={filteredArtists}
            renderItem={renderArtistCard}
            linkPath="/artists/"
            gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            noResultsMessage="No artists found matching your search."
          />
        </>
      );
    } else if (tabValue === 1) {
      return (
        <GalleryGrid
          items={filteredArtworks}
          renderItem={renderArtworkCard}
          linkPath="/artworks/"
          gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          noResultsMessage="No artworks found matching your search."
        />
      );
    } else {
      return (
        <GalleryGrid
          items={filteredArtists}
          renderItem={renderArtistCard}
          linkPath="/artists/"
          gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          noResultsMessage="No artists found matching your search."
        />
      );
    }
  };

  return (
    <RootBox>
      <PageContainer>
        <PageHeader>
          <PageTitle variant="h3">Art Gallery</PageTitle>
          <Typography variant="subtitle1">
            Discover exceptional artworks and artists from around the world
          </Typography>
        </PageHeader>

        <SearchContainer>
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search artworks or artists..."
            size="medium"
          />
        </SearchContainer>

        <TabsContainer>
          <FilterTabs
            value={tabValue}
            onChange={handleTabChange}
            tabs={galleryTabs}
          />
        </TabsContainer>

        <StyledDivider />

        {renderContent()}
      </PageContainer>
      <Footer />
    </RootBox>
  );
};

export default GalleryPage;
