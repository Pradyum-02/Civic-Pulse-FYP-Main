import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Smartphone } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/common/Button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — CivicPulse" },
      {
        name: "description",
        content: "Sign in to the CivicPulse citizen portal with your mobile number.",
      },
      { property: "og:title", content: "Login — CivicPulse" },
      {
        property: "og:description",
        content: "Sign in to the CivicPulse citizen portal with your mobile number.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, ready, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/citizen/dashboard", replace: true });
  }, [ready, user, navigate]);

  const validMobile = /^[6-9]\d{9}$/.test(mobile);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validMobile) {
      setError("Enter a valid 10 digit Indian mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    const code = await sendOtp(mobile);
    setDemoOtp(code);
    setLoading(false);
    setStep("otp");
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    const ok = await verifyOtp(mobile, otp);
    setLoading(false);
    if (!ok) {
      setError("That OTP is incorrect. Use 123456 for this demo.");
      return;
    }
    navigate({ to: "/citizen/dashboard" });
  };

  const masked = mobile ? `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}` : "+91 XXXXX XXXXX";

  return (
    <div className="sky-canvas flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 py-6 lg:px-8">
        <Link to="/" aria-label="CivicPulse home">
          <Logo />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-muted-foreground transition-colors hover:text-deep"
        >
          <ArrowLeft size={15} /> Back to site
        </Link>
      </div>

      <main className="flex flex-1 items-start justify-center px-5 pb-20 pt-6">
        <div className="surface-card w-full max-w-md p-7 sm:p-9">
          <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-deep">
            <Smartphone size={20} />
          </span>

          {step === "mobile" ? (
            <form onSubmit={handleSend} noValidate>
              <h1 className="mt-5 text-[1.6rem] font-extrabold text-ink">Welcome to CivicPulse</h1>
              <p className="mt-2 text-[0.9rem] text-muted-foreground">
                Enter your mobile number to access your citizen portal.
              </p>

              <label
                htmlFor="mobile"
                className="mt-7 block text-[0.8rem] font-semibold text-ink"
              >
                Mobile number
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-emerald-brand">
                <span className="text-[0.9rem] font-semibold text-muted-foreground">+91</span>
                <span className="h-6 w-px bg-border" aria-hidden />
                <input
                  id="mobile"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10 digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="h-12 flex-1 bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-muted-foreground/70"
                />
              </div>

              {error && (
                <p role="alert" className="mt-3 text-[0.82rem] font-medium text-destructive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                loading={loading}
                disabled={!validMobile}
                className="mt-6 w-full"
              >
                Get OTP
              </Button>

              <p className="mt-4 text-center text-[0.76rem] text-muted-foreground">
                Demo mode — no real SMS is sent.
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerify} noValidate>
              <h1 className="mt-5 text-[1.6rem] font-extrabold text-ink">
                Verify your mobile number
              </h1>
              <p className="mt-2 text-[0.9rem] text-muted-foreground">
                We sent a 6-digit OTP to {masked}
              </p>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-mint px-3.5 py-2.5 text-[0.82rem] font-semibold text-deep">
                <CheckCircle2 size={15} aria-hidden /> Demo OTP: {demoOtp}
              </div>

              <label htmlFor="otp" className="mt-6 block text-[0.8rem] font-semibold text-ink">
                Enter OTP
              </label>
              <input
                id="otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="______"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="mt-2 h-14 w-full rounded-xl border border-border bg-background text-center text-[1.4rem] font-bold tracking-[0.5em] text-ink outline-none transition-colors focus:border-emerald-brand"
              />

              {error && (
                <p role="alert" className="mt-3 text-[0.82rem] font-medium text-destructive">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                loading={loading}
                disabled={otp.length !== 6}
                className="mt-6 w-full"
              >
                Verify &amp; Continue
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("mobile");
                  setOtp("");
                  setError("");
                }}
                className="mt-4 w-full text-center text-[0.82rem] font-semibold text-muted-foreground transition-colors hover:text-deep"
              >
                Change mobile number
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
