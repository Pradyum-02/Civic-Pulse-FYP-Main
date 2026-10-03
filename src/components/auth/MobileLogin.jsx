import { useId } from "react";
import Button from "@/components/common/Button";

export default function MobileLogin({
  phoneNumber,
  onPhoneChange,
  onSubmit,
  loading,
  error,
  submitLabel = "Send OTP",
}) {
  const id = useId();

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
          Mobile number
        </label>
        <div className="flex items-center overflow-hidden rounded-xl border border-border bg-card focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
          <span className="flex h-11 items-center border-r border-border bg-secondary px-3 text-sm font-semibold text-foreground">
            +91
          </span>
          <input
            id={id}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            value={phoneNumber.replace(/^\+91\s?/, "")}
            onChange={(event) => onPhoneChange(`+91${event.target.value.replace(/\D/g, "").slice(0, 10)}`)}
            placeholder="Enter mobile number"
            className="h-11 w-full border-0 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
            {error}
          </p>
        ) : (
          <p className="mt-1.5 text-xs text-muted-foreground">We will send a one-time password to this number.</p>
        )}
      </div>

      <Button type="submit" className="w-full" loading={loading} disabled={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}
