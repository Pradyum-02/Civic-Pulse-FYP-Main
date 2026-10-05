export type Status = "Pending" | "Under Review" | "In Progress" | "Resolved";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface TimelineEvent {
  label: string;
  time: string;
  note: string;
  done: boolean;
  current?: boolean;
}

export interface Complaint {
  id: string;
  title: string;
  category: string;
  status: Status;
  priority: Priority;
  reported: string;
  reportedDate: string;
  department: string;
  team: string;
  location: string;
  coordinates: string;
  description: string;
  confidence: string;
  timeline: TimelineEvent[];
  activity: { time: string; text: string }[];
  photo?: string | undefined;
}

export const user = {
  name: "Ananya Deshpande",
  mobile: "+91 98220 41765",
  email: "ananya.d@mail.com",
  area: "MG Road, Pune",
  joined: "March 2025",
  initials: "AD",
};

export const categories = [
  { id: "pothole", label: "Pothole", department: "Public Works", icon: "cone" },
  { id: "garbage", label: "Garbage", department: "Sanitation", icon: "trash" },
  { id: "streetlight", label: "Streetlight", department: "Electrical", icon: "lamp" },
  { id: "water", label: "Water Leakage", department: "Water Supply", icon: "droplet" },
  { id: "drainage", label: "Drainage", department: "Drainage Cell", icon: "waves" },
  { id: "road", label: "Road Damage", department: "Public Works", icon: "road" },
  { id: "other", label: "Other", department: "Central Desk", icon: "dots" },
];

export const departments = [
  "Public Works",
  "Sanitation",
  "Electrical",
  "Water Supply",
  "Drainage Cell",
  "Central Desk",
];

export const dashboardStats = [
  { label: "Total Reports", value: 8, tone: "deep" },
  { label: "In Progress", value: 3, tone: "amber" },
  { label: "Resolved", value: 4, tone: "emerald" },
  { label: "Pending", value: 1, tone: "slate" },
];

const baseTimeline = (stage: number): TimelineEvent[] => {
  const stages = [
    { label: "Reported", note: "Complaint submitted by citizen", time: "2 days ago" },
    { label: "Verified", note: "Ward supervisor confirmed the issue", time: "Yesterday" },
    { label: "Assigned", note: "Routed to the field crew", time: "Yesterday" },
    { label: "In Progress", note: "Crew on site", time: "Today, 10:24 AM" },
    { label: "Resolved", note: "Photo-verified closure", time: "Pending" },
  ];
  return stages.map((s, i) => ({
    ...s,
    done: i < stage,
    current: i === stage,
  }));
};

