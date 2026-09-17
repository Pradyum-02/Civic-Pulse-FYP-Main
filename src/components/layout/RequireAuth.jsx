import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LoadingState } from "../common/States";

/** Frontend-only route guard. Replace with backend session checks later. */
export default function RequireAuth({ role, children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate, role]);

  if (loading || !user) return <LoadingState label="Checking your session…" />;
  return children;
}
