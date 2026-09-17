import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatusBadge from "@/components/common/StatusBadge";
import { Select } from "@/components/common/Field";
import ComplaintTimeline from "@/components/complaints/ComplaintTimeline";
import MapView from "@/components/maps/MapView";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { EmptyState } from "@/components/common/States";
import { STATUSES, categoryLabel, departments, findComplaint, officers } from "@/mock/mockData";
import { formatDate } from "@/utils/format";

function AdminComplaintDetails() {
  useDocumentTitle("Manage complaint — CivicPulse Admin");
  const { id } = useParams();
  const complaint = findComplaint(id);
  const [assignment, setAssignment] = useState({
    department: complaint?.department || "",
    officer: complaint?.officer || "",
    status: complaint?.status || "Submitted",
  });
  const [confirming, setConfirming] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!complaint) {
    return (
      <div className="card-surface">
        <EmptyState
          title="Complaint not found"
          description={`No complaint matches the ID ${id}.`}
          action={
            <Button as={Link} to="/admin/complaints" size="sm">
              Back to complaints
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <>
      <Button as={Link} to="/admin/complaints" variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to complaints
      </Button>

      <PageHeader
        title={complaint.title}
        description={`Complaint ${complaint.id} · reported by ${complaint.citizen.name}`}
        actions={<StatusBadge status={assignment.status} />}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Details" />
            <p className="text-sm leading-relaxed text-muted-foreground">{complaint.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="outline">{categoryLabel(complaint.category)}</Badge>
              <Badge tone="outline">Priority: {complaint.priority}</Badge>
              <Badge tone="outline">Reported {formatDate(complaint.createdAt)}</Badge>
            </div>
            <img
              src={complaint.image}
              alt={`Reported issue: ${complaint.title}`}
              loading="lazy"
              className="mt-4 h-56 w-full rounded-xl border border-border object-cover"
            />
          </Card>

          <Card>
            <CardHeader title="Location" description={complaint.address} />
            <MapView lat={complaint.lat} lng={complaint.lng} interactive={false} height={260} />
          </Card>

          <Card>
            <CardHeader title="Status timeline" />
            <ComplaintTimeline updates={complaint.updates} />
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Assignment" description="Route this complaint to the right team." />
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setConfirming(true);
              }}
            >
              <Select
                id="department"
                label="Department"
                value={assignment.department}
                onChange={(e) => setAssignment((a) => ({ ...a, department: e.target.value }))}
                options={departments.map((d) => ({ value: d.name, label: d.name }))}
              />
              <Select
                id="officer"
                label="Officer"
                value={assignment.officer}
                onChange={(e) => setAssignment((a) => ({ ...a, officer: e.target.value }))}
                options={[
                  { value: "", label: "Unassigned" },
                  ...officers.map((o) => ({ value: o.name, label: `${o.name} — ${o.department}` })),
                ]}
              />
              <Select
                id="status"
                label="Status"
                value={assignment.status}
                onChange={(e) => setAssignment((a) => ({ ...a, status: e.target.value }))}
                options={STATUSES.map((s) => ({ value: s, label: s }))}
              />
              <Button type="submit" className="w-full">
                Save assignment
              </Button>
              {saved && (
                <p role="status" className="text-sm text-status-resolved">
                  Assignment updated locally.
                </p>
              )}
            </form>
          </Card>

          <Card>
            <CardHeader title="Citizen" />
            <p className="text-sm text-foreground">{complaint.citizen.name}</p>
            <p className="text-sm text-muted-foreground">{complaint.citizen.email}</p>
            <p className="text-sm text-muted-foreground">{complaint.citizen.phone}</p>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirming}
        onClose={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          setSaved(true);
        }}
        title="Update this complaint?"
        description="The department, officer and status changes will be applied to this complaint."
        confirmLabel="Apply changes"
      />
    </>
  );
}

export default AdminComplaintDetails;
