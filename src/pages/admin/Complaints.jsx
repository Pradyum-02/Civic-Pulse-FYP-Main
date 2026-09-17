import { useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import ComplaintFilters from "@/components/complaints/ComplaintFilters";
import StatusBadge from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/States";
import { complaints, categoryLabel } from "@/mock/mockData";
import { useFilteredComplaints } from "@/hooks/useFilteredComplaints";
import { formatDate } from "@/utils/format";

function AdminComplaints() {
  useDocumentTitle("All Complaints — CivicPulse Admin");
  const navigate = useNavigate();
  const { filters, setFilters, results } = useFilteredComplaints(complaints);

  const columns = [
    { key: "id", header: "ID", render: (r) => <span className="font-mono text-xs">{r.id}</span> },
    { key: "title", header: "Complaint" },
    { key: "category", header: "Category", render: (r) => categoryLabel(r.category) },
    { key: "department", header: "Department" },
    { key: "officer", header: "Officer", render: (r) => r.officer || "Unassigned" },
    { key: "createdAt", header: "Reported", render: (r) => formatDate(r.createdAt) },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <>
      <PageHeader title="Complaints" description={`${results.length} of ${complaints.length} complaints shown`} />
      <ComplaintFilters value={filters} onChange={setFilters} />
      <DataTable
        columns={columns}
        rows={results}
        onRowClick={(row) => navigate(`/admin/complaints/${row.id}`)}
        empty={<EmptyState title="No complaints found" description="Adjust your filters to see more." />}
      />
    </>
  );
}

export default AdminComplaints;
