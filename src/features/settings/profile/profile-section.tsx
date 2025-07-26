"use client";

import { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import { useGetMemberInfoQuery } from "@/redux/features/auth/authApi";

import { ProfileForm } from "./profile-form";
import { ContentSection } from "../components/content-section"

export const ProfileSection = () => {
    const access_token = useSelector((state: RootState) => state.auth.access_token?.access);
    const isAuthenticated = Boolean(access_token);
    const { data, isLoading, refetch } = useGetMemberInfoQuery(undefined, {
        skip: !isAuthenticated,
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