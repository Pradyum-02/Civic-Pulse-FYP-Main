import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useMemo, useState } from "react";

import { Search, UserPlus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import Modal from "@/components/common/Modal";
import { Input, Select } from "@/components/common/Field";
import { EmptyState } from "@/components/common/States";
import { departments, officers } from "@/mock/mockData";

function AdminOfficers() {
  useDocumentTitle("Officers — CivicPulse Admin");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [adding, setAdding] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return officers.filter(
      (o) =>
        (!q || o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q)) &&
        (department === "all" || o.department === department),
    );
  }, [query, department]);

  const columns = [
    { key: "name", header: "Officer" },
    { key: "department", header: "Department" },
    { key: "email", header: "Email" },
    { key: "status", header: "Status", render: (r) => <Badge tone="outline">{r.status}</Badge> },
    { key: "assigned", header: "Assigned complaints" },
  ];

  return (
    <>
      <PageHeader
        title="Officers"
        description={`${rows.length} officers across ${departments.length} departments`}
        actions={
          <Button onClick={() => setAdding(true)}>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Add officer
          </Button>
        }
      />

      <div className="card-surface mb-5 grid gap-3 p-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <label htmlFor="officer-search" className="sr-only">
            Search officers
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="officer-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground"
          />
        </div>
        <div>
          <label htmlFor="officer-department" className="sr-only">
            Filter by department
          </label>
          <select
            id="officer-department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground md:w-56"
          >
            <option value="all">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable columns={columns} rows={rows} empty={<EmptyState title="No officers found" />} />

      <Modal
        open={adding}
        onClose={() => setAdding(false)}
        title="Add officer"
        description="This form is UI only until the backend is connected."
        footer={
          <>
            <Button variant="outline" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button onClick={() => setAdding(false)}>Add officer</Button>
          </>
        }
      >
        <Input id="o-name" label="Full name" placeholder="Officer name" />
        <Input id="o-email" label="Email" type="email" placeholder="officer@civicpulse.gov" />
        <Select
          id="o-department"
          label="Department"
          options={departments.map((d) => ({ value: d.name, label: d.name }))}
        />
      </Modal>
    </>
  );
}

export default AdminOfficers;
