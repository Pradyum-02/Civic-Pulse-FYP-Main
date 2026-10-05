import { Check } from "lucide-react";
import type { TimelineEvent } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-6">
      {events.map((e, i) => (
        <li key={e.label} className="relative flex gap-4 pl-1">
          {i < events.length - 1 && (
            <span
              aria-hidden
              className={cn(
                "absolute left-[0.72rem] top-7 h-[calc(100%+0.6rem)] w-px",
                e.done ? "bg-emerald-brand/40" : "bg-border",
              )}
            />
          )}
          <span
            aria-hidden
            className={cn(
              "relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2",
              e.done && "border-emerald-brand bg-emerald-brand text-white",
              e.current && !e.done && "border-amber-brand bg-amber-brand",
              !e.done && !e.current && "border-border bg-card",
            )}
          >
            {e.done && <Check size={13} strokeWidth={3} />}
          </span>
          <div className="min-w-0">
            <p
              className={cn(
                "text-[0.92rem] font-semibold",
                e.done || e.current ? "text-ink" : "text-muted-foreground",
              )}
            >
              {e.label}
            </p>
            <p className="text-[0.82rem] text-muted-foreground">{e.note}</p>
            <p className="mt-0.5 text-[0.75rem] text-muted-foreground/80">{e.time}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
