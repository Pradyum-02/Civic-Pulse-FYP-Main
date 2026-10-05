import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import RequireAuth from "@/components/civic/RequireAuth";
import ComplaintCard from "@/components/civic/ComplaintCard";
import Button from "@/components/common/Button";
import { complaints as seed, dashboardStats } from "@/data/mockData";
import { getAllComplaints } from "@/lib/reports";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/citizen/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CivicPulse" },
      { name: "description", content: "Your civic reports and their live status." },
      { property: "og:title", content: "Dashboard — CivicPulse" },
      { property: "og:description", content: "Your civic reports and their live status." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

const toneClass: Record<string, string> = {
  deep: "bg-mint text-deep",
  amber: "bg-amber-soft text-[color:oklch(0.52_0.12_70)]",
  emerald: "bg-mint text-emerald-brand",
  slate: "bg-muted text-muted-foreground",
};

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

function Dashboard() {
  const { user } = useAuth();
  const [list, setList] = useState(seed);
  const [hello, setHello] = useState("Good morning");

  useEffect(() => {
    setList(getAllComplaints());
    setHello(greeting());
  }, []);

  const extra = list.length - seed.length;

  return (
    <main className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[2rem] font-extrabold text-ink">
            {hello}, {user?.name.split(" ")[0] ?? "Citizen"}.
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            Here's what's happening with your civic reports.
          </p>
        </div>
        <Link to="/citizen/report">
          <Button size="lg">
            <Plus size={17} /> Report an Issue
          </Button>
        </Link>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Report stats">
        {dashboardStats.map((s) => {
          const value =
            s.label === "Total Reports" ? s.value + extra : s.label === "Pending" ? s.value + extra : s.value;
          return (
            <div key={s.label} className="surface-card p-5">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${toneClass[s.tone]}`}
              >
                {s.label}
              </span>
              <p className="mt-4 font-display text-[2.2rem] font-extrabold text-ink">{value}</p>
            </div>
          );
        })}
      </section>

      <section id="complaints" className="mt-12 scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.3rem] font-bold text-ink">My complaints</h2>
          <span className="text-[0.82rem] text-muted-foreground">{list.length} total</span>
        </div>
        {list.length === 0 ? (
          <div className="surface-card mt-5 p-10 text-center text-muted-foreground">
            No reports yet. Your first one takes under a minute.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {list.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
