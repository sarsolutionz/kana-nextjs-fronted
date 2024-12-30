"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellPlus, Edit, FileUp, MoreHorizontal } from "lucide-react";

import { useOpenMember } from "@/features/members/hooks/use-open-member";
import { useRouter } from "next/navigation";

interface ActionsProps {
  id: string;
}

export const Actions = ({ id }: ActionsProps) => {
  const router = useRouter();
  const { onOpen } = useOpenMember();

  const handleDocumnet = () => {
    router.push(`/members/${id}`);
  };

  return (
    <DropdownMenu>
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
        <DropdownMenuItem disabled={false} onClick={() => {}}>
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
