"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditNotificationModal } from "../hooks/use-edit-notification-modal";
import { EditNotioficationForm } from "./edit-notification-form";

import { skipToken } from "@reduxjs/toolkit/query";
import { useGetNotificationByIdQuery } from "@/redux/features/vehicle/vehicleApi";

export const EditNotificationModal = () => {
    const { notificationId, close } = useEditNotificationModal();

    const {
        data,
        error,
        isLoading,
    } = useGetNotificationByIdQuery(notificationId ?? skipToken, {
        refetchOnMountOrArgChange: true,
    });
    const initialValues = data?.notification;

    return (
        <ResponsiveModal open={!!notificationId} onOpenChange={close}>
            {notificationId && initialValues && (
                <EditNotioficationForm
                    initialValues={initialValues}
                    error={error}
                    isLoading={isLoading}
                    id={notificationId}
                    onCancel={close}
                />
            )}
        </ResponsiveModal>
    );
};
