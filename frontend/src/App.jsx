import React from "react";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { AppRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <NotificationsProvider>
      <AppRoutes />
      <ToastContainer />
    </NotificationsProvider>
  );
}

export default App;
