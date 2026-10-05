import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronDown,
  CircleCheck,
  Copy,
  Gauge,
  Layers,
  MapPin,
  Route as RouteIcon,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/common/Button";
import { faqs } from "@/data/mockData";
import cityHero from "@/assets/city-hero.jpg";
import proofBefore from "@/assets/proof-before.jpg";
import proofWork from "@/assets/proof-work.jpg";
import proofAfter from "@/assets/proof-after.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicPulse — Every civic issue, tracked to resolution." },
      {
        name: "description",
        content:
          "CivicPulse routes street-level civic complaints to the right municipal crew and confirms every fix with verified photo proof.",
      },
      { property: "og:title", content: "CivicPulse — Every civic issue, tracked to resolution." },
      {
        property: "og:description",
        content:
          "Report a civic issue in seconds, follow it through triage and assignment, and see photo-verified closure.",
      },
    ],
  }),
  component: Home,
});

const trustRow = [
  { icon: Gauge, label: "Instant Triage" },
  { icon: Copy, label: "Zero Duplicates" },
  { icon: Camera, label: "Photo Verified" },
  { icon: Layers, label: "Transparent Workflow" },
];

const steps = [
  {
    n: "01",
    title: "Report",
    kicker: "Point & snap",
    body: "Capture the issue with photo, location and description.",
    icon: Camera,
  },
  {
    n: "02",
    title: "Classify",
    kicker: "AI dispatch",
    body: "AI-assisted classification identifies issue type and priority.",
    icon: Layers,
  },
  {
    n: "03",
    title: "Assign",
    kicker: "Right desk",
    body: "The issue is routed to the correct department.",
    icon: RouteIcon,
  },
  {
    n: "04",
    title: "Track",
    kicker: "Live status",
    body: "Citizens can follow progress at every checkpoint.",
    icon: Gauge,
  },
  {
    n: "05",
    title: "Resolve",
    kicker: "Verified proof",
    body: "Resolution is verified with evidence.",
    icon: BadgeCheck,
  },
];

