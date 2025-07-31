import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts";
import { ChartWrapper, ChartTitle } from "./TopMuseumsExhibitionChart.styles";
import MuseumIcon from '@mui/icons-material/Museum';
import { getAllExhibitions } from "../../api/ExhibitionApi";
import { getMuseums } from "../../api/MuseumApi";
import { CircularProgress } from "@mui/material";

const COLORS = ["#5D4037", "#8B7355", "#A87E5F", "#C4A484", "#D2B48C"];

const TopMuseumsExhibitionsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [exhibitionsData, museumsData] = await Promise.all([
          getAllExhibitions(),
          getMuseums()
        ]);

        const museumMap = museumsData.data.reduce((acc, museum) => {
          acc[museum.museum_id] = museum.name;
          return acc;
        }, {});

        const exhibitionCounts = exhibitionsData.reduce((acc, exhibition) => {
          acc[exhibition.museum_id] = (acc[exhibition.museum_id] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(exhibitionCounts)
          .map(([museumId, count]) => ({
            name: museumMap[museumId] || 'Unknown Museum',
            exhibitions: count
          }))
          .sort((a, b) => b.exhibitions - a.exhibitions)
          .slice(0, 5); 

        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching museum data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ChartWrapper>
        <ChartTitle><MuseumIcon/> Top Museums by Exhibitions</ChartTitle>
        <CircularProgress />
      </ChartWrapper>
    );
  }

  if (error) {
    return (
      <ChartWrapper>
        <ChartTitle><MuseumIcon/> Top Museums by Exhibitions</ChartTitle>
        <div>Error: {error}</div>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper>
      <ChartTitle><MuseumIcon/> Top Museums by Exhibitions</ChartTitle>
      <ResponsiveContainer width="90%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="exhibitions"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default TopMuseumsExhibitionsChart;
