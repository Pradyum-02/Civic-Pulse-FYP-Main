import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Bell, MessageSquare, UserCheck } from "lucide-react";
import RequireAuth from "@/components/civic/RequireAuth";
import { notifications as seed } from "@/data/mockData";

export const Route = createFileRoute("/citizen/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CivicPulse" },
      { name: "description", content: "Updates on your civic complaints." },
      { property: "og:title", content: "Notifications — CivicPulse" },
      { property: "og:description", content: "Updates on your civic complaints." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Notifications />
    </RequireAuth>
  ),
});

const icons = {
  assigned: { Icon: UserCheck, cls: "bg-mint text-deep" },
  update: { Icon: MessageSquare, cls: "bg-amber-soft text-[color:oklch(0.52_0.12_70)]" },
  resolved: { Icon: BadgeCheck, cls: "bg-mint text-emerald-brand" },
  review: { Icon: Bell, cls: "bg-sky-soft text-[color:oklch(0.45_0.09_245)]" },
};

function Notifications() {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => n.unread).length;

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[1.9rem] font-extrabold text-ink">Notifications</h1>
          <p className="mt-1 text-muted-foreground">{unread} unread</p>
        </div>
        <button
          type="button"
          disabled={unread === 0}
          onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}
          className="text-[0.84rem] font-semibold text-emerald-brand disabled:opacity-40"
        >
          Mark all as read
        </button>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((n) => {
          const { Icon, cls } = icons[n.type];
          return (
            <li key={n.id} className="surface-card flex gap-4 p-5">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${cls}`}>
                <Icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[0.92rem] font-semibold text-ink">{n.title}</p>
                  {n.unread && (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-amber-brand" aria-label="Unread" />
                  )}
                </div>
                <p className="mt-1 text-[0.85rem] text-muted-foreground">{n.body}</p>
                <p className="mt-2 text-[0.75rem] text-muted-foreground/80">{n.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
