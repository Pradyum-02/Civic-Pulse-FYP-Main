import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Auth abstraction layer.
 * Today it uses local frontend state only. When the backend exists, replace the
 * bodies of login/register/logout/getCurrentUser with api.post("/auth/...") calls.
 * UI components must only use this hook, never the storage details below.
 */

const STORAGE_KEY = "civicpulse.session";
const AuthContext = createContext(null);

const mockAccounts = {
  citizen: { id: "u1", name: "Pradyum Meshram", email: "citizen@civicpulse.app", role: "citizen" },
  officer: { id: "o1", name: "Rahul Kulkarni", email: "officer@civicpulse.app", role: "officer" },
  admin: { id: "u4", name: "System Admin", email: "admin@civicpulse.app", role: "admin" },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore corrupted session */
    }
    setLoading(false);
  }, []);

  const persist = useCallback((next) => {
    setUser(next);
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback(
    async ({ email, role = "citizen" }) => {
      const base = mockAccounts[role] || mockAccounts.citizen;
      const next = { ...base, email: email || base.email };
      persist(next);
      return next;
    },
    [persist],
  );

  const register = useCallback(
    async ({ name, email, role = "citizen" }) => {
      const next = { id: `u-${Date.now()}`, name: name || "New User", email, role };
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