export const complaints: Complaint[] = [
  {
    id: "CIV-8492",
    title: "Pothole near MG Road",
    category: "Pothole",
    status: "In Progress",
    priority: "High",
    reported: "2 days ago",
    reportedDate: "29 Sep 2026, 08:12 AM",
    department: "Public Works",
    team: "Road Maintenance Team",
    location: "MG Road & 4th Cross",
    coordinates: "18.5204, 73.8567",
    description:
      "Large pothole roughly 40cm wide near the 4th Cross junction. Two-wheelers are swerving into the opposite lane to avoid it, especially after evening rain.",
    confidence: "98.8%",
    timeline: baseTimeline(3),
    activity: [
      { time: "10:24 AM", text: "Officer assigned complaint to Road Maintenance Team." },
      { time: "Yesterday", text: "Issue verified by ward supervisor." },
      { time: "2 days ago", text: "Complaint submitted with photo and GPS location." },
    ],
  },
  {
    id: "CIV-8481",
    title: "Streetlight not working",
    category: "Streetlight",
    status: "Resolved",
    priority: "Medium",
    reported: "6 days ago",
    reportedDate: "25 Sep 2026, 07:40 PM",
    department: "Electrical",
    team: "Zone 4 Lighting Crew",
    location: "Lane 7, Koregaon Park",
    coordinates: "18.5362, 73.8939",
    description:
      "Three consecutive streetlights have been dark for over a week, making the footpath unsafe after 8 PM.",
    confidence: "96.2%",
    timeline: baseTimeline(5),
    activity: [
      { time: "3 days ago", text: "Resolution photo uploaded and verified." },
      { time: "4 days ago", text: "Crew replaced two faulty LED fixtures." },
      { time: "6 days ago", text: "Complaint submitted." },
    ],
  },
  {
    id: "CIV-8472",
    title: "Garbage collection delay",
    category: "Garbage",
    status: "Under Review",
    priority: "Medium",
    reported: "8 days ago",
    reportedDate: "23 Sep 2026, 09:05 AM",
    department: "Sanitation",
    team: "Ward 12 Sanitation Unit",
    location: "Baner Road, near Sai Chowk",
    coordinates: "18.5590, 73.7868",
    description:
      "Household waste has not been collected for four days. The bin point is overflowing onto the footpath.",
    confidence: "94.1%",
    timeline: baseTimeline(1),
    activity: [
      { time: "Yesterday", text: "Supervisor requested additional photos." },
      { time: "8 days ago", text: "Complaint submitted." },
    ],
  },
  {
    id: "CIV-8460",
    title: "Water leakage at main valve",
    category: "Water Leakage",
    status: "Resolved",
    priority: "Critical",
    reported: "14 days ago",
    reportedDate: "17 Sep 2026, 06:30 AM",
    department: "Water Supply",
    team: "Pipeline Response Unit",
    location: "Aundh, ITI Road",
    coordinates: "18.5593, 73.8078",
    description: "Continuous leakage from the main valve flooding the service road every morning.",
    confidence: "99.1%",
    timeline: baseTimeline(5),
    activity: [
      { time: "12 days ago", text: "Valve replaced, closure verified with photo proof." },
      { time: "14 days ago", text: "Complaint submitted." },
    ],
  },
  {
    id: "CIV-8455",
    title: "Blocked drainage after rain",
    category: "Drainage",
    status: "Pending",
    priority: "High",
    reported: "16 days ago",
    reportedDate: "15 Sep 2026, 11:20 AM",
    department: "Drainage Cell",
    team: "Unassigned",
    location: "Kothrud, Paud Road",
    coordinates: "18.5074, 73.8077",
    description: "Stormwater drain is blocked and water stagnates for hours after moderate rain.",
    confidence: "92.7%",
    timeline: baseTimeline(0),
    activity: [{ time: "16 days ago", text: "Complaint submitted." }],
  },
];

export const notifications = [
  {
    id: 1,
    type: "assigned" as const,
    title: "Your complaint CIV-8492 has been assigned.",
    body: "Road Maintenance Team has picked up your pothole report.",
    time: "Today, 10:24 AM",
    unread: true,
  },
  {
    id: 2,
    type: "update" as const,
    title: "An officer added an update to CIV-8492.",
    body: "Crew is on site. Hot-mix asphalt work has started.",
    time: "Today, 11:02 AM",
    unread: true,
  },
  {
    id: 3,
    type: "resolved" as const,
    title: "Your complaint CIV-8481 was resolved.",
    body: "Two LED fixtures replaced. Photo proof attached.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 4,
    type: "review" as const,
    title: "CIV-8472 needs more information.",
    body: "The sanitation supervisor requested an additional photo.",
    time: "Yesterday",
    unread: false,
  },
];

export const faqs = [
  {
    q: "What is CivicPulse?",
    a: "CivicPulse is a civic accountability platform where residents report local issues and follow them all the way to a verified fix. It connects citizen reports with the municipal teams responsible for solving them.",
  },
  {
    q: "How do I report an issue?",
    a: "Log in with your mobile number, tap Report an Issue, pick a category, add a short description, confirm the location on the map and attach a photo. The whole flow takes under a minute.",
  },
  {
    q: "Can I track my complaint?",
    a: "Yes. Every complaint has a unique ID and a public status trail: Reported, Verified, Assigned, In Progress and Resolved, with timestamps for each step.",
  },
  {
    q: "How does AI help classify complaints?",
    a: "Submitted reports are analysed for issue type, severity and jurisdiction, so a pothole photo is recognised as road damage and sent to Public Works instead of waiting in a general queue.",
  },
  {
    q: "How is a complaint assigned?",
    a: "Once classified, the complaint is routed to the matching department and then to the field crew covering that ward, with a service deadline attached.",
  },
  {
    q: "How is resolution verified?",
    a: "Field officers upload before and after photos when work is completed. The complaint is only closed once that evidence is attached and visible to the citizen who reported it.",
  },
];
