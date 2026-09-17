import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useMemo, useState } from "react";

import { Search } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import { EmptyState } from "@/components/common/States";
import { users } from "@/mock/mockData";
import { formatDate } from "@/utils/format";

function AdminUsers() {
  useDocumentTitle("Users — CivicPulse Admin");
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) =>
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
        (role === "all" || u.role === role) &&
        (status === "all" || u.status === status),
    );
  }, [query, role, status]);

  const columns = [
    { key: "name", header: "User" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (r) => <Badge tone="outline">{r.role}</Badge> },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <span className={r.status === "Active" ? "text-status-resolved" : "text-status-rejected"}>{r.status}</span>
      ),
    },
    { key: "registered", header: "Registered", render: (r) => formatDate(r.registered) },
  ];

  const field = "h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground";

  return (
    <>
      <PageHeader title="Users" description={`${rows.length} of ${users.length} registered accounts`} />

      <div className="card-surface mb-5 grid gap-3 p-4 md:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <label htmlFor="user-search" className="sr-only">
            Search users
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="user-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            className={`${field} w-full pl-9`}
          />
        </div>
        <div>
          <label htmlFor="user-role" className="sr-only">
            Filter by role
          </label>
          <select id="user-role" value={role} onChange={(e) => setRole(e.target.value)} className={`${field} w-full md:w-44`}>
            <option value="all">All roles</option>
            <option value="Citizen">Citizen</option>
            <option value="Officer">Officer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="user-status" className="sr-only">
            Filter by status
          </label>
          <select id="user-status" value={status} onChange={(e) => setStatus(e.target.value)} className={`${field} w-full md:w-44`}>
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <DataTable columns={columns} rows={rows} empty={<EmptyState title="No users found" />} />
    </>
  );
}

export default AdminUsers;
