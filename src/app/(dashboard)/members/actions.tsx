"use client";

import { useRouter } from "next/navigation";
import { BellPlus, Edit, FileUp, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useOpenMember } from "@/features/members/hooks/use-open-member";
import { useCreateNotificationModal } from "@/features/members/hooks/use-create-notification-modal";

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

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
          <Edit className="size-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem disabled={false} onClick={() => open(Number(id))}>
          <BellPlus className="size-4 mr-2" />
          Send Alert
        </DropdownMenuItem>
        <DropdownMenuItem disabled={false} onClick={handleDocumnet}>
          <FileUp className="size-4 mr-2" />
          Documents
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
