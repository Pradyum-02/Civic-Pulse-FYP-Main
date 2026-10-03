import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "civicpulse.session";
const AuthContext = createContext(null);

const mockAccounts = {
  citizen: { id: "u1", name: "Citizen User", phoneNumber: "+919876543210", role: "citizen" },
  officer: { id: "o1", name: "Field Officer", phoneNumber: "+919812345678", role: "officer" },
  admin: { id: "a1", name: "System Admin", phoneNumber: "+919900000001", role: "admin" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // Ignore corrupted session values.
    }
    setLoading(false);
  }, []);

  const persist = useCallback((next) => {
    setUser(next);
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async ({ phoneNumber, role = "citizen" }) => {
      const base = mockAccounts[role] || mockAccounts.citizen;
      const next = {
        ...base,
        phoneNumber: phoneNumber || base.phoneNumber,
        role,
      };
      persist(next);
      return next;
    },
    [persist],
  );

  const register = useCallback(
    async ({ phoneNumber, role = "citizen" }) => {
      const next = {
        id: `u-${Date.now()}`,
        name: "New CivicPulse User",
        phoneNumber: phoneNumber || "+919000000000",
        role,
      };
      persist(next);
      return next;
    },
    [persist],
  );

  const logout = useCallback(async () => persist(null), [persist]);
  const getCurrentUser = useCallback(() => user, [user]);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, getCurrentUser }),
    [user, loading, login, register, logout, getCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
