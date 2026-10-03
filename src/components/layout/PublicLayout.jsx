import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";
import Button from "../common/Button";

export function PublicHeader({ overlay = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`z-50 w-full ${overlay ? "absolute inset-x-0 top-0 bg-transparent pt-3" : "sticky top-0 border-b border-white/30 bg-white/30 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl"}`}>
      <div className={`mx-auto flex min-h-16 max-w-5xl items-center justify-between px-4 sm:px-6 ${overlay ? "w-[calc(100%-2rem)] rounded-[2rem] border border-white/60 bg-white/75 py-2 shadow-[0_8px_28px_rgba(15,23,42,0.12)] backdrop-blur-xl" : ""}`}>
        <Logo className="shrink-0" />

        <nav className="hidden items-center gap-1 sm:flex">
          <Link to="/" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70 hover:text-slate-900">
            Home
          </Link>
          <Link to="/citizen/report" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70 hover:text-slate-900">
            Report issue
          </Link>
          <Link to="/citizen/complaints" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/70 hover:text-slate-900">
            Track status
          </Link>
          <Button as={Link} to="/login" variant="outline" size="sm" className="rounded-full border-white/60 bg-white/60 text-slate-800 shadow-sm hover:bg-white/90">
            Log in
          </Button>
          <Button as={Link} to="/citizen/report" size="sm" className="rounded-full bg-[#2d8b7d] text-white shadow-[0_8px_18px_rgba(45,139,125,0.22)] hover:opacity-95">
            Report now
          </Button>
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <Button as={Link} to="/login" variant="outline" size="sm" className="rounded-full border-white/60 bg-white/60 text-slate-800">
            Log in
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background sm:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Home
              </Link>

              <Link
                to="/citizen/report"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Report an Issue
              </Link>

              <Link
                to="/citizen/complaints"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Track Complaint
              </Link>

              <div className="my-2 border-t border-border" />

              <Button
                as={Link}
                to="/login"
                variant="outline"
                className="w-full"
                onClick={closeMenu}
              >
                Log in
              </Button>

              <Button
                as={Link}
                to="/citizen/report"
                className="mt-2 w-full"
                onClick={closeMenu}
              >
                Report now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            A civic issue reporting and management platform for citizens, officers, and municipal administrators.
          </p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <h2 className="mb-3 font-semibold text-foreground">Platform</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/citizen/report" className="transition-colors hover:text-foreground">Report an issue</Link>
            </li>
            <li>
              <Link to="/citizen/complaints" className="transition-colors hover:text-foreground">Track complaints</Link>
            </li>
            <li>
              <Link to="/login" className="transition-colors hover:text-foreground">Citizen login</Link>
            </li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="mb-3 font-semibold text-foreground">Departments</h2>
          <ul className="grid grid-cols-2 gap-y-2 text-muted-foreground md:block md:space-y-2">
            <li>Roads</li>
            <li>Sanitation</li>
            <li>Water Supply</li>
            <li>Electrical</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CivicPulse. Built for responsive city services.
      </div>
    </footer>
  );
}

export default function PublicLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <PublicHeader overlay={isHome} />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}