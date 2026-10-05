import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", to: "/citizen/dashboard" },
  { label: "My Complaints", to: "/citizen/dashboard", hash: "complaints" },
  { label: "Notifications", to: "/citizen/notifications" },
  { label: "Profile", to: "/citizen/profile" },
] as const;

export default function CitizenNavbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const itemClass =
    "text-[0.85rem] font-medium text-muted-foreground transition-colors hover:text-deep";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1100px] w-full items-center justify-between gap-4 px-3 py-2 sm:px-4 sm:py-3 lg:px-8">
        <Link to="/citizen/dashboard" aria-label="CivicPulse dashboard">
          <Logo size="sm" className="h-9 w-auto" />
        </Link>

        <nav className="hidden items-center gap-4 sm:gap-5 md:flex" aria-label="Citizen">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              className={`${itemClass} hover-lift press-feedback`}
              activeProps={{ className: "text-deep font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-mint text-[0.75rem] font-bold text-deep sm:inline-flex">
            {user?.initials ?? "CP"}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="hidden items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[0.75rem] font-semibold text-muted-foreground transition-colors hover-lift press-feedback hover:border-emerald-brand hover:text-deep md:inline-flex"
          >
            <LogOut size={13} /> Logout
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-deep hover-lift press-feedback md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={cn("border-t border-border bg-card px-4 pb-3 pt-1 md:hidden animate-enter transition-all duration-300 ease-out")}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 px-3 py-2 text-sm font-medium text-muted-foreground hover-lift press-feedback"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-destructive hover-lift press-feedback"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      )}
    </header>
  );
}
