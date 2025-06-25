import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEditPartnerModal } from "../hooks/use-edit-partner-modal";

import { useDeleteDriverByIdMutation } from "@/redux/features/auth/authApi";

interface PartnerActionsProps {
    id: string;
    children?: React.ReactNode;
};

export const PartnerActions = ({ id, children }: PartnerActionsProps) => {
    const router = useRouter();

    const { open } = useEditPartnerModal();

    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Partner",
        "Are you sure you want to delete this partner? This action cannot be undone.",
    );

    const [deleteDriverById, { isLoading, isSuccess }] =
        useDeleteDriverByIdMutation();

    useEffect(() => {
        if (isSuccess) {
            router.refresh();
        }
    }, [isSuccess, router]);

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;
        await deleteDriverById(id);
    };

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        className="font-medium p-[10px]"
                    >
                        <Edit className="size-4 mr-2 stroke-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onDelete()}
                        disabled={isLoading}
                        className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
                    >
                        <Trash2 className="size-4 mr-2 stroke-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
