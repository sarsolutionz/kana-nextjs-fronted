"use client";

import { ArrowUpDown, Minus, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { IconCircleCheckFilled, IconLoader, IconX } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Notification } from "@/features/partners/types";
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
        accessorKey: "created_by",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Load_created
                    <ArrowUpDown className="size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const created_by = row.original?.created_by?.name || <Minus />;
            return <span className="line-clamp-1 ml-4">{created_by}</span>;
        },
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
        accessorKey: "vehicle",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Driver_Name
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const driver_name = row.original?.vehicle?.name || <Minus />;
            return <span className="line-clamp-1 ml-4">{driver_name}</span>;
        },
    },
    {
        accessorKey: "vehicle",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Driver_Number
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const driver_number = row.original?.vehicle?.alternate_number || <Minus />;
            return <span className="line-clamp-1 ml-4">{driver_number}</span>;
        },
    },
    {
        accessorKey: "vehicle",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vehicle_Number
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const vehicle_number = row.original?.vehicle?.vehicle_number || <Minus />;
            return <span className="line-clamp-1 ml-4">{vehicle_number}</span>;
        },
    },
    {
        accessorKey: "vehicle",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    V_Model
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const vehicle_model = row.original?.vehicle?.model || <Minus />;
            return <span className="line-clamp-1 ml-4">{vehicle_model}</span>;
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
                {
                    row.original.is_read && row.original.is_accepted ? (
                        <IconCircleCheckFilled className="size-4 fill-green-500 dark:fill-green-400" />
                    ) : !row.original.is_read && row.original.is_accepted ? (
                        <IconX className="size-4 text-red-500 dark:text-red-400" />
                    ) : (
                        <IconLoader className="size-4" />
                    )
                }
                {
                    row.original.is_read && row.original.is_accepted
                        ? "Done"
                        : !row.original.is_read && row.original.is_accepted
                            ? "Rejected"
                            : "Processing"
                }
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
            return <span className="line-clamp-1 ml-4">{rate}</span>;
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
            return <span className="line-clamp-1 ml-4">{weight}</span>;
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