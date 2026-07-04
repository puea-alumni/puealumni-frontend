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
import { ContactPage } from "./components/ContactPage";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutUsPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
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
      // Contact
      { path: "contact", Component: ContactPage },
      // Admin
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
