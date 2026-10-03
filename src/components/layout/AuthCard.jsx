import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function AuthCard({ title, description, children, footer }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
      </div>
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="card-surface w-full max-w-md p-6 sm:p-8">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>
      <p className="pb-6 text-center text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Back to home
        </Link>
      </p>
    </div>
  );
}
