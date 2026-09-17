import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import Button from "./Button";

export function LoadingState({ label = "Loading…" }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <Inbox className="h-7 w-7 text-muted-foreground" aria-hidden="true" />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <AlertTriangle className="h-7 w-7 text-destructive" aria-hidden="true" />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
