import { ContentLayout } from "@/components/admin-panel/content-layout";
import { SettingsDisplay } from "@/features/settings/display/settings-display";

const DisplayPage = () => {
    return (
        <ContentLayout title="Display">
            <SettingsDisplay />
        </ContentLayout>
    );
}

export default DisplayPage;