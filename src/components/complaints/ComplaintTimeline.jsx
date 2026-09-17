import { Check } from "lucide-react";
import { formatDate } from "@/utils/format";

export default function ComplaintTimeline({ updates = [] }) {
  return (
    <ol className="relative space-y-6 ps-6">
      <span
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px bg-border"
      />
      {updates.map((u, i) => {
        const isLast = i === updates.length - 1;
        return (
          <li key={`${u.status}-${i}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-6 top-1 grid h-4 w-4 place-items-center rounded-full border ${
                isLast ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-transparent"
              }`}
            >
              <Check className="h-2.5 w-2.5" />
            </span>
            <p className="text-sm font-medium text-foreground">{u.status}</p>
            <p className="text-xs text-muted-foreground">{formatDate(u.date)}</p>
            {u.note && <p className="mt-1 text-sm text-muted-foreground">{u.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}
