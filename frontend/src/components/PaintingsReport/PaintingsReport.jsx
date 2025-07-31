import React, { useState, useEffect } from "react";
import { ReportContainer, ReportTitle } from "./PaintingsReport.styles";
import SelectExhibition from "./SelectExhibition/SelectExhibition";
import PaintingsTable from "./PaintingsTable/PaintingsTable";
import { getAllExhibitions } from '../../api/ExhibitionApi';
import { getAllPaintings, getPaintingById } from '../../api/PaintingApi';
import { getPaintingsByExhibition, getExhibitionsByPainting } from '../../api/ExhibitionPainting';
import { useNavigate } from 'react-router-dom';
import { getExhibitionById } from '../../api/ExhibitionApi';
import { getArtistById } from '../../api/ArtistApi';

const PaintingsReport = () => {
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [exhibitions, setExhibitions] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [paintingsWithExhibitions, setPaintingsWithExhibitions] = useState([]);
  const [sortOrderFavorites, setSortOrderFavorites] = useState("asc");
  const [sortOrderShares, setSortOrderShares] = useState("asc");
  const [isSortingFavorites, setIsSortingFavorites] = useState(false);
  const [isSortingShares, setIsSortingShares] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaintingsData = async () => {
      try {
        const allPaintings = await getAllPaintings();
        const paintingsWithDetails = await Promise.all(
          allPaintings.map(async (painting) => {
            const paintingExhibitions = await getExhibitionsByPainting(painting.painting_id);
            
            const exhibitionsWithDetails = await Promise.all(
              paintingExhibitions.map(async (exhibition) => {
                const exhibitionDetails = await getExhibitionById(exhibition.exhibition_id);
                return exhibitionDetails;
              })
            );

            const artistDetails = await getArtistById(painting.artist_id);
            
            return {
              ...painting,
              exhibitions: exhibitionsWithDetails,
              artistName: artistDetails.name 
            };
          })
        );
        setPaintingsWithExhibitions(paintingsWithDetails);
        setPaintings(paintingsWithDetails);
      } catch (error) {
        console.error("Failed to fetch paintings data:", error);
      }
    };
    fetchPaintingsData();
  }, []);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await getAllExhibitions();
        setExhibitions(response);
      } catch (error) {
        console.error("Failed to fetch exhibitions:", error);
      }
    };
    fetchExhibitions();
  }, []);

  useEffect(() => {
    const filterPaintings = async () => {
      if (selectedExhibition !== null) {
        try {
          const exhibitionPaintings = await getPaintingsByExhibition(selectedExhibition);
          
          const paintingsWithDetails = await Promise.all(
            exhibitionPaintings.map(async (painting) => {
              const fullPaintingDetails = await getPaintingById(painting.painting_id);
              const artistDetails = await getArtistById(fullPaintingDetails.artist_id);
              const paintingExhibitions = await getExhibitionsByPainting(painting.painting_id);
              
              const exhibitionsWithDetails = await Promise.all(
                paintingExhibitions.map(async (exhibition) => {
                  const exhibitionDetails = await getExhibitionById(exhibition.exhibition_id);
                  return exhibitionDetails;
                })
              );

              return {
                ...fullPaintingDetails,
                exhibitions: exhibitionsWithDetails,
                artistName: artistDetails.name
              };
            })
          );
          
          setPaintings(paintingsWithDetails);
        } catch (error) {
          console.error("Failed to fetch paintings for exhibition:", error);
        }
      } else {
        setPaintings(paintingsWithExhibitions);
      }
    };
    filterPaintings();
  }, [selectedExhibition, paintingsWithExhibitions]);

  const handleSortByFavorites = () => {
    setIsSortingFavorites(true);
    setSortOrderFavorites(sortOrderFavorites === "asc" ? "desc" : "asc");
    const sortedPaintings = [...paintings].sort((a, b) => {
      return sortOrderFavorites === "asc" 
        ? (b.favorites || 0) - (a.favorites || 0)
        : (a.favorites || 0) - (b.favorites || 0);
    });
    setPaintings(sortedPaintings);
  };

  const handleSortByShares = () => {
    setIsSortingShares(true);
    setSortOrderShares(sortOrderShares === "asc" ? "desc" : "asc");
    const sortedPaintings = [...paintings].sort((a, b) => {
      return sortOrderShares === "asc"
        ? (b.shares || 0) - (a.shares || 0)
        : (a.shares || 0) - (b.shares || 0);
    });
    setPaintings(sortedPaintings);
  };

  return (
    <ReportContainer>
      <ReportTitle variant="h4">Paintings Report</ReportTitle>
      <SelectExhibition
        exhibitions={exhibitions}
        selectedExhibition={selectedExhibition}
        setSelectedExhibition={setSelectedExhibition}
      />
      <PaintingsTable 
        paintings={paintings}
        onSortFavorites={handleSortByFavorites}
        onSortShares={handleSortByShares}
        sortOrderFavorites={sortOrderFavorites}
        sortOrderShares={sortOrderShares}
        isSortingFavorites={isSortingFavorites}
        isSortingShares={isSortingShares}
      />
    </ReportContainer>
  );
};

export default PaintingsReport;