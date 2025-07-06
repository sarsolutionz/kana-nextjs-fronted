import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ProfileSection } from "@/features/settings/profile/profile-section";

const SettingsPage = () => {
  return (
    <ContentLayout title="Settings">
      <ProfileSection />
    </ContentLayout>
  );
}

export default SettingsPage;