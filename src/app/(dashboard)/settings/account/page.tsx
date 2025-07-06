import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AccountSection } from "@/features/settings/account/account-section";

const AccountPage = () => {
  return (
    <ContentLayout title="Settings">
      <AccountSection />
    </ContentLayout>
  );
}

export default AccountPage;