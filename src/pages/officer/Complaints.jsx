import { useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import ComplaintFilters from "@/components/complaints/ComplaintFilters";
import StatusBadge from "@/components/common/StatusBadge";
import Badge from "@/components/common/Badge";
import { EmptyState } from "@/components/common/States";
import { complaints, categoryLabel } from "@/mock/mockData";
import { useFilteredComplaints } from "@/hooks/useFilteredComplaints";
import { formatDate } from "@/utils/format";

function OfficerComplaints() {
  useDocumentTitle("Assigned Complaints — CivicPulse");
  const navigate = useNavigate();
  const assigned = complaints.filter((c) => c.officer);
  const { filters, setFilters, results } = useFilteredComplaints(assigned);

  const columns = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: "category", header: "Category", render: (r) => categoryLabel(r.category) },
    { key: "address", header: "Location", render: (r) => r.address },
    { key: "priority", header: "Priority", render: (r) => <Badge tone="outline">{r.priority}</Badge> },
    { key: "createdAt", header: "Assigned on", render: (r) => formatDate(r.createdAt) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader title="Assigned complaints" description={`${results.length} complaints in your queue`} />
      <ComplaintFilters value={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        rows={results}
        onRowClick={(row) => navigate(`/officer/complaints/${row.id}`)}
        empty={<EmptyState title="No complaints found" description="Adjust your filters to see more." />}
      />
    </>
  );
}

export default OfficerComplaints;
