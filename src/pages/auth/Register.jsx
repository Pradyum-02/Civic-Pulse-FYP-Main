import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import AuthCard from "@/components/layout/AuthCard";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Field";
import { useAuth } from "@/context/AuthContext";

function RegisterPage() {
  useDocumentTitle("Create an account — CivicPulse");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 6) next.password = "Use at least 6 characters.";
    if (form.confirm !== form.password) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await register({ name: form.name, email: form.email, role: "citizen" });
    setLoading(false);
    navigate("/citizen/dashboard");
  };

  return (
    <AuthCard
      title="Create your citizen account"
      description="Report issues in your ward and follow them until they are resolved."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Input id="name" label="Full name" required value={form.name} onChange={(e) => set({ name: e.target.value })} error={errors.name} />
        <Input id="email" type="email" label="Email" required autoComplete="email" value={form.email} onChange={(e) => set({ email: e.target.value })} error={errors.email} />
        <Input id="phone" type="tel" label="Phone number" value={form.phone} onChange={(e) => set({ phone: e.target.value })} hint="Optional, used for field updates." />
        <Input id="password" type="password" label="Password" required autoComplete="new-password" value={form.password} onChange={(e) => set({ password: e.target.value })} error={errors.password} />
        <Input id="confirm" type="password" label="Confirm password" required autoComplete="new-password" value={form.confirm} onChange={(e) => set({ confirm: e.target.value })} error={errors.confirm} />
        <Button type="submit" className="w-full" loading={loading}>
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}

export default RegisterPage;
