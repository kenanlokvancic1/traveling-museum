import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  TopRatedExhibitionsContainer,
  ChartTitle,
} from "./TopRatedExhibitionsChart.styles";
import { getAllExhibitions } from "../../api/ExhibitionApi";
import { getAllReviews } from "../../api/ReviewApi";
import { CircularProgress } from "@mui/material";

const TopRatedExhibitionsChart = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exhibitionRatings, setExhibitionRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [exhibitions, reviews] = await Promise.all([
          getAllExhibitions(),
          getAllReviews()
        ]);

        const ratingMap = reviews.reduce((acc, review) => {
          if (!acc[review.exhibition_id]) {
            acc[review.exhibition_id] = {
              totalRating: 0,
              count: 0
            };
          }
          acc[review.exhibition_id].totalRating += review.rating;
          acc[review.exhibition_id].count += 1;
          return acc;
        }, {});

        const exhibitionsWithRatings = exhibitions
          .map(exhibition => ({
            name: exhibition.name,
            rating: ratingMap[exhibition.exhibition_id] 
              ? (ratingMap[exhibition.exhibition_id].totalRating / ratingMap[exhibition.exhibition_id].count).toFixed(1)
              : 0
          }))
          .filter(exhibition => exhibition.rating > 0) 
          .sort((a, b) => b.rating - a.rating) 
          .slice(0, 5); 

        setExhibitionRatings(exhibitionsWithRatings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exhibition ratings:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <TopRatedExhibitionsContainer>
        <ChartTitle>Top Rated Exhibitions</ChartTitle>
        <CircularProgress />
      </TopRatedExhibitionsContainer>
    );
  }

  if (error) {
    return (
      <TopRatedExhibitionsContainer>
        <ChartTitle>Top Rated Exhibitions</ChartTitle>
        <div>Error: {error}</div>
      </TopRatedExhibitionsContainer>
    );
  }

  return (
    <TopRatedExhibitionsContainer>
      <ChartTitle>Top Rated Exhibitions</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={exhibitionRatings}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            domain={[0, 5]}
            ticks={[0, 1, 2, 3, 4, 5]}
            allowDecimals={true}
            tickCount={6}
            padding={{ left: 20 }} 
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={20} 
          />
          <Tooltip 
            formatter={(value) => [Number(value).toFixed(1), "Rating"]}
          />
          <Legend />
          <Bar 
            dataKey="rating" 
            fill="#8E6E53" 
            radius={[0, 8, 8, 0]} 
            name="Average Rating"
          />
        </BarChart>
      </ResponsiveContainer>
    </TopRatedExhibitionsContainer>
  );
};

export default TopRatedExhibitionsChart;
