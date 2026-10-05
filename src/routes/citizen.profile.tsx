import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import RequireAuth from "@/components/civic/RequireAuth";
import Button from "@/components/common/Button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/citizen/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CivicPulse" },
      { name: "description", content: "Manage your CivicPulse citizen profile." },
      { property: "og:title", content: "Profile — CivicPulse" },
      { property: "og:description", content: "Manage your CivicPulse citizen profile." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Profile />
    </RequireAuth>
  ),
});

function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", area: "" });

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, area: user.area });
  }, [user]);

  if (!user) return null;

  const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
  const valid = form.name.trim().length > 1 && emailOk && form.area.trim().length > 1;

  const save = () => {
    if (!valid) return;
    const initials = form.name.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
    updateUser({ ...form, initials });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (key: "name" | "email" | "area", label: string) => (
    <div>
      <label htmlFor={key} className="text-[0.78rem] font-semibold text-muted-foreground">
        {label}
      </label>
      <input
        id={key}
        value={form[key]}
        disabled={!editing}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3.5 text-[0.92rem] text-ink outline-none transition-colors focus:border-emerald-brand disabled:bg-muted"
      />
      {editing && key === "email" && !emailOk && (
        <p className="mt-1 text-[0.76rem] text-destructive">Enter a valid email.</p>
      )}
    </div>
  );

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-[1.9rem] font-extrabold text-ink">Profile</h1>

      <section className="surface-card mt-6 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-mint text-lg font-bold text-deep">
            {user.initials}
          </span>
          <div>
            <p className="text-[1.1rem] font-bold text-ink">{user.name}</p>
            <p className="text-[0.84rem] text-muted-foreground">Citizen · Joined {user.joined}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {field("name", "Name")}
          <div>
            <p className="text-[0.78rem] font-semibold text-muted-foreground">Mobile Number</p>
            <p className="mt-1.5 flex h-11 items-center rounded-xl bg-muted px-3.5 text-[0.92rem] text-ink">
              {user.mobile}
            </p>
          </div>
          {field("email", "Email")}
          {field("area", "Area")}
          <div>
            <p className="text-[0.78rem] font-semibold text-muted-foreground">Joined Date</p>
            <p className="mt-1.5 flex h-11 items-center rounded-xl bg-muted px-3.5 text-[0.92rem] text-ink">
              {user.joined}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {editing ? (
            <>
              <Button onClick={save} disabled={!valid}>Save Changes</Button>
              <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
          {saved && (
            <span role="status" className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-emerald-brand">
              <CheckCircle2 size={15} /> Changes saved
            </span>
          )}
        </div>
      </section>
    </main>
  );
}
