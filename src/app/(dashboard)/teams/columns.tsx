"use client";

import { ArrowUpDown, CircleCheck, CircleXIcon, MinusIcon } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Actions } from "./actions";

import { TeamData } from "@/features/teams/types";

// import { Actions } from "./actions";
// import { VehicleType } from "@/features/members/types";

export const columns: ColumnDef<TeamData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.original.email;
      return <span className="line-clamp-1 ml-2">{email}</span>;
    },
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <span className="line-clamp-1 ml-4">{name}</span>;
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const number = row.original.number;
      return <span className="line-clamp-1 ml-4">{number}</span>;
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const is_active = row.original.is_active;
      return (
        <span className="line-clamp-1 ml-6">
          {is_active ? (
            <CircleCheck className="size-5 bg-green-600 text-white rounded-full" />
          ) : (
            <CircleXIcon className="size-5 bg-red-600 text-white rounded-full" />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "is_admin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Is Admin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const is_admin = row.original.is_admin;
      return (
        <span className="line-clamp-1 ml-6">
          {is_admin ? (
            <CircleCheck className="size-5 bg-green-600 text-white rounded-full" />
          ) : (
            <CircleXIcon className="size-5 bg-red-600 text-white rounded-full" />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.original.role;
      return <span className="line-clamp-1 ml-5">{role ? role : <MinusIcon />}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
