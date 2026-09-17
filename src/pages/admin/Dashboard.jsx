import useDocumentTitle from "@/hooks/useDocumentTitle";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClipboardList, Clock, Hammer, CheckCircle2, XCircle } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import { complaints, categoryLabel } from "@/mock/mockData";
import { statusSummary, byCategory, byStatus } from "@/utils/stats";
import { formatDate } from "@/utils/format";

const pieColors = ["#2b7a9b", "#4f8fbf", "#7aa7c7", "#9dbdd6", "#c2d6e5"];

function AdminDashboard() {
  useDocumentTitle("Admin Dashboard — CivicPulse");
  const s = statusSummary(complaints);

  const columns = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: "title", header: "Complaint" },
    { key: "category", header: "Category", render: (r) => categoryLabel(r.category) },
    { key: "department", header: "Department" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "createdAt", header: "Reported", render: (r) => formatDate(r.createdAt) },
  ];

  return (
    <>
      <PageHeader title="Administration overview" description="City-wide complaint activity across all departments." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total" value={s.total} icon={ClipboardList} />
        <StatCard label="Pending" value={s.pending} icon={Clock} tone="text-status-review" />
        <StatCard label="In progress" value={s.inProgress} icon={Hammer} tone="text-status-progress" />
        <StatCard label="Resolved" value={s.resolved} icon={CheckCircle2} tone="text-status-resolved" />
        <StatCard label="Rejected" value={s.rejected} icon={XCircle} tone="text-status-rejected" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Complaints by status" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byStatus(complaints)} margin={{ left: -20, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} stroke="var(--color-muted-foreground)" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-foreground)",
                  }}
                />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Complaints by category" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory(complaints)} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                  {byCategory(complaints).map((entry, i) => (
                    <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-foreground)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            {byCategory(complaints).map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: pieColors[i % pieColors.length] }} />
                {c.name} ({c.value})
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Recent complaints" />
        <DataTable columns={columns} rows={complaints.slice(0, 5)} />
      </Card>
    </>
  );
}

export default AdminDashboard;
