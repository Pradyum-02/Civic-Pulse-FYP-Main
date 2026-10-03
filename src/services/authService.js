const DEV_MOCK_OTP = "123456";

const normalizeDigits = (value = "") => value.replace(/\D/g, "");

export function normalizePhoneNumber(phoneNumber = "") {
  const digits = normalizeDigits(phoneNumber);
  if (!digits) return "";

  if (digits.length === 10) return `+91${digits}`;
  if (digits.length > 10 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length > 10 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  return `+${digits}`;
}

export async function sendOTP(phoneNumber) {
  const normalized = normalizePhoneNumber(phoneNumber);

  if (!normalized || normalized.length < 10) {
    throw new Error("INVALID_PHONE_NUMBER");
  }

  await new Promise((resolve) => window.setTimeout(resolve, 650));

  return {
    ok: true,
    phoneNumber: normalized,
    mockOtp: import.meta.env.DEV ? DEV_MOCK_OTP : undefined,
  };
}

export async function verifyOTP(phoneNumber, otp) {
  const normalized = normalizePhoneNumber(phoneNumber);
  const cleaned = String(otp ?? "").replace(/\s+/g, "");

  if (!/^\d{6}$/.test(cleaned)) {
    throw new Error("INVALID_OTP");
  }

  await new Promise((resolve) => window.setTimeout(resolve, 500));

  const expected = import.meta.env.DEV ? DEV_MOCK_OTP : null;
  if (expected && cleaned !== expected) {
    throw new Error("INVALID_OTP");
  }

  return {
    ok: true,
    phoneNumber: normalized,
    verified: true,
  };
}

export async function resendOTP(phoneNumber) {
  return sendOTP(phoneNumber);
}

export async function logout() {
  return true;
}
