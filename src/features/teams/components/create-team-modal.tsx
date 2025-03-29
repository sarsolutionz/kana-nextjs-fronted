"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateTeamModal } from "../hooks/use-create-team-modal";

import { CreateTeamForm } from "./create-team-form";

export const CreateTeamModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTeamModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTeamForm onCancel={close} />
    </ResponsiveModal>
  );
};
