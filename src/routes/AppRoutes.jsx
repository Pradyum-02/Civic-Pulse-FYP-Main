import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import CitizenLayout from "@/layouts/CitizenLayout";
import OfficerLayout from "@/layouts/OfficerLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

import CitizenDashboard from "@/pages/citizen/Dashboard";
import CitizenReport from "@/pages/citizen/Report";
import CitizenComplaints from "@/pages/citizen/Complaints";
import CitizenComplaintDetails from "@/pages/citizen/ComplaintDetails";
import CitizenProfile from "@/pages/citizen/Profile";

import OfficerDashboard from "@/pages/officer/Dashboard";
import OfficerComplaints from "@/pages/officer/Complaints";
import OfficerComplaintDetails from "@/pages/officer/ComplaintDetails";
import OfficerProfile from "@/pages/officer/Profile";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminComplaints from "@/pages/admin/Complaints";
import AdminComplaintDetails from "@/pages/admin/ComplaintDetails";
import AdminOfficers from "@/pages/admin/Officers";
import AdminDepartments from "@/pages/admin/Departments";
import AdminUsers from "@/pages/admin/Users";
import AdminProfile from "@/pages/admin/Profile";

import NotFound from "@/pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Citizen */}
      <Route path="/citizen" element={<CitizenLayout />}>
        <Route index element={<Navigate to="/citizen/dashboard" replace />} />
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="report" element={<CitizenReport />} />
        <Route path="complaints" element={<CitizenComplaints />} />
        <Route path="complaints/:id" element={<CitizenComplaintDetails />} />
        <Route path="profile" element={<CitizenProfile />} />
      </Route>

      {/* Officer */}
      <Route path="/officer" element={<OfficerLayout />}>
        <Route index element={<Navigate to="/officer/dashboard" replace />} />
        <Route path="dashboard" element={<OfficerDashboard />} />
        <Route path="complaints" element={<OfficerComplaints />} />
        <Route path="complaints/:id" element={<OfficerComplaintDetails />} />
        <Route path="profile" element={<OfficerProfile />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="complaints/:id" element={<AdminComplaintDetails />} />
        <Route path="officers" element={<AdminOfficers />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
