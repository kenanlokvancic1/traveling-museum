import React, { useState, useEffect } from "react";
import { KeyMetricsContainer, KeyMetricsTitle, KeyMetricsCardWrapper } from "./KeyMetrics.styles";
import MetricCard from "../MetricCard";
import { getAllExhibitions } from "../../api/ExhibitionApi";
import { getAllPaintings } from "../../api/PaintingApi";
import { getAllUsers } from "../../api/UserApi";
import { getAllArtists } from "../../api/ArtistApi";
import { CircularProgress } from "@mui/material";

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState({
    exhibitions: 0,
    paintings: 0,
    users: 0,
    artists: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const [exhibitions, paintings, users, artists] = await Promise.all([
          getAllExhibitions(),
          getAllPaintings(),
          getAllUsers(),
          getAllArtists()
        ]);

        setMetrics({
          exhibitions: exhibitions.length,
          paintings: paintings.length,
          users: users.length,
          artists: artists.length
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <KeyMetricsContainer>
        <KeyMetricsTitle>Key Metrics</KeyMetricsTitle>
        <KeyMetricsCardWrapper>
          <CircularProgress />
        </KeyMetricsCardWrapper>
      </KeyMetricsContainer>
    );
  }

  if (error) {
    return (
      <KeyMetricsContainer>
        <KeyMetricsTitle>Key Metrics</KeyMetricsTitle>
        <KeyMetricsCardWrapper>
          <div>Error loading metrics: {error}</div>
        </KeyMetricsCardWrapper>
      </KeyMetricsContainer>
    );
  }

  const metricCards = [
    { title: "Total Exhibitions", value: metrics.exhibitions },
    { title: "Total Paintings", value: metrics.paintings },
    { title: "Total Users", value: metrics.users },
    { title: "Total Artists", value: metrics.artists },
  ];

  return (
    <KeyMetricsContainer>
      <KeyMetricsTitle>Key Metrics</KeyMetricsTitle>
      <KeyMetricsCardWrapper>
        {metricCards.map((metric, i) => (
          <MetricCard key={i} title={metric.title} value={metric.value} />
        ))}
      </KeyMetricsCardWrapper>
    </KeyMetricsContainer>
  );
};

export default KeyMetrics;
