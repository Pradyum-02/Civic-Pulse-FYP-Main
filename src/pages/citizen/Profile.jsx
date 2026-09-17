import ProfilePanel from "@/components/common/ProfilePanel";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CitizenProfile() {
  useDocumentTitle("Profile — CivicPulse");
  return <ProfilePanel roleLabel="Citizen" />;
}
