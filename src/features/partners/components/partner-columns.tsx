"use client";

import { ArrowUpDown, CircleCheck, CircleXIcon, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Partner } from "@/features/partners/types";
import { Checkbox } from "@/components/ui/checkbox";
import { NotificationActions } from "./notification-actions";

export const PartnerColumns: ColumnDef<Partner>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const name = row.original.name;
            return <span className="line-clamp-1 ml-2">{name}</span>;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const email = row.original.email;
            return <span className="line-clamp-1 ml-2">{email}</span>;
        },
    },
    {
        accessorKey: "number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const number = row.original.number;
            return <span className="line-clamp-1 ml-2">{number}</span>;
        },
    },
    {
        accessorKey: "is_deleted",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Is Deleted
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const is_deleted = row.original.is_deleted;
            return (
                <span className="line-clamp-1 ml-6">
                    {is_deleted ? (
                        <CircleCheck className="size-5 bg-green-600 text-white rounded-full" />
                    ) : (
                        <CircleXIcon className="size-5 bg-red-600 text-white rounded-full" />
                    )}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id;

            return (
                <NotificationActions id={id}>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreVertical className="size-4" />
                    </Button>
                </NotificationActions>
            )
        },
    },
]