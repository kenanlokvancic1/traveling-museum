import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTitle,
  ChartWrapper,
} from "./PaintingsOverviewChart.styles";
import { getPaintingsByProvenance } from "../../api/PaintingApi";
import { CircularProgress } from "@mui/material";

const PaintingsOverviewChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const provenanceData = await getPaintingsByProvenance();
        setChartData(provenanceData.map(item => ({
          category: item.status,
          count: item.count
        })));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching provenance data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ChartContainer>
        <ChartTitle variant="h6">Paintings by Periods</ChartTitle>
        <ChartWrapper>
          <CircularProgress />
        </ChartWrapper>
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartTitle variant="h6">Paintings by Periods</ChartTitle>
        <ChartWrapper>
          Error: {error}
        </ChartWrapper>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle variant="h6">Paintings by Periods</ChartTitle>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" stroke="#3E2723" />
            <YAxis 
              stroke="#3E2723" 
              allowDecimals={false} 
              domain={[0, 'auto']} 
            />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#5E493A" 
              radius={[6, 6, 0, 0]} 
              name="Number of Paintings"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default PaintingsOverviewChart;
