import { Menu } from "lucide-react";
import Logo from "./Logo";

export default function Navbar({ onOpenMenu, title }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
        <span className="lg:hidden">
          <Logo />
        </span>
        <span className="hidden text-sm font-medium text-muted-foreground lg:block">{title}</span>
      </div>
    </header>
  );
}
