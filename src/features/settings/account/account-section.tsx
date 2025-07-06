"use client";

import { ContentSection } from "../components/content-section";
import { AccountForm } from "./account-form";

export const AccountSection = () => {
    return (
        <ContentSection
            title="Account"
            desc="Update your account password. Set your preferred password and
          new password."
        >
            <AccountForm />
        </ContentSection>
    )
}