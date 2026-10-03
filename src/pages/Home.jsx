import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Landmark,
  MapPin,
  ShieldCheck,
  Timer,
  Wrench,
  Zap,
} from "lucide-react";

import Button from "@/components/common/Button";

const issueCategories = [
  { icon: Wrench, label: "Roads", detail: "Potholes and damaged streets" },
  { icon: ClipboardList, label: "Sanitation", detail: "Garbage and waste overflow" },
  { icon: Zap, label: "Streetlights", detail: "Faulty or missing lights" },
  { icon: MapPin, label: "Water", detail: "Leaks and drainage issues" },
];

const workflow = [
  { icon: MapPin, title: "Report with location", description: "Add a precise address, notes, and photo for the problem you want fixed." },
  { icon: Building2, title: "Assigned to a department", description: "Issues move into the right team with clear ownership and a visible timeline." },
  { icon: Timer, title: "Track until resolved", description: "Citizens and officials stay aligned through every update and close-out step." },
];

const civicBenefits = [
  { icon: ShieldCheck, title: "Transparent accountability", description: "No lost complaints or unclear ownership. Every issue has a status history." },
  { icon: Landmark, title: "Better municipal response", description: "Departments can triage and assign work faster with location-aware data." },
  { icon: CheckCircle2, title: "Visible civic impact", description: "Track progress from first report to resolved action and improved public services." },
];

const stats = [
  { value: "48 hrs", label: "average review cycle" },
  { value: "12k+", label: "issues tracked" },
  { value: "92%", label: "resolution visibility" },
];

function LandingPage() {
  useDocumentTitle("CivicPulse — Report and Track Civic Issues");

  return (
    <div className="min-h-full bg-background">
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/image.png')" }} />
        <div className="absolute inset-0 bg-[#123a34]/70" />

        <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-16 sm:px-6 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
              civic issue reporting &amp; management
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Report. Track. Improve your community.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              CivicPulse helps citizens, officers, and city administrators respond to public issues faster, more transparently, and with clear accountability.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as={Link} to="/login" size="lg" className="w-full sm:w-auto">
                Get started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button as={Link} to="/citizen/report" variant="secondary" size="lg" className="w-full sm:w-auto">
                Report an issue
              </Button>
            </div>
          </div>

          <div className="mt-10 grid max-w-md gap-3 sm:grid-cols-3">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-sm backdrop-blur-sm">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What can you report?</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Civic issues, resolved with clarity.</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {issueCategories.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="card-surface p-5 transition hover:-translate-y-0.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Simple workflow</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">How CivicPulse works</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workflow.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Step {index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Built for trust</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Why residents rely on CivicPulse</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {civicBenefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Ready to act</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Make service delivery more visible and responsive.</h2>
          </div>

          <Button as={Link} to="/login" size="lg">
            Sign in with mobile
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
