import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { ArrowLeft, Sparkles } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import StatusBadge from "@/components/common/StatusBadge";
import { Select, Textarea } from "@/components/common/Field";
import ComplaintTimeline from "@/components/complaints/ComplaintTimeline";
import MapView from "@/components/maps/MapView";
import { EmptyState } from "@/components/common/States";
import { STATUSES, categoryLabel, findComplaint } from "@/mock/mockData";
import { formatDate } from "@/utils/format";

function OfficerComplaintDetails() {
  useDocumentTitle("Complaint workspace — CivicPulse");
  const { id } = useParams();
  const complaint = findComplaint(id);
  const [status, setStatus] = useState(complaint?.status || "Submitted");
  const [note, setNote] = useState("");
  const [updates, setUpdates] = useState(complaint?.updates || []);
  const [saved, setSaved] = useState(false);

  if (!complaint) {
    return (
      <div className="card-surface">
        <EmptyState
          title="Complaint not found"
          description={`No complaint matches the ID ${id}.`}
          action={
            <Button as={Link} to="/officer/complaints" size="sm">
              Back to assignments
            </Button>
          }
        />
      </div>
    );
  }

  const addUpdate = (e) => {
    e.preventDefault();
    setUpdates((u) => [
      ...u,
      { status, date: new Date().toISOString().slice(0, 10), note: note || "Status updated by officer." },
    ]);
    setNote("");
    setSaved(true);
  };

  return (
    <>
      <Button as={Link} to="/officer/complaints" variant="ghost" size="sm" className="mb-4">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to assignments
      </Button>

      <PageHeader
        title={complaint.title}
        description={`Complaint ${complaint.id} · ${complaint.department}`}
        actions={<StatusBadge status={status} />}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Complaint information" />
            <p className="text-sm leading-relaxed text-muted-foreground">{complaint.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="outline">{categoryLabel(complaint.category)}</Badge>
              <Badge tone="outline">Priority: {complaint.priority}</Badge>
              <Badge tone="outline">Reported {formatDate(complaint.createdAt)}</Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Citizen-submitted photo" />
            <img
              src={complaint.image}
              alt={`Reported issue: ${complaint.title}`}
              loading="lazy"
              className="h-64 w-full rounded-xl border border-border object-cover"
            />
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              AI detected category: {complaint.ai.category} ({complaint.ai.confidence}% confidence)
            </p>
          </Card>

          <Card>
            <CardHeader title="Location" description={complaint.address} />
            <MapView lat={complaint.lat} lng={complaint.lng} interactive={false} height={260} />
          </Card>

          <Card>
            <CardHeader title="Status timeline" />
            <ComplaintTimeline updates={updates} />
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Citizen" />
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Name</dt>
                <dd className="text-foreground">{complaint.citizen.name}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Email</dt>
                <dd className="text-foreground">{complaint.citizen.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Phone</dt>
                <dd className="text-foreground">{complaint.citizen.phone}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader title="Update complaint" description="Changes are local until the backend is connected." />
            <form className="space-y-4" onSubmit={addUpdate}>
              <Select
                id="status"
                label="Status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setSaved(false);
                }}
                options={STATUSES.map((s) => ({ value: s, label: s }))}
              />
              <Textarea
                id="note"
                label="Add an update"
                rows={4}
                placeholder="e.g. Site inspected, repair scheduled for Friday."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Post update
              </Button>
              {saved && (
                <p role="status" className="text-sm text-status-resolved">
                  Update added to the timeline.
                </p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default OfficerComplaintDetails;
