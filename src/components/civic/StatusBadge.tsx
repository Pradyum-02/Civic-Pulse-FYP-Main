import type { Priority, Status } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusTone: Record<Status, string> = {
  Pending: "bg-muted text-muted-foreground",
  "Under Review": "bg-sky-soft text-[color:oklch(0.45_0.09_245)]",
  "In Progress": "bg-amber-soft text-[color:oklch(0.52_0.12_70)]",
  Resolved: "bg-mint text-deep",
};

const dotTone: Record<Status, string> = {
  Pending: "bg-muted-foreground",
  "Under Review": "bg-[color:oklch(0.6_0.13_245)]",
  "In Progress": "bg-amber-brand",
  Resolved: "bg-emerald-brand",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.75rem] font-semibold",
        statusTone[status],
        className,
        "hover-lift press-feedback"
      )}
    >
      <span className={cn("size-2 rounded-full", dotTone[status])} aria-hidden />
      {status}
    </span>
  );
}

const priorityTone: Record<Priority, string> = {
  Low: "text-muted-foreground border-border",
  Medium: "text-[color:oklch(0.5_0.09_245)] border-[color:oklch(0.86_0.05_235)]",
  High: "text-[color:oklch(0.55_0.13_60)] border-[color:oklch(0.88_0.07_80)]",
  Critical: "text-destructive border-[color:oklch(0.86_0.07_22)]",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-2 text-[0.75rem] font-semibold uppercase tracking-wide",
        priorityTone[priority],
        "hover-lift press-feedback"
      )}
    >
      {priority}
    </span>
  );
}
