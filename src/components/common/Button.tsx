import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "amber" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-deep text-white hover:bg-emerald-brand disabled:hover:bg-deep shadow-[0_6px_18px_oklch(0.312_0.05_172/0.22)]",
  secondary: "bg-card text-ink border border-border hover:border-emerald-brand hover:text-deep",
  ghost: "bg-transparent text-muted-foreground hover:text-deep hover:bg-mint",
  amber: "bg-amber-brand text-ink hover:brightness-105",
  danger: "bg-transparent text-destructive border border-border hover:bg-rose-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.85rem]",
  md: "h-12 px-5 text-[0.9rem]",
  lg: "h-14 px-6 text-[0.95rem]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover-lift press-feedback",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {loading && (
        <span
          aria-hidden
          className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