const architecture = [
  {
    icon: RouteIcon,
    title: "Smart Routing",
    body: "Complaints move automatically from citizen submission to the appropriate operational team.",
  },
  {
    icon: ShieldCheck,
    title: "Intelligent Triage",
    body: "AI-assisted classification helps structure reports before they enter the field workflow.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Closure",
    body: "Every resolved issue can retain the evidence needed to understand how and when it was fixed.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main>
        <Hero />
        <Architecture />
        <HowItWorks />
        <Triage />
        <PhotoProof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="overview" className="relative isolate overflow-hidden bg-[#edf3f1] animate-enter">
      <div className="absolute inset-0">
        <img
          src={cityHero}
          alt="Aerial view of a green riverfront city"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,251,250,0.96)_0%,rgba(251,252,251,0.9)_32%,rgba(251,252,251,0.35)_52%,rgba(255,255,255,0.08)_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] w-full items-center gap-8 px-4 pb-16 pt-8 sm:px-5 sm:pb-20 sm:pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-12">
        <div className="relative z-10 max-w-[560px] py-6 lg:py-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/80 px-3.5 py-1.5 text-[0.72rem] font-semibold text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-sm animate-enter-delayed" style={{ '--delay-index': '0' }}>
            <span className="size-1.5 rounded-full bg-emerald-brand" aria-hidden />
            Civic Accountability Platform
            <span className="text-border">•</span>
            <span className="text-emerald-brand">Live Interactive Demo</span>
          </span>

          <h1 className="mt-5 text-[2.9rem] font-extrabold leading-[0.9] tracking-[-0.05em] text-ink sm:text-[4rem] lg:text-[6.2rem] animate-enter-delayed" style={{ '--delay-index': '1' }}>
            Every civic issue,
            <br />
            tracked to
            <br />
            <span className="text-emerald-brand underline-amber">resolution.</span>
          </h1>

          <p className="mt-5 max-w-[520px] text-[1.02rem] leading-relaxed text-slate-700 animate-enter-delayed" style={{ '--delay-index': '2' }}>
            Spot a problem on your street and report it in seconds. CivicPulse automatically routes
            the issue to the right field crew, keeps you updated at every stage, and confirms every
            resolution with verified photo proof.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 animate-enter-delayed" style={{ '--delay-index': '3' }}>
            <Link to="/login">
              <Button size="lg" className="h-14 rounded-full bg-[#0f4d49] px-7 text-base font-semibold text-white shadow-[0_18px_36px_rgba(15,77,73,0.18)] hover:bg-[#0b3c38]">
                Report an Issue <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="h-14 rounded-full border border-slate-300 bg-white/80 px-7 text-base font-semibold text-slate-800 shadow-sm hover:bg-white">
                Login
              </Button>
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 animate-enter-delayed" style={{ '--delay-index': '4' }}>
            {trustRow.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[0.78rem] font-semibold text-slate-700"
              >
                <Icon size={14} className="text-emerald-brand" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 min-h-[430px] lg:min-h-[560px]">
          <div className="absolute inset-0">
            <div className="hero-card surface-card absolute left-0 top-3 w-[320px] rounded-[1.6rem] border border-slate-200/90 bg-white/88 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:w-[330px]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.9rem] font-bold text-slate-900">Pothole Report</p>
                  <p className="mt-0.5 text-[0.76rem] text-slate-600">MG Road &amp; 4th Cross</p>
                </div>
                <span className="text-[0.72rem] font-semibold text-slate-500">#CIV-8492</span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-2.5 py-1 text-[0.72rem] font-semibold text-[#8B5E20]">
                <span className="size-1.5 rounded-full bg-amber-brand" aria-hidden /> In Progress
              </span>
              <div className="mt-4 flex items-center gap-1">
                {["Reported", "Routed", "In Progress", "Resolved"].map((s, i) => (
                  <div key={s} className="flex-1">
                    <span
                      className={`block h-1.5 rounded-full ${
                        i < 2 ? "bg-emerald-brand" : i === 2 ? "bg-amber-brand" : "bg-slate-200"
                      }`}
                    />
                    <span className="mt-1.5 block text-[0.58rem] font-medium text-slate-500">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-card hero-card--delay-1 surface-card absolute right-0 top-28 w-[240px] rounded-[1.4rem] border border-slate-200/80 bg-white/88 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.1)] backdrop-blur-sm">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-emerald-brand">
                AI Triage
              </p>
              <dl className="mt-3 space-y-2 text-[0.76rem]">
                {[
                  ["Issue", "Road Damage"],
                  ["Priority", "Tier 1"],
                  ["Department", "Public Works"],
                  ["Confidence", "98.8%"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-semibold text-slate-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="hero-card hero-card--delay-2 surface-card absolute bottom-16 left-10 w-[260px] rounded-[1.3rem] border border-slate-200/90 bg-white/88 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-mint text-deep">
                  <Wrench size={16} />
                </span>
                <div>
                  <p className="text-[0.7rem] text-slate-500">Assigned to</p>
                  <p className="text-[0.86rem] font-bold text-slate-900">Road Maintenance Team</p>
                </div>
              </div>
            </div>

            <div className="hero-card hero-card--delay-3 surface-card absolute -bottom-2 right-4 flex items-center gap-2.5 rounded-[1.2rem] border border-slate-200/90 bg-white/88 px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-brand/10 text-emerald-brand">
                <CircleCheck size={16} className="text-emerald-brand" aria-hidden />
              </span>
              <div>
                <p className="text-[0.82rem] font-bold text-slate-900">Resolution</p>
                <p className="text-[0.7rem] text-slate-500">Photo Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-emerald-brand">
        {kicker}
      </p>
      <h2 className="mt-3 text-[2rem] font-extrabold leading-tight text-ink sm:text-[2.5rem]">
        {title}
      </h2>
      {body && <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-[1200px] w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <SectionHead
        kicker="Architecture"
        title="One platform between the street and the desk."
        body="CivicPulse connects what a resident sees with the municipal team that can act on it, and keeps a record of everything in between."
      />
      <div className="mt-6 grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3 animate-enter">
        {architecture.map(({ icon: Icon, title, body }, index) => (
          <article key={title} className={`surface-card p-4 sm:p-5 animate-enter-delayed`} style={{ '--delay-index': index }}>
            <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-deep">
              <Icon size={18} />
            </span>
            <h3 className="mt-4 text-[1rem] font-bold text-ink">{title}</h3>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-card">
      <div className="mx-auto max-w-[1200px] w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHead
          kicker="How it works"
          title="From report to resolution."
          body="From a street photo to a documented fix, every step is written to one status history."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-enter">
          {steps.map(({ n, title, kicker, body, icon: Icon }, i) => (
            <article
              key={n}
              className={`rounded-2xl border p-4 sm:p-5 transition-colors hover-lift press-feedback ${
                i === 0
                  ? "border-emerald-brand bg-mint/50"
                  : "border-border bg-background hover:border-emerald-brand/50"
              } animate-enter-delayed`} style={{ '--delay-index': i }}>
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex size-7 items-center justify-center rounded-full text-[0.74rem] font-bold ${
                    i === 0 ? "bg-emerald-brand text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {Number(n)}
                </span>
                <Icon size={16} className="text-emerald-brand" aria-hidden />
              </div>
              <h3 className="mt-4 text-[1.05rem] font-bold text-ink">{title}</h3>
              <p className="mt-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-amber-brand">
                {kicker}
              </p>
              <p className="mt-3 text-[0.84rem] leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Triage() {
  return (
    <section id="triage" className="mx-auto max-w-[1200px] w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 animate-enter">
      <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2">
        <SectionHead
          kicker="Intelligent Triage"
          title="A report should never wait in a general queue."
          body="Each submission is read for category, severity and jurisdiction before a human opens it, so the right department sees it first — and a duplicate report of the same pothole folds into the existing case instead of creating a second one."
        />
        <div className="surface-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Classification result
            </span>
            <span className="rounded-full bg-mint px-2.5 py-1 text-[0.7rem] font-bold text-deep">
              98.8% match
            </span>
          </div>
          <div className="mt-5 rounded-xl border border-border p-4">
            <p className="text-[0.74rem] text-muted-foreground">Target department</p>
            <p className="text-[1.1rem] font-bold text-ink">Public Works &amp; Roads</p>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-[0.82rem]">
            {[
              ["Priority", "Tier 1"],
              ["Ward", "Zone 4"],
              ["Duplicates merged", "2"],
              ["Response SLA", "4 hours"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-muted px-3.5 py-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-bold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

const proofSteps = [
  { label: "Before", img: proofBefore, note: "Citizen photo, GPS tagged" },
  { label: "Work completed", img: proofWork, note: "Crew update from site" },
  { label: "After", img: proofAfter, note: "Closure evidence attached" },
];

function PhotoProof() {
  return (
    <section id="photo-proof" className="border-y border-border bg-card animate-enter">
      <div className="mx-auto max-w-[1200px] w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHead
          kicker="Photo Proof"
          title="Every resolution should leave evidence."
          body="Field officers upload photos as work progresses, and the citizen who reported the issue sees the same evidence attached to the case. A complaint is only closed once that proof exists."
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 animate-enter">
          {proofSteps.map((s, i) => (
            <figure key={s.label} className={`surface-card overflow-hidden animate-enter-delayed`} style={{ '--delay-index': i }}>
              <img
                src={s.img}
                alt={`${s.label} — road repair`}
                width={928}
                height={720}
                loading="lazy"
                className="h-48 w-full object-cover"
              />
              <figcaption className="flex items-center justify-between gap-2.5 p-3">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-emerald-brand">
                    {s.label}
                  </p>
                  <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{s.note}</p>
                </div>
                {i === 2 ? (
                  <BadgeCheck size={18} className="shrink-0 text-emerald-brand" aria-hidden />
                ) : (
                  <ArrowRight size={16} className="shrink-0 text-border" aria-hidden />
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-[1200px] w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 animate-enter">
      <SectionHead kicker="FAQ" title="Questions residents ask first." />
      <div className="mt-5 grid gap-3 sm:grid-cols-1 lg:grid-cols-2 animate-enter">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`surface-card overflow-hidden animate-enter-delayed`} style={{ '--delay-index': i }}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover-lift press-feedback"
              >
                <span className="text-[0.9rem] font-bold text-ink">{f.q}</span>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className={`shrink-0 text-emerald-brand transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-3 pb-3 text-[0.85rem] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-[1200px] w-full overflow-hidden rounded-3xl bg-deep px-4 py-12 text-center sm:px-6 animate-enter">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[0.74rem] font-semibold text-white/80 animate-enter-delayed" style={{ '--delay-index': '0' }}>
          <MapPin size={13} aria-hidden /> Citizen portal
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl text-[1.8rem] font-extrabold leading-tight text-white sm:text-[2.4rem] animate-enter-delayed" style={{ '--delay-index': '1' }}>
          A better way to close the loop on civic issues.
        </h2>
        <p className="mt-3 text-[0.95rem] text-white/70 animate-enter-delayed" style={{ '--delay-index': '2' }}>Report. Route. Track. Fix. Verify.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 animate-enter-delayed" style={{ '--delay-index': '3' }}>
          <Link to="/login">
            <Button size="lg" variant="amber">
              Launch Citizen Portal <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="lg"
              variant="ghost"
              className="border border-white/25 text-white hover:bg-white/10 hover:text-white hover-lift press-feedback"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
