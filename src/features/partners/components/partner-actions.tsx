import { toast } from "sonner";
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

import { useDeletePartnerByIdMutation } from "@/redux/features/partner/partnerApi";

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

    const [deletePartnerById, { isLoading, isSuccess, data }] =
        useDeletePartnerByIdMutation();

    const status = data?.status ?? undefined
    const message = data?.message ?? undefined

    useEffect(() => {
        if (isSuccess && status === 200) {
            toast.success(message);
            router.refresh();
        }
        if (status === 400) {
            toast.error(message);
        };
    }, [message, status, isSuccess, router]);

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;
        await deletePartnerById(id);
    };

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => open(id)}>
                        <Edit className="size-4 mr-2 stroke-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onDelete()}
                        disabled={isLoading}
                        className="text-amber-700 focus:text-amber-700 font-medium"
                    >
                        <Trash2 className="size-4 mr-2 stroke-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
