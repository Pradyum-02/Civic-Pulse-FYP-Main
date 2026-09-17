// Temporary mock data. Delete this file once the backend API is connected.

export const CATEGORIES = [
  { id: "pothole", label: "Pothole", department: "Roads" },
  { id: "garbage", label: "Garbage", department: "Sanitation" },
  { id: "water_leakage", label: "Water Leakage", department: "Water Supply" },
  { id: "streetlight", label: "Broken Streetlight", department: "Electrical" },
  { id: "other", label: "Other", department: "General Civic Services" },
];

export const STATUSES = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
  "Rejected",
];

export const departments = [
  { id: "d1", name: "Roads", head: "R. Kulkarni", officers: 6, active: true, description: "Road surface, potholes and pavement repair." },
  { id: "d2", name: "Sanitation", head: "S. Naik", officers: 9, active: true, description: "Waste collection and public cleanliness." },
  { id: "d3", name: "Water Supply", head: "A. Deshmukh", officers: 5, active: true, description: "Pipelines, leakages and water distribution." },
  { id: "d4", name: "Electrical", head: "P. Sharma", officers: 4, active: true, description: "Street lighting and public electrical works." },
  { id: "d5", name: "General Civic Services", head: "M. Iyer", officers: 3, active: false, description: "Miscellaneous civic complaints." },
];

export const officers = [
  { id: "o1", name: "Rahul Kulkarni", email: "rahul.k@civicpulse.gov", department: "Roads", status: "Active", assigned: 12 },
  { id: "o2", name: "Sneha Naik", email: "sneha.n@civicpulse.gov", department: "Sanitation", status: "Active", assigned: 8 },
  { id: "o3", name: "Amit Deshmukh", email: "amit.d@civicpulse.gov", department: "Water Supply", status: "On Leave", assigned: 3 },
  { id: "o4", name: "Priya Sharma", email: "priya.s@civicpulse.gov", department: "Electrical", status: "Active", assigned: 6 },
  { id: "o5", name: "Manoj Iyer", email: "manoj.i@civicpulse.gov", department: "General Civic Services", status: "Inactive", assigned: 0 },
];

export const users = [
  { id: "u1", name: "Pradyum Meshram", email: "pradyum@example.com", role: "Citizen", status: "Active", registered: "2026-01-12" },
  { id: "u2", name: "Rahul Kulkarni", email: "rahul.k@civicpulse.gov", role: "Officer", status: "Active", registered: "2025-11-04" },
  { id: "u3", name: "Asha Patil", email: "asha.p@example.com", role: "Citizen", status: "Active", registered: "2026-02-20" },
  { id: "u4", name: "System Admin", email: "admin@civicpulse.gov", role: "Admin", status: "Active", registered: "2025-08-01" },
  { id: "u5", name: "Vikram Rao", email: "vikram.r@example.com", role: "Citizen", status: "Suspended", registered: "2026-03-15" },
];

const timeline = (steps) =>
  steps.map((s) => ({ status: s[0], date: s[1], note: s[2] }));

