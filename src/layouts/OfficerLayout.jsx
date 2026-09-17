import AppShell from "@/components/layout/AppShell";
import { officerNav } from "@/constants/navigation";

export default function OfficerLayout() {
  return <AppShell items={officerNav} roleLabel="Officer workspace" role="officer" />;
}
