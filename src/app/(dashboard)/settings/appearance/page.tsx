import { ContentLayout } from "@/components/admin-panel/content-layout";
import { AppearanceSection } from "@/features/settings/appearance/appearance-section";

const AppearancePage = () => {
    return (
        <ContentLayout title="Settings">
            <AppearanceSection />
        </ContentLayout>
    );
}

export default AppearancePage;