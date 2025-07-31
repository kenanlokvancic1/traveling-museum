import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { OverviewContainer, OverviewTitle } from "./MonthlyActivityOverview.sytles";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { getAllPaintings } from "../../api/PaintingApi";
import { getAllExhibitions } from "../../api/ExhibitionApi";
import { getPaintingsByExhibition } from "../../api/ExhibitionPainting";
import { CircularProgress } from "@mui/material";

const MonthlyActivityOverview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allPaintings, exhibitions] = await Promise.all([
          getAllPaintings(),
          getAllExhibitions()
        ]);

        const statusCounts = {
          'in warehouse': {
            paintings: 0,
            exhibitions: exhibitions.filter(e => e.status === 'in warehouse').length
          },
          'in transport': {
            paintings: 0,
            exhibitions: exhibitions.filter(e => e.status === 'in transport').length
          },
          'delivered': {
            paintings: 0,
            exhibitions: exhibitions.filter(e => e.status === 'delivered').length
          }
        };

        const paintingsInExhibitions = new Set();

        for (const exhibition of exhibitions) {
          const exhibitionPaintings = await getPaintingsByExhibition(exhibition.exhibition_id);
          
          exhibitionPaintings.forEach(painting => {
            paintingsInExhibitions.add(painting.painting_id);
            statusCounts[exhibition.status].paintings++;
          });
        }

        allPaintings.forEach(painting => {
          if (!paintingsInExhibitions.has(painting.painting_id)) {
            statusCounts['in warehouse'].paintings++;
          }
        });

        const chartData = Object.entries(statusCounts).map(([status, counts]) => ({
          status: status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          paintings: counts.paintings,
          exhibitions: counts.exhibitions
        }));

        console.log('Total paintings:', allPaintings.length);
        console.log('Paintings in exhibitions:', paintingsInExhibitions.size);
        console.log('Final status counts:', statusCounts);
        
        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <OverviewContainer>
        <OverviewTitle><AssessmentIcon /> Status Distribution</OverviewTitle>
        <CircularProgress />
      </OverviewContainer>
    );
  }

  if (error) {
    return (
      <OverviewContainer>
        <OverviewTitle><AssessmentIcon /> Status Distribution</OverviewTitle>
        <div>Error: {error}</div>
      </OverviewContainer>
    );
  }

  return (
    <OverviewContainer>
      <OverviewTitle><AssessmentIcon /> Status Distribution</OverviewTitle>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="paintings" 
            fill="#8B7355" 
            name="Paintings"
          />
          <Bar 
            dataKey="exhibitions" 
            fill="#5D4037" 
            name="Exhibitions"
          />
        </BarChart>
      </ResponsiveContainer>
    </OverviewContainer>
  );
};

export default MonthlyActivityOverview;
