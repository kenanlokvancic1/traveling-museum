import React from "react";
import { MetricCardContainer, MetricCardTitle, MetricCardValue } from "./MetricCard.styles";

const MetricCard = ({ title, value }) => {
  return (
    <MetricCardContainer>
      <MetricCardTitle>{title}</MetricCardTitle>
      <MetricCardValue>{value}</MetricCardValue>
    </MetricCardContainer>
  );
};

export default MetricCard;
