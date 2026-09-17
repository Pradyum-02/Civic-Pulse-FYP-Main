import { CATEGORIES, categoryLabel } from "@/mock/mockData";

export const countByStatus = (list, status) => list.filter((c) => c.status === status).length;

export const statusSummary = (list) => ({
  total: list.length,
  pending: list.filter((c) => ["Submitted", "Under Review", "Assigned"].includes(c.status)).length,
  inProgress: countByStatus(list, "In Progress"),
  resolved: countByStatus(list, "Resolved"),
  rejected: countByStatus(list, "Rejected"),
});

export const byCategory = (list) =>
  CATEGORIES.map((c) => ({
    name: categoryLabel(c.id),
    value: list.filter((x) => x.category === c.id).length,
  }));

export const byStatus = (list) =>
  ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Rejected"].map((s) => ({
    name: s,
    value: countByStatus(list, s),
  }));
