"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreatePartnerModal } from "../hooks/use-create-partner-modal";

import { CreatePartnerForm } from "./create-partner-form";

export const CreatePartnerModal = () => {
  const { isOpen, setIsOpen, close } = useCreatePartnerModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreatePartnerForm onCancel={close} />
    </ResponsiveModal>
  );
};
