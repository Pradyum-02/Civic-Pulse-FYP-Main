import { Link } from "react-router-dom";

export default function Logo({ to = "/", className = "" }) {
  return (
    <Link to={to} className={`flex items-center gap-2 font-semibold text-foreground ${className}`}>
      <img
        src="/logo-placeholder.png"
        alt="CivicPulse Logo"
        className="h-9 w-auto object-contain"
        draggable={false}
      />
      <span className="text-lg font-extrabold tracking-[-0.06em] text-foreground">CivicPulse</span>
    </Link>
  );
}
