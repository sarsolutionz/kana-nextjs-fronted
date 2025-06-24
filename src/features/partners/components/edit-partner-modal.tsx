"use client";

import { EditPartnerForm } from "./edit-partner-form";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditPartnerModal } from "../hooks/use-edit-partner-modal";

import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPartnerByIdQuery } from "@/redux/features/partner/partnerApi";

export const EditPartnerModal = () => {
    const { partnerId, close } = useEditPartnerModal();

    const {
        data,
        error,
        isLoading,
    } = useGetPartnerByIdQuery(partnerId ?? skipToken, {
        refetchOnMountOrArgChange: true,
    });
    const initialValues = data?.drivers;

    return (
        <ResponsiveModal open={!!partnerId} onOpenChange={close}>
            {partnerId && initialValues && (
                <EditPartnerForm
                    initialValues={initialValues}
                    error={error}
                    isLoading={isLoading}
                    id={partnerId}
                    onCancel={close}
                />
            )}
        </ResponsiveModal>
    );
};
