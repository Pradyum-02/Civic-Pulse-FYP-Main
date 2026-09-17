const map = {
  Submitted: "text-status-submitted",
  "Under Review": "text-status-review",
  Assigned: "text-status-assigned",
  "In Progress": "text-status-progress",
  Resolved: "text-status-resolved",
  Rejected: "text-status-rejected",
};

export default function StatusBadge({ status }) {
  const color = map[status] || map.Submitted;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-current/25 bg-current/10 px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
