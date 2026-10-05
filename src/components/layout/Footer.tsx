import Logo from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card" id="docs">
      <div className="mx-auto flex max-w-[1200px] w-full flex-col gap-4 px-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-4 lg:px-8">
        <Logo showSubtitle className="h-10 w-auto" />
        <p className="text-[0.75rem] text-muted-foreground">
          Every civic issue, tracked to resolution. · Demo build, no live municipal data.
        </p>
      </div>
    </footer>
  );
}
