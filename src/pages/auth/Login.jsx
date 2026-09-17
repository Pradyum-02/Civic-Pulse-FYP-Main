import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import AuthCard from "@/components/layout/AuthCard";
import Button from "@/components/common/Button";
import { Input, Select } from "@/components/common/Field";
import { useAuth } from "@/context/AuthContext";

const homeFor = { citizen: "/citizen/dashboard", officer: "/officer/dashboard", admin: "/admin/dashboard" };

function LoginPage() {
  useDocumentTitle("Log in — CivicPulse");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "citizen" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.password) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await login({ email: form.email, role: form.role });
    setLoading(false);
    navigate({ to: homeFor[form.role] });
  };

  return (
    <AuthCard
      title="Log in to CivicPulse"
      description="Access your complaints and department workspace."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input
          id="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => set({ email: e.target.value })}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          id="password"
          type="password"
          label="Password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => set({ password: e.target.value })}
          error={errors.password}
          placeholder="••••••••"
        />
        <Select
          id="role"
          label="Sign in as"
          value={form.role}
          onChange={(e) => set({ role: e.target.value })}
          hint="Role selection is temporary until backend authentication is connected."
          options={[
            { value: "citizen", label: "Citizen" },
            { value: "officer", label: "Officer" },
            { value: "admin", label: "Administrator" },
          ]}
        />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full" loading={loading}>
          Log in
        </Button>
      </form>
    </AuthCard>
  );
}

export default LoginPage;
