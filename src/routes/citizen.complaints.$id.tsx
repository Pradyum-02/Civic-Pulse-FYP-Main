import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import RequireAuth from "@/components/civic/RequireAuth";
import Timeline from "@/components/civic/Timeline";
import MockMap from "@/components/civic/MockMap";
import { PriorityBadge, StatusBadge } from "@/components/civic/StatusBadge";
import { complaints, type Complaint } from "@/data/mockData";
import { getAllComplaints } from "@/lib/reports";
import proofBefore from "@/assets/proof-before.jpg";

export const Route = createFileRoute("/citizen/complaints/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} — CivicPulse` },
      { name: "description", content: `Status and timeline for complaint ${params.id}.` },
      { property: "og:title", content: `${params.id} — CivicPulse` },
      { property: "og:description", content: `Status and timeline for complaint ${params.id}.` },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Details />
    </RequireAuth>
  ),
});

type WithPhoto = Complaint;

function Details() {
  const { id } = Route.useParams();
  const [c, setC] = useState<WithPhoto | undefined>(complaints.find((x) => x.id === id));
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setC(getAllComplaints().find((x) => x.id === id));
    setChecked(true);
  }, [id]);

  if (!c) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        {checked ? (
          <>
            <h1 className="text-2xl font-bold text-ink">Complaint not found</h1>
            <p className="mt-2 text-muted-foreground">We couldn't find #{id}.</p>
            <Link to="/citizen/dashboard" className="mt-6 inline-block font-semibold text-emerald-brand">
              Back to dashboard
            </Link>
          </>
        ) : null}
      </main>
    );
  }

  const info = [
    ["Location", c.location],
    ["Department", c.department],
    ["Assigned team", c.team],
    ["Reported", c.reportedDate],
    ["AI confidence", c.confidence],
  ];

  return (
    <main className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8">
      <Link
        to="/citizen/dashboard"
        className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-muted-foreground hover:text-deep"
      >
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <header className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.8rem] font-semibold text-muted-foreground">#{c.id}</p>
          <h1 className="mt-1 text-[1.9rem] font-extrabold text-ink">{c.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={c.priority} />
          <StatusBadge status={c.status} className="uppercase" />
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <section className="surface-card overflow-hidden">
            <img
              src={c.photo ?? proofBefore}
              alt={`Photo of ${c.title}`}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="p-6">
              <h2 className="text-[1.05rem] font-bold text-ink">Description</h2>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {info.map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-muted px-4 py-3">
                    <dt className="text-[0.74rem] text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 text-[0.9rem] font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-[1.05rem] font-bold text-ink">Activity</h2>
            <ul className="mt-4 divide-y divide-border">
              {c.activity.map((a, i) => (
                <li key={i} className="flex gap-4 py-3">
                  <span className="w-24 shrink-0 text-[0.78rem] font-semibold text-emerald-brand">
                    {a.time}
                  </span>
                  <span className="text-[0.88rem] text-muted-foreground">{a.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="surface-card p-6">
            <h2 className="mb-5 text-[1.05rem] font-bold text-ink">Status timeline</h2>
            <Timeline events={c.timeline} />
          </section>
          <MockMap location={c.location} coordinates={c.coordinates} compact />
        </aside>
      </div>
    </main>
  );
}
