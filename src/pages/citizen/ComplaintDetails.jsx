import { Link, useParams } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatusBadge from "@/components/common/StatusBadge";
import ComplaintTimeline from "@/components/complaints/ComplaintTimeline";
import MapView from "@/components/maps/MapView";
import { EmptyState } from "@/components/common/States";
import { categoryLabel, findComplaint } from "@/mock/mockData";
import { formatDate } from "@/utils/format";

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value || "—"}</dd>
    </div>
  );
}

function ComplaintDetails() {
  useDocumentTitle("Complaint details — CivicPulse");
  const { id } = useParams();
  const complaint = findComplaint(id);

  if (!complaint) {
    return (
      <div className="card-surface">
        <EmptyState
          title="Complaint not found"
          description={`No complaint matches the ID ${id}.`}
          action={
            <Button as={Link} to="/citizen/complaints" size="sm">
              Back to complaints
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <>
      <Button as={Link} to="/citizen/complaints" variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to complaints
      </Button>

      <PageHeader
        title={complaint.title}
        description={`Complaint ${complaint.id} · reported on ${formatDate(complaint.createdAt)}`}
        actions={<StatusBadge status={complaint.status} />}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Description" />
            <p className="text-sm leading-relaxed text-muted-foreground">{complaint.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="outline">{categoryLabel(complaint.category)}</Badge>
              <Badge tone="outline">{complaint.department}</Badge>
              <Badge tone="outline">Priority: {complaint.priority}</Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Submitted photo" />
            <img
              src={complaint.image}
              alt={`Reported issue: ${complaint.title}`}
              loading="lazy"
              className="h-64 w-full rounded-xl border border-border object-cover"
            />
          </Card>

          <Card>
            <CardHeader title="Location" description={complaint.address} />
            <MapView lat={complaint.lat} lng={complaint.lng} interactive={false} height={280} />
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Complaint information" />
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Detail label="Complaint ID" value={complaint.id} />
              <Detail label="Category" value={categoryLabel(complaint.category)} />
              <Detail label="Department" value={complaint.department} />
              <Detail label="Assigned officer" value={complaint.officer || "Not assigned yet"} />
              <Detail label="Created" value={formatDate(complaint.createdAt)} />
              <Detail label="Last update" value={formatDate(complaint.updatedAt)} />
            </dl>
          </Card>

          <Card>
            <CardHeader title="Status timeline" />
            <ComplaintTimeline updates={complaint.updates} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default ComplaintDetails;
