import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AboutUsPage } from "./components/AboutUsPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { AlumniListPage } from "./components/AlumniListPage";
import { AlumniProfilePage } from "./components/AlumniProfilePage";
import { JobPortalPage } from "./components/JobPortalPage";
import { JobDetailPage } from "./components/JobDetailPage";
import { EventsPage } from "./components/EventsPage";
import { SpotlightPage } from "./components/SpotlightPage";
import { NewsPage } from "./components/NewsPage";
import { MarketPage } from "./components/MarketPage";
import { AdminDashboard } from "./components/AdminDashboard";
import { DonationsPage } from "./components/DonationsPage";
import { ProfilePage } from "./components/ProfilePage";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutUsPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "alumni", Component: AlumniListPage },
      { path: "alumni/:id", Component: AlumniProfilePage },
      { path: "jobs", Component: JobPortalPage },
      { path: "jobs/:id", Component: JobDetailPage },
      { path: "events", Component: EventsPage },
      { path: "spotlight", Component: SpotlightPage },
      { path: "news", Component: NewsPage },
      { path: "market", Component: MarketPage },
      { path: "donate", Component: DonationsPage },
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "*", Component: NotFound },
    ],
  },
]);