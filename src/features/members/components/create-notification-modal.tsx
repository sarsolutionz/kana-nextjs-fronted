"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateNotificationModal } from "../hooks/use-create-notification-modal";

import { CreateNotificationForm } from "./create-notification-form";

export const CreateNotificationModal = () => {
  const { notificationId, close } = useCreateNotificationModal();

  return (
    <ResponsiveModal open={!!notificationId} onOpenChange={close}>
      {notificationId && (
        <CreateNotificationForm id={notificationId} onCancel={close} />
      )}
    </ResponsiveModal>
  );
};
