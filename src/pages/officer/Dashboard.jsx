import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ClipboardList, Clock, Hammer, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import Button from "@/components/common/Button";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import { complaints, categoryLabel } from "@/mock/mockData";
import { statusSummary } from "@/utils/stats";
import { formatDate } from "@/utils/format";
import { useAuth } from "@/context/AuthContext";

function OfficerDashboard() {
  useDocumentTitle("Officer Dashboard — CivicPulse");
  const { user } = useAuth();
  const assigned = complaints.filter((c) => c.officer);
  const s = statusSummary(assigned);

  const columns = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: "title", header: "Complaint", render: (r) => r.title },
    { key: "category", header: "Category", render: (r) => categoryLabel(r.category) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "createdAt", header: "Assigned", render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <>
      <PageHeader
        title={`Good day, ${user?.name?.split(" ")[0] || "officer"}`}
        description="Complaints assigned to you and their current progress."
        actions={
          <Button as={Link} to="/officer/complaints" variant="outline">
            View all assignments
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Assigned complaints" value={s.total} icon={ClipboardList} />
        <StatCard label="Pending" value={s.pending} icon={Clock} tone="text-status-review" />
        <StatCard label="In progress" value={s.inProgress} icon={Hammer} tone="text-status-progress" />
        <StatCard label="Resolved" value={s.resolved} icon={CheckCircle2} tone="text-status-resolved" />
      </div>

      <Card className="mt-6">
        <CardHeader title="Recent assignments" />
        <DataTable columns={columns} rows={assigned.slice(0, 5)} />
      </Card>
    </>
  );
}

export default OfficerDashboard;
