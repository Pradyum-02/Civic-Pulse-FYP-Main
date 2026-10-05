import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/common/Button";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Intelligent Triage", href: "#triage" },
  { label: "Photo Proof", href: "#photo-proof" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "#docs" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-white/75 shadow-[0_8px_25px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "border-b border-white/20 bg-white/5 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] w-full items-center justify-between gap-4 px-3 py-2 sm:px-4 sm:py-3 lg:px-8">
        <Link to="/" aria-label="CivicPulse home" className="flex items-center">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-4 sm:gap-5 xl:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-[0.75rem] font-medium transition-colors hover-lift press-feedback ${
                scrolled ? "text-muted-foreground hover:text-deep" : "text-slate-700/90 hover:text-deep"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className={`hidden size-9 items-center justify-center rounded-full border transition-colors hover-lift press-feedback sm:inline-flex ${
              scrolled
                ? "border-border bg-white text-muted-foreground hover:border-emerald-brand hover:text-deep"
                : "border-white/70 bg-white/10 text-slate-800 shadow-sm hover:border-emerald-brand hover:text-deep"
            }`}
          >
            <Search size={16} />
          </button>
          <Link to="/login" className="hidden sm:block">
            <Button
              size="sm"
              className={`h-9 px-3 ${scrolled ? "" : "bg-[#0f4d49] text-white hover:bg-[#0d403d]"}`}
            >
              Login
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`inline-flex size-9 items-center justify-center rounded-full border hover-lift press-feedback xl:hidden ${
              scrolled
                ? "border-border bg-white text-deep"
                : "border-white/80 bg-white/10 text-slate-800 shadow-sm"
            }`}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white/90 px-4 pb-4 pt-2 backdrop-blur-md xl:hidden animate-enter transition-all duration-300 ease-out">
          <nav className="flex flex-col space-y-1" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover-lift press-feedback hover:text-deep"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <Link to="/login" onClick={() => setOpen(false)} className="mt-3 block w-full">
            <Button className="h-10 w-full">Login</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
