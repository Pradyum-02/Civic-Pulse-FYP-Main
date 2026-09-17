import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useState } from "react";

import { Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import Modal from "@/components/common/Modal";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Input, Textarea } from "@/components/common/Field";
import { departments as seedDepartments } from "@/mock/mockData";

function AdminDepartments() {
  useDocumentTitle("Departments — CivicPulse Admin");
  const [list, setList] = useState(seedDepartments);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [toggling, setToggling] = useState(null);

  const toggleActive = (dept) => {
    setList((l) => l.map((d) => (d.id === dept.id ? { ...d, active: !d.active } : d)));
    setToggling(null);
  };

  return (
    <>
      <PageHeader
        title="Departments"
        description="Departments responsible for resolving civic complaints."
        actions={
          <Button onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add department
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold text-foreground">{d.name}</h2>
              <Badge tone="outline" className={d.active ? "text-status-resolved" : "text-muted-foreground"}>
                {d.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Head</dt>
                <dd className="text-foreground">{d.head}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-muted-foreground">Officers</dt>
                <dd className="text-foreground">{d.officers}</dd>
              </div>
            </dl>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(d)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setToggling(d)}>
                {d.active ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={creating || Boolean(editing)}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        title={editing ? `Edit ${editing.name}` : "Add department"}
        description="Changes are UI only until the backend is connected."
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <Input id="d-name" label="Department name" defaultValue={editing?.name || ""} />
        <Input id="d-head" label="Department head" defaultValue={editing?.head || ""} />
        <Textarea id="d-desc" label="Description" rows={3} defaultValue={editing?.description || ""} />
      </Modal>

      <ConfirmDialog
        open={Boolean(toggling)}
        onClose={() => setToggling(null)}
        onConfirm={() => toggleActive(toggling)}
        title={toggling?.active ? "Deactivate department?" : "Activate department?"}
        description={
          toggling?.active
            ? "New complaints will no longer be routed to this department."
            : "This department will start receiving complaint assignments again."
        }
        confirmLabel={toggling?.active ? "Deactivate" : "Activate"}
        destructive={Boolean(toggling?.active)}
      />
    </>
  );
}

export default AdminDepartments;
