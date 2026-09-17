import AppShell from "@/components/layout/AppShell";
import { citizenNav } from "@/constants/navigation";

export default function CitizenLayout() {
  return <AppShell items={citizenNav} roleLabel="Citizen workspace" role="citizen" />;
}
