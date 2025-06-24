"use client";

import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Notification } from "@/features/partners/types";
import { Checkbox } from "@/components/ui/checkbox";
import { NotificationActions } from "@/features/partners/components/notification-actions";

export const columns: ColumnDef<Notification>[] = [
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
        accessorKey: "source",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Source
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const source = row.original.source;
            return <span className="line-clamp-1 ml-2">{source}</span>;
        },
    },
    {
        accessorKey: "destination",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Destination
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const destination = row.original.destination;
            return <span className="line-clamp-1 ml-2">{destination}</span>;
        },
    },
    {
        accessorKey: "is_read",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Is Read
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
                {row.original.is_read ? (
                    <IconCircleCheckFilled className="size-4 fill-green-500 dark:fill-green-400" />
                ) : (
                    <IconLoader className="size-4" />
                )}
                {row.original.is_read ? "Done" : "processing"}
            </Badge>
        ),
    },
    {
        accessorKey: "rate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rate
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const rate = row.original.rate;
            return <span className="line-clamp-1 ml-2">{rate}</span>;
        },
    },
    {
        accessorKey: "weight",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Weight
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const weight = row.original.weight;
            return <span className="line-clamp-1 ml-2">{weight}</span>;
        },
    },
    {
        accessorKey: "message",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Message
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const message = row.original.message;
            return <span className="line-clamp-1 ml-2">{message}</span>;
        },
    },
    {
        accessorKey: "contact",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Contact
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const contact = row.original.contact;
            return <span className="line-clamp-1 ml-2">{contact ? contact : "Not Found"}</span>;
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = row.original.date;
            return <span className="line-clamp-1 ml-2">{date instanceof Date
                ? date.toLocaleString()
                : date}</span>;
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
    }
]