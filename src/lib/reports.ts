import { complaints, type Complaint } from "@/data/mockData";

const KEY = "civicpulse_reports";

export function getLocalReports(): Complaint[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Complaint[];
  } catch {
    return [];
  }
}

export function saveLocalReport(c: Complaint) {
  localStorage.setItem(KEY, JSON.stringify([c, ...getLocalReports()]));
}

export function getAllComplaints(): Complaint[] {
  return [...getLocalReports(), ...complaints];
}

export function nextComplaintId() {
  return `CIV-${8501 + getLocalReports().length}`;
}
