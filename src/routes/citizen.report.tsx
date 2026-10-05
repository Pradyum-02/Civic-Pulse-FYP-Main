import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Construction,
  Droplet,
  Lightbulb,
  MoreHorizontal,
  Trash2,
  UploadCloud,
  Waves,
  TriangleAlert,
  X,
} from "lucide-react";
import RequireAuth from "@/components/civic/RequireAuth";
import MockMap from "@/components/civic/MockMap";
import Button from "@/components/common/Button";
import { categories, type Complaint, type Priority } from "@/data/mockData";
import { nextComplaintId, saveLocalReport } from "@/lib/reports";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/citizen/report")({
  head: () => ({
    meta: [
      { title: "Report an Issue — CivicPulse" },
      { name: "description", content: "Report a civic issue with photo and location." },
      { property: "og:title", content: "Report an Issue — CivicPulse" },
      { property: "og:description", content: "Report a civic issue with photo and location." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <ReportIssue />
    </RequireAuth>
  ),
});

const iconMap = {
  cone: Construction,
  trash: Trash2,
  lamp: Lightbulb,
  droplet: Droplet,
  waves: Waves,
  road: TriangleAlert,
  dots: MoreHorizontal,
};

const locations = [
  { name: "MG Road, Pune", coords: "18.5204, 73.8567" },
  { name: "FC Road, Shivajinagar", coords: "18.5236, 73.8412" },
  { name: "Baner Road, Baner", coords: "18.5590, 73.7868" },
];

const stepLabels = ["Category", "Details", "Location", "Photo", "Review"];

const priorityFor: Record<string, Priority> = {
  pothole: "High",
  road: "High",
  water: "Critical",
  drainage: "High",
  streetlight: "Medium",
  garbage: "Medium",
  other: "Low",
};

function ReportIssue() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loc, setLoc] = useState(locations[0]!);
  const [photo, setPhoto] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [doneId, setDoneId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const cat = categories.find((c) => c.id === category);
  const priority = priorityFor[category] ?? "Low";

  const canNext = [
    !!category,
    title.trim().length >= 5 && description.trim().length >= 15,
    !!loc,
    !!photo,
    true,
  ][step];

  const readFile = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const id = nextComplaintId();
    const c: Complaint = {
      id,
      title: title.trim(),
      category: cat?.label ?? "Other",
      status: "Pending",
      priority,
      reported: "Just now",
      reportedDate: new Date().toLocaleString("en-IN"),
      department: cat?.department ?? "Central Desk",
      team: "Awaiting assignment",
      location: loc.name,
      coordinates: loc.coords,
      description: description.trim(),
      confidence: "97.4%",
      timeline: ["Reported", "Verified", "Assigned", "In Progress", "Resolved"].map((label, i) => ({
        label,
        note: i === 0 ? "Complaint submitted by you" : "Pending",
        time: i === 0 ? "Just now" : "—",
        done: i === 0,
        current: i === 1,
      })),
      activity: [{ time: "Just now", text: "Complaint submitted with photo and location." }],
      photo: photo ?? undefined,
    };
    try {
      saveLocalReport(c);
    } catch {
      saveLocalReport({ ...c, photo: undefined });
    }
    setSubmitting(false);
    setDoneId(id);
  };

  if (doneId) {
    return (
      <main className="mx-auto max-w-lg px-5 py-16">
        <div className="surface-card p-9 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint text-emerald-brand">
            <CheckCircle2 size={28} />
          </span>
          <h1 className="mt-5 text-[1.7rem] font-extrabold text-ink">Report Submitted</h1>
          <p className="mt-2 text-muted-foreground">
            It has been sent to {cat?.department}. You'll be notified at every stage.
          </p>
          <p className="mt-6 text-[0.78rem] font-semibold uppercase tracking-wide text-muted-foreground">
            Complaint ID
          </p>
          <p className="font-display text-[1.6rem] font-extrabold text-deep">#{doneId}</p>
          <Link to="/citizen/complaints/$id" params={{ id: doneId }} className="mt-7 block">
            <Button size="lg" className="w-full">
              Track Complaint <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/citizen/dashboard" className="mt-3 inline-block text-[0.85rem] font-semibold text-muted-foreground hover:text-deep">
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <Link
        to="/citizen/dashboard"
        className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-muted-foreground hover:text-deep"
      >
        <ArrowLeft size={15} /> Dashboard
      </Link>
      <h1 className="mt-4 text-[1.9rem] font-extrabold text-ink">Report a Civic Issue</h1>

      <ol className="mt-6 grid grid-cols-5 gap-2" aria-label="Progress">
        {stepLabels.map((l, i) => (
          <li key={l}>
            <span className={cn("block h-1.5 rounded-full", i <= step ? "bg-emerald-brand" : "bg-border")} />
            <span className={cn("mt-2 hidden text-[0.74rem] font-semibold sm:block", i === step ? "text-deep" : "text-muted-foreground")}>
              {i + 1}. {l}
            </span>
          </li>
        ))}
      </ol>

      <section className="surface-card mt-6 p-6 sm:p-8">
        {step === 0 && (
          <>
            <h2 className="text-[1.15rem] font-bold text-ink">Issue Category</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {categories.map((c) => {
                const Icon = iconMap[c.icon as keyof typeof iconMap];
                const active = c.id === category;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all",
                      active ? "border-emerald-brand bg-mint" : "border-border hover:border-emerald-brand/50",
                    )}
                  >
                    <Icon size={20} className={active ? "text-deep" : "text-emerald-brand"} />
                    <span className="text-[0.88rem] font-semibold text-ink">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-[1.15rem] font-bold text-ink">Issue Details</h2>
            <label htmlFor="title" className="mt-5 block text-[0.8rem] font-semibold text-ink">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Deep pothole near bus stop"
              className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 outline-none focus:border-emerald-brand"
            />
            <label htmlFor="desc" className="mt-5 block text-[0.8rem] font-semibold text-ink">Description</label>
            <textarea
              id="desc"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is the problem, how long has it been there, who is affected?"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-3 outline-none focus:border-emerald-brand"
            />
            <p className="mt-1.5 text-[0.76rem] text-muted-foreground">
              Title at least 5 characters, description at least 15.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-[1.15rem] font-bold text-ink">Location</h2>
            <div className="mt-5">
              <MockMap location={loc.name} coordinates={loc.coords} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {locations.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  aria-pressed={l.name === loc.name}
                  onClick={() => setLoc(l)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[0.8rem] font-semibold transition-colors",
                    l.name === loc.name ? "border-emerald-brand bg-mint text-deep" : "border-border text-muted-foreground hover:text-deep",
                  )}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-[1.15rem] font-bold text-ink">Photo</h2>
            {photo ? (
              <div className="relative mt-5 overflow-hidden rounded-xl border border-border">
                <img src={photo} alt="Uploaded issue preview" className="h-72 w-full object-cover" />
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => setPhoto(null)}
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-card text-ink shadow-[var(--shadow-soft)]"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  readFile(e.dataTransfer.files[0]);
                }}
                className={cn(
                  "mt-5 flex h-64 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors",
                  dragging ? "border-emerald-brand bg-mint" : "border-border hover:border-emerald-brand/60",
                )}
              >
                <UploadCloud size={30} className="text-emerald-brand" />
                <span className="text-[0.95rem] font-semibold text-ink">Upload a photo of the issue</span>
                <span className="text-[0.8rem] text-muted-foreground">Drag & drop or click to browse</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => readFile(e.target.files?.[0])}
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-[1.15rem] font-bold text-ink">Review</h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Category", cat?.label],
                ["Priority", priority],
                ["Title", title],
                ["Location", `${loc.name} (${loc.coords})`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted px-4 py-3">
                  <dt className="text-[0.74rem] text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 text-[0.9rem] font-semibold text-ink">{v}</dd>
                </div>
              ))}
              <div className="rounded-xl bg-muted px-4 py-3 sm:col-span-2">
                <dt className="text-[0.74rem] text-muted-foreground">Description</dt>
                <dd className="mt-0.5 text-[0.9rem] text-ink">{description}</dd>
              </div>
            </dl>
            {photo && <img src={photo} alt="Issue photo" className="mt-4 h-48 w-full rounded-xl object-cover" />}
          </>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
            <ArrowLeft size={15} /> Back
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
              Continue <ArrowRight size={15} />
            </Button>
          ) : (
            <Button onClick={submit} loading={submitting}>Submit Report</Button>
          )}
        </div>
      </section>
    </main>
  );
}
