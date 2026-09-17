import { Search } from "lucide-react";
import { CATEGORIES, STATUSES } from "@/mock/mockData";

export default function ComplaintFilters({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const field =
    "h-10 rounded-lg border border-border bg-card px-3 text-sm text-foreground";

  return (
    <div className="card-surface mb-5 grid gap-3 p-4 md:grid-cols-[1fr_auto_auto_auto]">
      <div className="relative">
        <label htmlFor="complaint-search" className="sr-only">
          Search complaints
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="complaint-search"
          type="search"
          placeholder="Search by ID, title or location"
          value={value.query}
          onChange={(e) => set({ query: e.target.value })}
          className={`${field} w-full pl-9`}
        />
      </div>
      <div>
        <label htmlFor="filter-category" className="sr-only">
          Filter by category
        </label>
        <select
          id="filter-category"
          value={value.category}
          onChange={(e) => set({ category: e.target.value })}
          className={`${field} w-full md:w-44`}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-status" className="sr-only">
          Filter by status
        </label>
        <select
          id="filter-status"
          value={value.status}
          onChange={(e) => set({ status: e.target.value })}
          className={`${field} w-full md:w-40`}
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-sort" className="sr-only">
          Sort complaints
        </label>
        <select
          id="filter-sort"
          value={value.sort}
          onChange={(e) => set({ sort: e.target.value })}
          className={`${field} w-full md:w-40`}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="status">By status</option>
        </select>
      </div>
    </div>
  );
}
