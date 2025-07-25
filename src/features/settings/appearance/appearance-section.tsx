"use client";

import { ContentSection } from "../components/content-section";
import { AppearanceForm } from "./appearance-form";


export const AppearanceSection = () => {
    return (
        <ContentSection
            title="Appearance"
            desc="Customize the appearance of the app. Automatically switch between day
          and night themes."
        >
            <AppearanceForm />
        </ContentSection>
    )
}