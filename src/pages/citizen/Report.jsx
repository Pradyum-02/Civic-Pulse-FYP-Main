import { useState } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { CheckCircle2, Send } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Card, { CardHeader } from "@/components/common/Card";
import Button from "@/components/common/Button";
import { Input, Select, Textarea } from "@/components/common/Field";
import ImageUploader from "@/components/complaints/ImageUploader";
import AiAnalysisPanel from "@/components/complaints/AiAnalysisPanel";
import LocationPicker from "@/components/maps/LocationPicker";
import { CATEGORIES } from "@/mock/mockData";

const categoryOptions = [
  { value: "", label: "Select a category" },
  ...CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
];

function ReportPage() {
  useDocumentTitle("Report an Issue — CivicPulse");
  const [form, setForm] = useState({ category: "", title: "", description: "" });
  const [image, setImage] = useState(null);
  const [ai, setAi] = useState(null);
  const [location, setLocation] = useState({ lat: 21.1458, lng: 79.0882, address: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onImageSelect = (file, preview) => {
    setImage({ file, preview });
    // MOCK: simulated AI detection. The real AI service is connected later.
    setAi({ status: "analyzing" });
    window.setTimeout(() => {
      const detected = CATEGORIES.find((c) => c.id === form.category) || CATEGORIES[0];
      setAi({ status: "done", category: detected.label, confidence: 94 });
    }, 1600);
  };

  const removeImage = () => {
    setImage(null);
    setAi(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.title.trim().length < 5) next.title = "Add a short, descriptive title.";
    if (!location.address.trim()) next.address = "Add an address or landmark.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(`CP-${Math.floor(2000 + Math.random() * 900)}`);
    }, 1000);
  };

  if (submitted) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-status-resolved" aria-hidden="true" />
        <h1 className="mt-4 text-xl font-semibold text-foreground">Complaint submitted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your reference number is <span className="font-mono text-foreground">{submitted}</span>. You
          can follow its progress from My Complaints.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          This build stores nothing yet — submissions will persist once the backend is connected.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/citizen/complaints">
            View my complaints
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(null);
              setForm({ category: "", title: "", description: "" });
              removeImage();
            }}
          >
            Report another issue
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <PageHeader
        title="Report a civic issue"
        description="Add a title and location. Category, description, and photo are optional."
      />

      <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-3" noValidate>
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Issue details" description="Tell us what is wrong." />
            <div className="space-y-4">
              <Select
                id="category"
                label="Category (optional)"
                value={form.category}
                onChange={(e) => set({ category: e.target.value })}
                options={categoryOptions}
              />
              <Input
                id="title"
                label="Issue title"
                required
                placeholder="e.g. Deep pothole near Shivaji Chowk"
                value={form.title}
                onChange={(e) => set({ title: e.target.value })}
                error={errors.title}
              />
              <Textarea
                id="description"
                label="Description (optional)"
                placeholder="Add a few details"
                value={form.description}
                onChange={(e) => set({ description: e.target.value })}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Photo" description="A clear photo helps officers verify the issue faster." />
            <div className="space-y-4">
              <ImageUploader preview={image?.preview} onSelect={onImageSelect} onRemove={removeImage} />
              <AiAnalysisPanel state={ai} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Location" description="Use your current location or place the marker manually." />
            <LocationPicker value={location} onChange={setLocation} error={errors.address} />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-24">
            <CardHeader title="Submit" description="Review your details before sending." />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Category: {CATEGORIES.find((c) => c.id === form.category)?.label || "Optional"}</li>
              <li>Photo: {image ? "Attached" : "Not attached"}</li>
              <li>Location: {location.address || "Not set"}</li>
            </ul>
            <div className="mt-5 space-y-2">
              <Button type="submit" className="w-full" loading={submitting}>
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit complaint
              </Button>
              <Button as={Link} to="/citizen/dashboard" variant="ghost" className="w-full">
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}

export default ReportPage;
