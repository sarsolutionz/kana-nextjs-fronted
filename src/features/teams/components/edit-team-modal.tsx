"use client";

import { EditTeamForm } from "./edit-team-form";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTeamModal } from "../hooks/use-edit-team-modal";

import { skipToken } from "@reduxjs/toolkit/query";
import { useGetUserByIdQuery } from "@/redux/features/team/teamApi";

export const EditTeamModal = () => {
  const { teamId, close } = useEditTeamModal();

  const {
    data: initialValues,
    error,
    isLoading,
  } = useGetUserByIdQuery(teamId ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <ResponsiveModal open={!!teamId} onOpenChange={close}>
      {teamId && initialValues && (
        <EditTeamForm
          initialValues={initialValues}
          error={error}
          isLoading={isLoading}
          id={teamId}
          onCancel={close}
        />
      )}
    </ResponsiveModal>
  );
};
