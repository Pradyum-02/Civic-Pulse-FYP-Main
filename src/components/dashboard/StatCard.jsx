export default function StatCard({ label, value, icon: Icon, tone = "text-primary" }) {
  return (
    <div className="card-surface flex items-center gap-4 p-4">
      {Icon && (
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary ${tone}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      )}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      </div>
    </div>
  );
}
