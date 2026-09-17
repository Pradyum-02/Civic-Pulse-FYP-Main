import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ClipboardList, Clock, FilePlus2, Hammer, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import Button from "@/components/common/Button";
import StatCard from "@/components/dashboard/StatCard";
import ComplaintCard from "@/components/complaints/ComplaintCard";
import { EmptyState } from "@/components/common/States";
import { complaints } from "@/mock/mockData";
import { statusSummary, byStatus } from "@/utils/stats";
import { useAuth } from "@/context/AuthContext";

function CitizenDashboard() {
  useDocumentTitle("Citizen Dashboard — CivicPulse");
  const { user } = useAuth();
  const mine = complaints;
  const s = statusSummary(mine);
  const recent = mine.slice(0, 3);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "citizen"}`}
        description="Track the civic issues you have reported in your area."
        actions={
          <Button as={Link} to="/citizen/report">
            <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            Report New Issue
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total complaints" value={s.total} icon={ClipboardList} />
        <StatCard label="Pending" value={s.pending} icon={Clock} tone="text-status-review" />
        <StatCard label="In progress" value={s.inProgress} icon={Hammer} tone="text-status-progress" />
        <StatCard label="Resolved" value={s.resolved} icon={CheckCircle2} tone="text-status-resolved" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Recent complaints"
              action={
                <Button as={Link} to="/citizen/complaints" variant="ghost" size="sm">
                  View all
                </Button>
              }
            />
            {recent.length ? (
              <div className="space-y-3">
                {recent.map((c) => (
                  <ComplaintCard
                    key={c.id}
                    complaint={c}
                    to={`/citizen/complaints/${c.id}`}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No complaints yet"
                description="Report your first civic issue to see it here."
                action={
                  <Button as={Link} to="/citizen/report" size="sm">
                    Report an issue
                  </Button>
                }
              />
            )}
          </Card>
        </div>

        <Card>
          <CardHeader title="Status overview" />
          <ul className="space-y-3">
            {byStatus(mine).map(({ name, value }) => {
              const pct = s.total ? Math.round((value / s.total) * 100) : 0;
              return (
                <li key={name}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{name}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </>
  );
}

export default CitizenDashboard;
