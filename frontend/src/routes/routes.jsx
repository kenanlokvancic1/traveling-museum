import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/LoginPage/LoginPage";
import VerificationPage from "../pages/VerificationPage/VerificationPage";
import ExhibitionForm from "../pages/ExhibitionFormPage/ExhibitionFormPage";
import Register from "../pages/Register/Register";
import Exhibitions from "../pages/Exhibitions/ExhibitionsPage";
import Gallery from "../pages/Gallery/GalleryPage";
import ExhibitionsReport from "../pages/ExhibitionsReport/ExhibitionsReport";
import ArtworkForm from "../pages/ArtworkFormPage/ArtworkFormPage";
import Home from "../pages/Home/Home";
import ProfileDetailsPage from "../pages/ProfileDetails/ProfileDetailsPage";
import ExhibitionDetail from "../pages/ExhibitionDetail/ExhibitionDetail";
import ManageExhibitionsPage from "../pages/ManageExhibitionsPage/ManageExhibitionsPage";
import NotificationsPage from "../pages/NotificationsPage/Notifications";
import FavouritesPage from "../pages/Favourites/FavouritesPage";
import NavbarContainer from "../components/NavbarContainer/NavbarContainer";
import ArtworkDetailsPage from "../pages/ArtworkDetailsPage/ArtworkDetailsPage";
import ManagePaintingsPage from "../pages/ManagePaintingsPage/ManagePaintingsPage";
import PaintingsReport from "../pages/PaintingsReportPage/PaintingsReportPage";
import ExhibitionSchedulePage from "../pages/ExhibitionsSchedulePage/ExhibitionsSchedulePage";
import ReportsAnalyticsPage from "../pages/Reports&AnalyticsPage";
import TrackingPage from "../pages/Tracking/TrackingPage";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { NotificationsProvider } from "../contexts/NotificationsContext";
import ArtistDetailsPage from "../pages/ArtistDetailsPage";
import UserManagementPage from "../pages/UserManagement/UserManagementPage";
import { MuseumsPage } from "../pages/MuseumsPage";
import MuseumForm from "../components/MuseumForm/MuseumForm";
import { PasswordResetForm } from "../components/PasswordManagement";
import { ProtectedRoute } from "../routes/ProtectedRoutes/ProtectedRoutes";
import { NotFoundPage } from "../pages/ErrorPages/NotFoundPage/NotFoundPage";
import { UnauthorizedPage } from "../pages/ErrorPages/UnauthorizedPage/UnauthorizedPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { getMyProfile } from "../api/UserApi";


export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route element={<NavbarContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/reset-password/:token" element={<PasswordResetForm />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/exhibitions/:id" element={<ExhibitionDetail />} />
        <Route path="/artworks/:id" element={<ArtworkDetailsPage />} />
        <Route path="/artists/:id" element={<ArtistDetailsPage />} />
        <Route path="/museums" element={<MuseumsPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "curator", "admin"]}>
              <ProfileDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRoles={["user", "curator", "admin"]}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute allowedRoles={["user", "curator", "admin"]}>
              <FavouritesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-exhibitions"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ManageExhibitionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibition-form"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ExhibitionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artwork-form"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ArtworkForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-paintings"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ManagePaintingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/museum-form"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <MuseumForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibitions-schedule"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ExhibitionSchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports-analytics"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ReportsAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <TrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exhibitions-report"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <ExhibitionsReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paintings-report"
          element={
            <ProtectedRoute allowedRoles={["admin", "curator"]}>
              <PaintingsReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
