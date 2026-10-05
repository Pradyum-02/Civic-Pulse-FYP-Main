import { Link } from "@tanstack/react-router";
import { Building2, Clock, MapPin } from "lucide-react";
import type { Complaint } from "@/data/mockData";
import { PriorityBadge, StatusBadge } from "@/components/civic/StatusBadge";

export default function ComplaintCard({ complaint }: { complaint: Complaint }) {
  return (
    <article className="surface-card group p-4 sm:p-5 transition-all duration-200 hover-lift press-feedback hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.72rem] font-semibold tracking-wide text-muted-foreground">
            #{complaint.id}
          </p>
          <h3 className="mt-1 text-[1.02rem] font-bold text-ink">{complaint.title}</h3>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <dl className="mt-3 grid gap-3 sm:gap-4 text-[0.82rem] text-muted-foreground sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-emerald-brand" aria-hidden />
          <dd>{complaint.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Building2 size={14} className="text-emerald-brand" aria-hidden />
          <dd>{complaint.department}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-emerald-brand" aria-hidden />
          <dd>Reported {complaint.reported}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Priority</dt>
          <PriorityBadge priority={complaint.priority} />
        </div>
      </dl>

      <div className="mt-4 flex justify-end pt-3">
        <Link
          to="/citizen/complaints/$id"
          params={{ id: complaint.id }}
          className="inline-flex items-center rounded-full bg-mint px-4 py-2 text-[0.8rem] font-semibold text-deep hover-lift press-feedback transition-colors hover:bg-emerald-brand hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
