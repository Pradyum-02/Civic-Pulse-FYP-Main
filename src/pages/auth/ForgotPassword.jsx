import { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import AuthCard from "@/components/layout/AuthCard";
import MobileLogin from "@/components/auth/MobileLogin";
import { normalizePhoneNumber, sendOTP } from "@/services/authService";
import { ShieldCheck } from "lucide-react";

function ForgotPasswordPage() {
  useDocumentTitle("Recover access — CivicPulse");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const normalized = normalizePhoneNumber(phoneNumber);

    if (!/^\+91\d{10}$/.test(normalized)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await sendOTP(normalized);
      setSent(true);
    } catch {
      setError("Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title={sent ? "Recovery OTP sent" : "Recover access"}
      description={
        sent
          ? "Use the OTP sent to your mobile number to continue."
          : "Enter your registered phone number to receive a secure OTP."
      }
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-border bg-secondary/50 p-5 text-center" role="status">
          <ShieldCheck className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-foreground">OTP sent successfully</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We have sent a secure code to {phoneNumber}. Please use it to continue.
          </p>
        </div>
      ) : (
        <MobileLogin
          phoneNumber={phoneNumber}
          onPhoneChange={setPhoneNumber}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
          submitLabel="Send OTP"
        />
      )}
    </AuthCard>
  );
}

export default ForgotPasswordPage;
