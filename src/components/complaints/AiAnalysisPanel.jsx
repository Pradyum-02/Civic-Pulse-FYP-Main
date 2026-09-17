import { Sparkles } from "lucide-react";

/**
 * MOCK ONLY — visual placeholder for the future AI image-detection service.
 * No AI call happens here; the backend/ai-service will provide these values later.
 */
export default function AiAnalysisPanel({ state }) {
  if (!state) return null;

  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-4" aria-live="polite">
      <p className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        AI Analysis
        <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          Preview
        </span>
      </p>
      {state.status === "analyzing" ? (
        <p className="mt-2 text-sm text-muted-foreground">Analyzing image…</p>
      ) : (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-foreground">
            Detected Category: <span className="font-medium">{state.category}</span>
          </p>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Confidence</span>
              <span>{state.confidence}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-primary" style={{ width: `${state.confidence}%` }} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Detection is simulated in this build and will be provided by the AI service later.
          </p>
        </div>
      )}
    </div>
  );
}
