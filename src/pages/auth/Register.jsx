import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import AuthCard from "@/components/layout/AuthCard";
import MobileLogin from "@/components/auth/MobileLogin";
import OTPVerification from "@/components/auth/OTPVerification";
import { useAuth } from "@/context/AuthContext";
import { normalizePhoneNumber, resendOTP, sendOTP, verifyOTP } from "@/services/authService";

const RESEND_SECONDS = 30;

function RegisterPage() {
  useDocumentTitle("Create account — CivicPulse");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [phase, setPhase] = useState("phone");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);

  useEffect(() => {
    if (resendSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const handleSendOtp = async (event) => {
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
      setPhase("otp");
      setOtp("");
      setResendSeconds(RESEND_SECONDS);
    } catch {
      setError("Unable to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await verifyOTP(phoneNumber, otp);
      await register({ phoneNumber, role: "citizen" });
      navigate("/citizen/dashboard");
    } catch {
      setError("The OTP is invalid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendSeconds > 0) return;

    setError("");
    setIsResending(true);

    try {
      await resendOTP(phoneNumber);
      setResendSeconds(RESEND_SECONDS);
      setOtp("");
    } catch {
      setError("Unable to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthCard
      title={phase === "phone" ? "Create your account" : "Verify your mobile number"}
      description={
        phase === "phone"
          ? "Register with your mobile number for secure access."
          : "Enter the one-time code to complete registration."
      }
      footer={
        <>
          Already registered? {" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {phase === "phone" ? (
        <MobileLogin
          phoneNumber={phoneNumber}
          onPhoneChange={setPhoneNumber}
          onSubmit={handleSendOtp}
          loading={loading}
          error={error}
          submitLabel="Send OTP"
        />
      ) : (
        <OTPVerification
          phoneNumber={phoneNumber}
          otp={otp}
          onOtpChange={setOtp}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onChangeMobile={() => {
            setPhase("phone");
            setOtp("");
            setError("");
            setResendSeconds(0);
          }}
          loading={loading}
          error={error}
          resendSeconds={resendSeconds}
          isResending={isResending}
        />
      )}
    </AuthCard>
  );
}

export default RegisterPage;
