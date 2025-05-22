"use client";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditTeamModal } from "@/features/teams/hooks/use-edit-team-modal";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteDriverByIdMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ActionsProps {
  id: string;
}

export const Actions = ({ id }: ActionsProps) => {
  const router = useRouter();

  const { open } = useEditTeamModal();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Driver",
    "Are you sure you want to delete this driver?"
  );

  // , refetch, isLoading, error
  const [deleteDriverById, { isLoading, isSuccess }] =
    useDeleteDriverByIdMutation();

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    await deleteDriverById(id);
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => open(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoading} onClick={() => handleDelete()}>
            <Trash2 className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
