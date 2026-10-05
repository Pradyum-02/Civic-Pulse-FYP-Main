interface LogoProps {
  showSubtitle?: boolean;
  invert?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function Logo({
  showSubtitle = false,
  invert = false,
  size = "md",
  className = "",
}: LogoProps) {
  const isSmall = size === "sm";

  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/logo-placeholder.png"
        alt="CivicPulse logo"
        className={`${isSmall ? "h-8" : "h-10"} w-auto shrink-0 ${className}`.trim()}
      />
      <span className="flex flex-col leading-none">
        {showSubtitle ? (
          <>
            <span
              className={`font-display text-[1.1rem] font-extrabold tracking-tight ${
                invert ? "text-white" : "text-ink"
              }`}
            >
              Civic<span className="text-emerald-brand">Pulse</span>
            </span>
            <span
              className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] ${
                invert ? "text-white/60" : "text-muted-foreground"
              }`}
            >
              Civic Accountability Platform
            </span>
          </>
        ) : null}
      </span>
    </span>
  );
}
