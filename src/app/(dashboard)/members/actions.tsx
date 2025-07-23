"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BellPlus, Edit, FileUp, MoreHorizontal, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useOpenMember } from "@/features/members/hooks/use-open-member";
import { useCreateNotificationModal } from "@/features/members/hooks/use-create-notification-modal";
import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteVehicleByIdMutation } from "@/redux/features/vehicle/vehicleApi";

interface ActionsProps {
  id: string;
}

export const Actions = ({ id }: ActionsProps) => {
  const router = useRouter();
  const { onOpen } = useOpenMember();
  const { open } = useCreateNotificationModal();

  const handleDocumnet = () => {
    router.push(`/members/${id}`);
  };

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Vehicle",
    "Are you sure you want to delete this vehicle?"
  );

  const [deleteVehicleById, { isLoading, isSuccess, error }] =
    useDeleteVehicleByIdMutation();

  useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
    if (error && 'status' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = (error.data as any)?.detail;
      toast.error(errorData);
    }
  }, [isSuccess, router, error]);

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    await deleteVehicleById(id);
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
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => open([id])}>
            <BellPlus className="size-4 mr-2" />
            Send Alert
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDocumnet}>
            <FileUp className="size-4 mr-2" />
            Documents
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
