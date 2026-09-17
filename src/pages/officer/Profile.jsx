import ProfilePanel from "@/components/common/ProfilePanel";
import Card, { CardHeader } from "@/components/common/Card";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function OfficerProfile() {
  useDocumentTitle("Officer Profile — CivicPulse");
  return (
    <ProfilePanel
      roleLabel="Officer"
      extra={
        <Card>
          <CardHeader title="Department" />
          <p className="text-sm text-muted-foreground">Roads</p>
        </Card>
      }
    />
  );
}
