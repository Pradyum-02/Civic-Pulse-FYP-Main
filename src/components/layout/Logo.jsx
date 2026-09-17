import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Logo({ to = "/" }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-semibold text-foreground">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Activity className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-[15px] tracking-tight">CivicPulse</span>
    </Link>
  );
}
