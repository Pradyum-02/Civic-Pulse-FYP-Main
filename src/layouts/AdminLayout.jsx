import AppShell from "@/components/layout/AppShell";
import { adminNav } from "@/constants/navigation";

export default function AdminLayout() {
  return <AppShell items={adminNav} roleLabel="Administration" role="admin" />;
}
