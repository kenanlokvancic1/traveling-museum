import React from "react";
import {
  AdminDashboardContainer,
  DashboardTitle,
  DashboardContent,
} from "./AdminDashboard.styles";
import ExhibitionsStatusChart from "../../components/ExhibitionsStatusChart/ExhibitionsStatusChart";
import PaintingsOverviewChart from "../../components/PaintingsOverviewChart/PaintingsOverviewChart";
import KeyMetrics from "../../components/KeyMetrics/KeyMetrics";
import TopArtistsList from "../../components/TopArtistsList/TopArtistsList";
import ExhibitionsInsights from "../../components/ExhibitionsInsights/ExhibitionsInsights";
import TopRatedExhibitionsChart from "../../components/TopRatedExhibitionsChart/TopRatedExhibitionsChart";
import MonthlyActivityOverview from "../../components/MonthlyActivityOverview";
import UpcomingExhibitionsTimeline from "../../components/UpcomingExhibitionsTimeline";
import TopMuseumsExhibitionsChart from "../../components/TopMuseumsExhibitionChart/TopMuseumsExhibitionChart";

const AdminDashboard = () => {
  return (
    <AdminDashboardContainer>
      <DashboardTitle>Admin Dashboard</DashboardTitle>
      <KeyMetrics />
      <DashboardContent>
        <ExhibitionsStatusChart />
        <PaintingsOverviewChart />
        <TopArtistsList />
        <TopRatedExhibitionsChart />
      </DashboardContent>
      <ExhibitionsInsights />
      <MonthlyActivityOverview />
      <UpcomingExhibitionsTimeline />
      <TopMuseumsExhibitionsChart />
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
