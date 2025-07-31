import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTitle,
  ChartWrapper,
  StyledBar,
  StyledXAxis,
  StyledYAxis,
} from "./ExhibitionsStatusChart.styles";
import { getAllExhibitions } from "../../api/ExhibitionApi"; 
import { CircularProgress } from "@mui/material";

const ExhibitionsStatusChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const exhibitions = await getAllExhibitions();
        const currentDate = new Date();
        
        const statusCounts = {
          "Ongoing": 0,
          "Completed": 0,
          "Upcoming": 0
        };

        exhibitions.forEach(exhibition => {
          const startDate = new Date(exhibition.start_date);
          const endDate = new Date(exhibition.end_date);

          if (currentDate >= startDate && currentDate <= endDate) {
            statusCounts["Ongoing"]++;
          } else if (currentDate > endDate) {
            statusCounts["Completed"]++;
          } else if (currentDate < startDate) {
            statusCounts["Upcoming"]++;
          }
        });

        const formattedData = [
          { status: "Ongoing", count: statusCounts["Ongoing"] },
          { status: "Upcoming", count: statusCounts["Upcoming"] },
          { status: "Completed", count: statusCounts["Completed"] }
        ];

        console.log('Formatted chart data:', formattedData);
        setChartData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exhibition data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ChartContainer>
        <ChartTitle>Exhibition Timeline Status</ChartTitle>
        <ChartWrapper>
          <CircularProgress />
        </ChartWrapper>
      </ChartContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartTitle>Exhibition Timeline Status</ChartTitle>
        <ChartWrapper>
          <div>Error loading data: {error}</div>
        </ChartWrapper>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>Exhibition Timeline Status</ChartTitle>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="status"
              tick={{ fill: '#3E2723' }}
            />
            <YAxis 
              tick={{ fill: '#3E2723' }}
            />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#5E493A"
              name="Number of Exhibitions"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default ExhibitionsStatusChart;
