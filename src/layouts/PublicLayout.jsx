import { Outlet } from "react-router-dom";
import { PublicHeader, PublicFooter } from "@/components/layout/PublicLayout";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
