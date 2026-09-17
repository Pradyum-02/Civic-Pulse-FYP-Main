import { cx } from "@/utils/format";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 border border-transparent",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-accent border border-border",
  outline: "bg-transparent text-foreground border border-border hover:bg-secondary",
  ghost: "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90 border border-transparent",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-10 w-10",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  loading = false,
  disabled,
  children,
  ...props
}) {
  return (
    <Comp
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-55",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={Comp === "button" ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </Comp>
  );
}
