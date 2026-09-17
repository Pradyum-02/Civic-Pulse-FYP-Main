import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar({ items, roleLabel, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col gap-6 border-e border-border bg-card px-4 py-5">
      <div className="px-1">
        <Logo />
        <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">{roleLabel}</p>
      </div>

      <nav aria-label="Main" className="flex-1">
        <ul className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border pt-4">
        <p className="truncate text-sm font-medium text-foreground">{user?.name || "Guest"}</p>
        <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
        <Link
          to="/"
          onClick={() => logout()}
          className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sign out
        </Link>
      </div>
    </div>
  );
}
