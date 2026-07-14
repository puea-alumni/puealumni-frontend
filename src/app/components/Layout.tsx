import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { ActivationBanner } from "./ActivationBanner";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <ActivationBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}