export const complaints = [
  {
    id: "CP-1042",
    title: "Deep pothole near Shivaji Chowk",
    category: "pothole",
    description:
      "A large pothole has formed at the junction and is causing two-wheelers to swerve into oncoming traffic. It worsens after rain.",
    status: "In Progress",
    priority: "High",
    department: "Roads",
    officer: "Rahul Kulkarni",
    citizen: { name: "Pradyum Meshram", email: "pradyum@example.com", phone: "+91 98xxx 21xxx" },
    address: "Shivaji Chowk, Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    createdAt: "2026-08-18",
    updatedAt: "2026-08-27",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=900&q=70",
    ai: { category: "Pothole", confidence: 94 },
    updates: timeline([
      ["Submitted", "2026-08-18", "Complaint received."],
      ["Under Review", "2026-08-19", "Verified by control room."],
      ["Assigned", "2026-08-21", "Routed to Roads department."],
      ["In Progress", "2026-08-27", "Repair crew scheduled this week."],
    ]),
  },
  {
    id: "CP-1039",
    title: "Garbage not collected for 5 days",
    category: "garbage",
    description: "Waste bins overflowing near the community park entrance, causing odour and stray animals.",
    status: "Resolved",
    priority: "Medium",
    department: "Sanitation",
    officer: "Sneha Naik",
    citizen: { name: "Asha Patil", email: "asha.p@example.com", phone: "+91 90xxx 33xxx" },
    address: "Ward 12, Civil Lines",
    lat: 21.1538,
    lng: 79.0762,
    createdAt: "2026-08-10",
    updatedAt: "2026-08-16",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=900&q=70",
    ai: { category: "Garbage", confidence: 91 },
    updates: timeline([
      ["Submitted", "2026-08-10", "Complaint received."],
      ["Under Review", "2026-08-11", "Location confirmed."],
      ["Assigned", "2026-08-12", "Routed to Sanitation department."],
      ["In Progress", "2026-08-14", "Collection vehicle dispatched."],
      ["Resolved", "2026-08-16", "Area cleared and sanitised."],
    ]),
  },
  {
    id: "CP-1051",
    title: "Water pipeline leaking on main road",
    category: "water_leakage",
    description: "Continuous water leakage from an underground pipeline is flooding the footpath.",
    status: "Assigned",
    priority: "High",
    department: "Water Supply",
    officer: "Amit Deshmukh",
    citizen: { name: "Pradyum Meshram", email: "pradyum@example.com", phone: "+91 98xxx 21xxx" },
    address: "Dharampeth Main Road",
    lat: 21.1362,
    lng: 79.0656,
    createdAt: "2026-08-25",
    updatedAt: "2026-08-26",
    image: "https://images.unsplash.com/photo-1543393470-b2f0f4bbb0b0?w=900&q=70",
    ai: { category: "Water Leakage", confidence: 88 },
    updates: timeline([
      ["Submitted", "2026-08-25", "Complaint received."],
      ["Under Review", "2026-08-25", "Photo verified."],
      ["Assigned", "2026-08-26", "Officer assigned."],
    ]),
  },
  {
    id: "CP-1055",
    title: "Streetlight not working near bus stop",
    category: "streetlight",
    description: "Three consecutive streetlights are out, making the stretch unsafe at night.",
    status: "Under Review",
    priority: "Medium",
    department: "Electrical",
    officer: null,
    citizen: { name: "Vikram Rao", email: "vikram.r@example.com", phone: "+91 91xxx 55xxx" },
    address: "Sadar Bus Stop",
    lat: 21.1602,
    lng: 79.0805,
    createdAt: "2026-08-29",
    updatedAt: "2026-08-30",
    image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?w=900&q=70",
    ai: { category: "Broken Streetlight", confidence: 96 },
    updates: timeline([
      ["Submitted", "2026-08-29", "Complaint received."],
      ["Under Review", "2026-08-30", "Awaiting field verification."],
    ]),
  },
  {
    id: "CP-1058",
    title: "Illegal debris dumping on empty plot",
    category: "other",
    description: "Construction debris dumped overnight on a vacant plot beside residential houses.",
    status: "Submitted",
    priority: "Low",
    department: "General Civic Services",
    officer: null,
    citizen: { name: "Asha Patil", email: "asha.p@example.com", phone: "+91 90xxx 33xxx" },
    address: "Manish Nagar Sector 4",
    lat: 21.0921,
    lng: 79.0523,
    createdAt: "2026-08-31",
    updatedAt: "2026-08-31",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=70",
    ai: { category: "Other", confidence: 72 },
    updates: timeline([["Submitted", "2026-08-31", "Complaint received."]]),
  },
  {
    id: "CP-1021",
    title: "Duplicate report of road damage",
    category: "pothole",
    description: "Reported earlier under CP-1042. Closed as duplicate.",
    status: "Rejected",
    priority: "Low",
    department: "Roads",
    officer: "Rahul Kulkarni",
    citizen: { name: "Vikram Rao", email: "vikram.r@example.com", phone: "+91 91xxx 55xxx" },
    address: "Shivaji Chowk, Nagpur",
    lat: 21.1461,
    lng: 79.0888,
    createdAt: "2026-08-05",
    updatedAt: "2026-08-07",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=70",
    ai: { category: "Pothole", confidence: 81 },
    updates: timeline([
      ["Submitted", "2026-08-05", "Complaint received."],
      ["Under Review", "2026-08-06", "Cross-checked with existing reports."],
      ["Rejected", "2026-08-07", "Duplicate of CP-1042."],
    ]),
  },
];

export const findComplaint = (id) => complaints.find((c) => c.id === id) || null;
export const categoryLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label || "Other";
