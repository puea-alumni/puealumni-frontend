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
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminUsersPage } from "./components/AdminUsersPage";
import { DonationsPage } from "./components/DonationsPage";
import { ProfilePage } from "./components/ProfilePage";
import { ActivatePage } from "./components/ActivatePage";
// import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
// import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { ContactPage } from "./components/ContactPage";
import { ProjectsPage } from "./components/ProjectsPage";
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
      // { path: "forgot-password", Component: ForgotPasswordPage },
      // { path: "reset-password", Component: ResetPasswordPage },
      // Alumni
      { path: "alumni", Component: AlumniListPage },
      { path: "alumni/:id", Component: AlumniProfilePage },
      { path: "spotlight", Component: SpotlightPage },
      // Jobs — standalone section
      { path: "jobs", Component: JobPortalPage },
      { path: "jobs/post", Component: JobPortalPage },
      { path: "jobs/internships", Component: JobPortalPage },
      { path: "jobs/:id", Component: JobDetailPage },
      // Events & News
      { path: "events", Component: EventsPage },
      { path: "news", Component: NewsPage },
      // Marketplace
      { path: "market", Component: MarketPage },
      // Donations
      { path: "donate", Component: DonationsPage },
      // Admin — protected once at the layout level, pages nest underneath
      {
        path: "admin",
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: AdminDashboard },
          { path: "users", Component: AdminUsersPage },
        ],
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "activate",
        element: (
          <ProtectedRoute>
            <ActivatePage />
          </ProtectedRoute>
        ),
      },
      // Contact
      { path: "contact", Component: ContactPage },
      { path: "projects", Component: ProjectsPage },
      { path: "*", Component: NotFound },
    ],
  },
]);