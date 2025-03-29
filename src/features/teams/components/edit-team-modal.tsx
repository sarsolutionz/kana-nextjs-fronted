"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTeamModal } from "../hooks/use-edit-team-modal";
import { EditTeamForm } from "./edit-team-form";

export const EditTeamModal = () => {
  const { teamId, close } = useEditTeamModal();

  return (
    <ResponsiveModal key={teamId} open={!!teamId} onOpenChange={close}>
      {teamId && <EditTeamForm key={teamId} id={teamId} onCancel={close} />}
    </ResponsiveModal>
  );
};
