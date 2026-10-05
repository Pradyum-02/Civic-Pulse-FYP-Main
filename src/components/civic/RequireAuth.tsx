import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import CitizenNavbar from "@/components/layout/CitizenNavbar";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span
          aria-label="Loading"
          className="size-7 animate-spin rounded-full border-2 border-emerald-brand border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CitizenNavbar />
      {children}
    </div>
  );
}
