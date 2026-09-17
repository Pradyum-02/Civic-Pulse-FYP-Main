import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Building2 } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import Badge from "../common/Badge";
import { categoryLabel } from "@/mock/mockData";
import { formatDate } from "@/utils/format";

export default function ComplaintCard({ complaint, to }) {
  return (
    <Link
      to={to}
      className="card-surface block p-5 transition-colors hover:border-primary/50"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{complaint.id}</span>
          <Badge tone="outline">{categoryLabel(complaint.category)}</Badge>
        </div>
        <StatusBadge status={complaint.status} />
      </div>
      <h3 className="mt-3 text-base font-semibold text-foreground">{complaint.title}</h3>
      <dl className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <dd className="truncate">{complaint.address}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" aria-hidden="true" />
          <dd className="truncate">{complaint.department}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <dd>{formatDate(complaint.createdAt)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">
        Last update: {formatDate(complaint.updatedAt)}
      </p>
    </Link>
  );
}
