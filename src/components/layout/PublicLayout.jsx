import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Button from "../common/Button";

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />

          <Button as={Link} to="/login" variant="outline" size="sm">
            Log in
          </Button>

          <Button as={Link} to="/register" size="sm">
            Register
          </Button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />

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
                to="/register"
                className="mt-2 w-full"
                onClick={closeMenu}
              >
                Create Account
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
        {/* Brand */}
        <div>
          <Logo />

          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            A civic issue reporting and management platform for citizens,
            officers and municipal administrators.
          </p>
        </div>

        {/* Platform */}
        <nav aria-label="Footer" className="text-sm">
          <h2 className="mb-3 font-semibold text-foreground">
            Platform
          </h2>

          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link
                to="/citizen/report"
                className="transition-colors hover:text-foreground"
              >
                Report an issue
              </Link>
            </li>

            <li>
              <Link
                to="/citizen/complaints"
                className="transition-colors hover:text-foreground"
              >
                Track complaints
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="transition-colors hover:text-foreground"
              >
                Officer / Admin login
              </Link>
            </li>
          </ul>
        </nav>

        {/* Departments */}
        <div className="text-sm">
          <h2 className="mb-3 font-semibold text-foreground">
            Departments
          </h2>

          <ul className="grid grid-cols-2 gap-y-2 text-muted-foreground md:block md:space-y-2">
            <li>Roads</li>
            <li>Sanitation</li>
            <li>Water Supply</li>
            <li>Electrical</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CivicPulse. Academic project build.
      </div>
    </footer>
  );
}

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  );
}