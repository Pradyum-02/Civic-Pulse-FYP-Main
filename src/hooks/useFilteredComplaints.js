import { useMemo, useState } from "react";
import { STATUSES } from "@/mock/mockData";

export const defaultFilters = { query: "", category: "all", status: "all", sort: "newest" };

export function useFilteredComplaints(source) {
  const [filters, setFilters] = useState(defaultFilters);

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    let list = source.filter((c) => {
      const matchesQuery =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q);
      const matchesCategory = filters.category === "all" || c.category === filters.category;
      const matchesStatus = filters.status === "all" || c.status === filters.status;
      return matchesQuery && matchesCategory && matchesStatus;
    });

    list = [...list].sort((a, b) => {
      if (filters.sort === "status") return STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status);
      const diff = new Date(b.createdAt) - new Date(a.createdAt);
      return filters.sort === "oldest" ? -diff : diff;
    });

    return list;
  }, [source, filters]);

  return { filters, setFilters, results };
}
