import { useState } from "react";
import { Outlet } from "react-router-dom";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import RequireAuth from "./RequireAuth";

export default function AppShell({ items, roleLabel, role }) {
  const [open, setOpen] = useState(false);

  return (
    <RequireAuth role={role}>
      <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block lg:h-screen lg:sticky lg:top-0">
          <Sidebar items={items} roleLabel={roleLabel} />
        </aside>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation menu"
              className="absolute inset-0 bg-foreground/40"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 h-full w-72 max-w-[85%]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="absolute right-3 top-4 z-20 grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <Sidebar items={items} roleLabel={roleLabel} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-col">
          <Navbar onOpenMenu={() => setOpen(true)} title={roleLabel} />
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
