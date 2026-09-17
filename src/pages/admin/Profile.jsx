import ProfilePanel from "@/components/common/ProfilePanel";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function AdminProfile() {
  useDocumentTitle("Admin Profile — CivicPulse");
  return <ProfilePanel roleLabel="Administrator" />;
}
