import { cx } from "@/utils/format";

export default function Badge({ children, className, tone = "neutral" }) {
  const tones = {
    neutral: "bg-secondary text-secondary-foreground border-border",
    outline: "bg-transparent text-muted-foreground border-border",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
