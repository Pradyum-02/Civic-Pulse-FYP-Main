import { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { MailCheck } from "lucide-react";
import AuthCard from "@/components/layout/AuthCard";
import Button from "@/components/common/Button";
import { Input } from "@/components/common/Field";

function ForgotPasswordPage() {
  useDocumentTitle("Reset password — CivicPulse");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <AuthCard
      title="Forgot your password?"
      description="Enter your email and we'll send reset instructions."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-border bg-secondary/50 p-5 text-center" role="status">
          <MailCheck className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">Check your inbox</p>
          <p className="mt-1 text-sm text-muted-foreground">
            If an account exists for {email}, reset instructions have been sent.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <Input
            id="email"
            type="email"
            label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            placeholder="you@example.com"
          />
          <Button type="submit" className="w-full" loading={loading}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthCard>
  );
}

export default ForgotPasswordPage;
