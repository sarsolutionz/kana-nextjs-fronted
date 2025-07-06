"use client";

import { ContentSection } from "../components/content-section";
import { NotificationForm } from "./notifications-form";
import { ServiceStatusBanner } from "./service-status-banner";

export const NotificationSection = () => {
    return (
        <>
            <ServiceStatusBanner />
            <ContentSection
                title="Notifications"
                desc="Configure how you receive notifications."
            >
                <NotificationForm />
            </ContentSection>
        </>
    )
}