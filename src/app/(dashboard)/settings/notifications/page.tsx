import { ContentLayout } from "@/components/admin-panel/content-layout";
import { NotificationSection } from "@/features/settings/notifications/notiofications-section";

const NotificationPage = () => {
    return (
        <ContentLayout title="Settings">
            <NotificationSection />
        </ContentLayout>
    );
}

export default NotificationPage;