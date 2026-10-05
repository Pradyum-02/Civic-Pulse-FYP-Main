import { MapPin } from "lucide-react";

interface Props {
  location: string;
  coordinates: string;
  compact?: boolean;
}

export default function MockMap({ location, coordinates, compact = false }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border bg-mint ${
        compact ? "h-40" : "h-64"
      }`}
      role="img"
      aria-label={`Map preview for ${location}`}
    >
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 240" preserveAspectRatio="none">
        <rect width="400" height="240" fill="var(--mint)" />
        <g stroke="white" strokeWidth="10" opacity="0.9">
          <path d="M-10 70 H410" />
          <path d="M-10 170 H410" />
          <path d="M110 -10 V250" />
          <path d="M280 -10 V250" />
        </g>
        <g fill="white" opacity="0.5">
          <rect x="20" y="90" width="70" height="60" rx="4" />
          <rect x="135" y="15" width="120" height="40" rx="4" />
          <rect x="300" y="90" width="80" height="60" rx="4" />
          <rect x="135" y="190" width="120" height="40" rx="4" />
        </g>
        <path d="M-10 120 Q120 150 200 120 T410 140" stroke="var(--sky-soft)" strokeWidth="14" fill="none" />
      </svg>

      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="flex size-9 items-center justify-center rounded-full bg-deep text-white shadow-[var(--shadow-lift)]">
          <MapPin size={17} />
        </span>
      </span>

      <div className="absolute inset-x-3 bottom-3 rounded-lg border border-border bg-card/95 px-3 py-2">
        <p className="text-[0.82rem] font-semibold text-ink">{location}</p>
        <p className="text-[0.74rem] text-muted-foreground">{coordinates}</p>
      </div>
    </div>
  );
}
