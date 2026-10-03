import Button from "@/components/common/Button";
import OTPInput from "@/components/auth/OTPInput";

export default function OTPVerification({
  phoneNumber,
  otp,
  onOtpChange,
  onVerify,
  onResend,
  onChangeMobile,
  loading,
  error,
  resendSeconds,
  isResending,
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Verify your mobile number</h2>
        <p className="text-sm text-muted-foreground">
          OTP sent to <span className="font-medium text-foreground">{phoneNumber}</span>
        </p>
      </div>

      <div className="space-y-3">
        <OTPInput value={otp} onChange={onOtpChange} disabled={loading} />
        {error ? (
          <p role="alert" className="text-center text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <Button type="button" className="w-full" loading={loading} onClick={onVerify} disabled={loading || otp.length !== 6}>
        Verify OTP
      </Button>

      <div className="flex items-center justify-between gap-3 text-sm">
        <button
          type="button"
          className="text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground"
          onClick={onResend}
          disabled={isResending || resendSeconds > 0}
        >
          {isResending ? "Sending…" : resendSeconds > 0 ? `Resend OTP in ${resendSeconds}s` : "Resend OTP"}
        </button>

        <button type="button" className="text-muted-foreground hover:text-foreground hover:underline" onClick={onChangeMobile}>
          Change mobile number
        </button>
      </div>
    </div>
  );
}
