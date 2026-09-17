import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import {
  ArrowRight,
  ClipboardList,
  Droplets,
  Lightbulb,
  MapPin,
  Recycle,
  ShieldCheck,
  TrafficCone,
  Timer,
  Building2,
} from "lucide-react";

import Button from "@/components/common/Button";

const categories = [
  {
    icon: TrafficCone,
    label: "Potholes",
    desc: "Damaged roads and unsafe surfaces",
  },
  {
    icon: Recycle,
    label: "Garbage",
    desc: "Uncollected waste and dumping",
  },
  {
    icon: Droplets,
    label: "Water Leakage",
    desc: "Pipeline leaks and wastage",
  },
  {
    icon: Lightbulb,
    label: "Streetlights",
    desc: "Dark stretches and faulty poles",
  },
];

const steps = [
  {
    icon: MapPin,
    title: "Report with location",
    desc: "Add a photo, pick the exact spot on the map and describe the issue.",
  },
  {
    icon: Building2,
    title: "Routed to a department",
    desc: "The complaint is reviewed and assigned to the responsible department and officer.",
  },
  {
    icon: Timer,
    title: "Track until resolved",
    desc: "Follow every status change on a clear timeline until the work is complete.",
  },
];

const benefits = [
  {
    icon: ClipboardList,
    title: "One record per issue",
    desc: "Every complaint carries an ID, department, officer and full update history.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable workflow",
    desc: "Officers and administrators work from the same status model as citizens see.",
  },
  {
    icon: MapPin,
    title: "Location-first",
    desc: "Map-based reporting removes vague addresses and speeds up field work.",
  },
];

function LandingPage() {
  useDocumentTitle("CivicPulse — Report and Track Civic Issues");

  return (
    <div className="min-h-full bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-24">
          {/* Hero Content */}
          <div>
            <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
              Civic issue reporting &amp; management
            </span>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Report civic issues.
              <span className="block text-primary">
                Follow them to resolution.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              CivicPulse connects citizens, department officers and municipal
              administrators on a single, transparent workflow — from the
              first photo to the final status update.
            </p>

            {/* CTA */}
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                as={Link}
                to="/citizen/report"
                size="lg"
                className="w-full sm:w-auto"
              >
                Report an Issue
                <ArrowRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Button>

              <Button
                as={Link}
                to="/citizen/complaints"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                Track Complaint
              </Button>
            </div>

            {/* Small mobile trust line */}
            <div className="mt-7 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Transparent. Location-based. Trackable.</span>
            </div>
          </div>

          {/* Categories Card */}
          <div className="mt-10 card-surface p-5 sm:p-6 lg:mt-0">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-foreground">
                What can you report?
              </p>

              <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                4 common issues
              </span>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-3">
              {categories.map(({ icon: Icon, label, desc }) => (
                <li
                  key={label}
                  className="rounded-xl border border-border bg-secondary/40 p-3.5 transition-colors hover:bg-secondary sm:p-4"
                >
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-background text-primary">
                    <Icon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {label}
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground sm:text-xs">
                    {desc}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[11px] leading-4 text-muted-foreground sm:text-xs">
              Anything else fits under “Other civic issues”.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Simple workflow
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How it works
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            From reporting an issue to seeing it resolved, every step stays
            visible.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className="card-surface p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>

                <span className="text-xs font-semibold text-muted-foreground">
                  STEP {i + 1}
                </span>
              </div>

              <h3 className="mt-5 text-base font-semibold text-foreground">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why CivicPulse */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Built for accountability
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Why CivicPulse
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-background p-5 sm:p-6"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="card-surface overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
                Ready to report an issue?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create an account as a citizen, or sign in as an officer or
                administrator.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                as={Link}
                to="/register"
                className="w-full sm:w-auto"
              >
                Create account
              </Button>

              <Button
                as={Link}
                to="/login"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;