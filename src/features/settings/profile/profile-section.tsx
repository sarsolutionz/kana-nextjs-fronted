"use client";

import { useEffect } from "react";
import { useGetMemberInfoQuery } from "@/redux/features/auth/authApi";
import { ContentSection } from "../components/content-section"
import { ProfileForm } from "./profile-form";

export const ProfileSection = () => {
    const { data, isLoading, refetch } = useGetMemberInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

    return (
        <ContentSection
            title="Profile"
            desc="This is how others will see you on the site."
        >
            {data && (
                <ProfileForm
                    id={data.id}
                    data={data}
                    isLoading={isLoading}
                />
            )}
        </ContentSection>
    )
}