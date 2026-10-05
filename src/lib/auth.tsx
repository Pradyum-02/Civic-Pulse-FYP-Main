import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { user as mockUser } from "@/data/mockData";

const STORAGE_KEY = "civicpulse_user";
export const DEMO_OTP = "123456";

export interface CivicUser {
  name: string;
  mobile: string;
  email: string;
  area: string;
  joined: string;
  initials: string;
}

interface AuthValue {
  user: CivicUser | null;
  ready: boolean;
  sendOtp: (mobile: string) => Promise<string>;
  verifyOtp: (mobile: string, otp: string) => Promise<boolean>;
  updateUser: (patch: Partial<CivicUser>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CivicUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as CivicUser);
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: CivicUser | null) => {
    setUser(next);
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const sendOtp = useCallback(async (_mobile: string) => {
    await new Promise((r) => setTimeout(r, 700));
    return DEMO_OTP;
  }, []);

  const verifyOtp = useCallback(
    async (mobile: string, otp: string) => {
      await new Promise((r) => setTimeout(r, 700));
      if (otp !== DEMO_OTP) return false;
      persist({ ...mockUser, mobile: `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}` });
      return true;
    },
    [persist],
  );

  const updateUser = useCallback(
    (patch: Partial<CivicUser>) => {
      persist(user ? { ...user, ...patch } : null);
    },
    [persist, user],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, ready, sendOtp, verifyOtp, updateUser, logout }),
    [user, ready, sendOtp, verifyOtp, updateUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
