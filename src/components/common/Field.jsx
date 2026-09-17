import { cx } from "@/utils/format";

export function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
    </label>
  );
}

export function FieldWrapper({ id, label, required, hint, error, children }) {
  return (
    <div>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

const base =
  "w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary";

export function Input({ id, label, required, hint, error, className, ...props }) {
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(base, "h-10", error ? "border-destructive" : "border-border", className)}
        {...props}
      />
    </FieldWrapper>
  );
}

export function Textarea({ id, label, required, hint, error, rows = 5, className, ...props }) {
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(base, error ? "border-destructive" : "border-border", className)}
        {...props}
      />
    </FieldWrapper>
  );
}

export function Select({ id, label, required, hint, error, options = [], className, ...props }) {
  return (
    <FieldWrapper id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cx(base, "h-10", error ? "border-destructive" : "border-border", className)}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
