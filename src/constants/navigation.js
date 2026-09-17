import {
  LayoutDashboard,
  FilePlus2,
  ListChecks,
  User,
  Users,
  Building2,
  ShieldCheck,
} from "lucide-react";

export const citizenNav = [
  { to: "/citizen/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/citizen/report", label: "Report Issue", icon: FilePlus2 },
  { to: "/citizen/complaints", label: "My Complaints", icon: ListChecks },
  { to: "/citizen/profile", label: "Profile", icon: User },
];

export const officerNav = [
  { to: "/officer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/officer/complaints", label: "Assigned Complaints", icon: ListChecks },
  { to: "/officer/profile", label: "Profile", icon: User },
];

export const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/complaints", label: "Complaints", icon: ListChecks },
  { to: "/admin/officers", label: "Officers", icon: ShieldCheck },
  { to: "/admin/departments", label: "Departments", icon: Building2 },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/profile", label: "Profile", icon: User },
];
