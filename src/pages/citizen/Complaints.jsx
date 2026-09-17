import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { FilePlus2 } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import ComplaintFilters from "@/components/complaints/ComplaintFilters";
import ComplaintCard from "@/components/complaints/ComplaintCard";
import { EmptyState } from "@/components/common/States";
import { complaints } from "@/mock/mockData";
import { useFilteredComplaints } from "@/hooks/useFilteredComplaints";

function CitizenComplaints() {
  useDocumentTitle("My Complaints — CivicPulse");
  const { filters, setFilters, results } = useFilteredComplaints(complaints);

  return (
    <>
      <PageHeader
        title="My complaints"
        description={`${results.length} of ${complaints.length} complaints shown`}
        actions={
          <Button as={Link} to="/citizen/report">
            <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            Report New Issue
          </Button>
        }
      />
      <ComplaintFilters value={filters} onChange={setFilters} />

      {results.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {results.map((c) => (
            <ComplaintCard key={c.id} complaint={c} to={`/citizen/complaints/${c.id}`} />
          ))}
        </div>
      ) : (
        <div className="card-surface">
          <EmptyState
            title="No complaints found"
            description="Try clearing the search or changing the filters."
          />
        </div>
      )}
    </>
  );
}

export default CitizenComplaints;
