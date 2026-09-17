import { useState } from "react";
import PageHeader from "./PageHeader";
import Card, { CardHeader } from "./Card";
import Button from "./Button";
import { Input } from "./Field";
import { useAuth } from "@/context/AuthContext";

/** Profile screen shared by all roles. Saving is UI-only until the backend exists. */
export default function ProfilePanel({ roleLabel, extra }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const [saved, setSaved] = useState(false);
  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setSaved(false);
  };

  return (
    <>
      <PageHeader title="Profile" description={`${roleLabel} account details`} />
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Account information" description="Update your contact details." />
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="p-name" label="Full name" value={form.name} onChange={(e) => set({ name: e.target.value })} />
              <Input id="p-email" label="Email" type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} />
              <Input id="p-phone" label="Phone" value={form.phone} onChange={(e) => set({ phone: e.target.value })} />
              <Input id="p-address" label="Ward / area" value={form.address} onChange={(e) => set({ address: e.target.value })} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Save changes</Button>
              {saved && (
                <span role="status" className="text-sm text-status-resolved">
                  Changes saved locally.
                </span>
              )}
            </div>
          </form>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardHeader title="Role" />
            <p className="text-sm text-muted-foreground">{roleLabel}</p>
          </Card>
          {extra}
        </div>
      </div>
    </>
  );
}
