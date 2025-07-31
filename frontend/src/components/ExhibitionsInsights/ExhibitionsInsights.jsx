import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  ExhibitionInsightsContainer,
  ExhibitionInsightsTitle,
  ExhibitionGraphContainer,
} from "./ExhibitionsInsights.styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllExhibitions } from "../../api/ExhibitionApi";
import { getPaintingsByExhibition } from "../../api/ExhibitionPainting";

const ExhibitionInsights = () => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateRandomVisitors = () => Math.floor(Math.random() * (1000 - 100) + 100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const exhibitions = await getAllExhibitions();
        
        console.log('First exhibition:', exhibitions[0]);
        
        const exhibitionsWithData = await Promise.all(
          exhibitions.map(async (exhibition) => {
            if (!exhibition.exhibition_id) {
              console.warn(`Exhibition ${exhibition.name} has no ID`);
              return {
                name: exhibition.name,
                visitors: generateRandomVisitors(),
                paintings: 0,
              };
            }
            
            try {
              const paintings = await getPaintingsByExhibition(exhibition.exhibition_id);
              return {
                name: exhibition.name,
                visitors: generateRandomVisitors(), 
                paintings: Array.isArray(paintings) ? paintings.length : 0,
              };
            } catch (paintingError) {
              console.error(`Error fetching paintings for exhibition ${exhibition.exhibition_id}:`, paintingError);
              return {
                name: exhibition.name,
                visitors: generateRandomVisitors(), 
                paintings: 0,
              };
            }
          })
        );

        setExhibitionData(exhibitionsWithData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ExhibitionInsightsContainer>
        <Box display="flex" justifyContent="center" alignItems="center" height={400}>
          <CircularProgress />
        </Box>
      </ExhibitionInsightsContainer>
    );
  }

  if (error) {
    return (
      <ExhibitionInsightsContainer>
        <Typography color="error">Error loading insights: {error}</Typography>
      </ExhibitionInsightsContainer>
    );
  }

  return (
    <ExhibitionInsightsContainer>
      <ExhibitionInsightsTitle>Exhibition Insights</ExhibitionInsightsTitle>
      <ExhibitionGraphContainer>
        <Typography variant="h6">Visitors per Exhibition</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={exhibitionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#5E493A" name="Visitors" />
            <Bar dataKey="paintings" fill="#8B7355" name="Paintings" />
          </BarChart>
        </ResponsiveContainer>
      </ExhibitionGraphContainer>
    </ExhibitionInsightsContainer>
  );
};

export default ExhibitionInsights;
