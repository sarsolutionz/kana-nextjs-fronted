/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BellPlus, Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FiltersInfo } from "@/features/members/components/filters-info";
import { Modals } from "./modals";
import { useCreateNotificationModal } from "@/features/members/hooks/use-create-notification-modal";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  disabled?: boolean;
  path: string;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  filterKey,
  disabled,
  path,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const { open } = useCreateNotificationModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap items-center py-4 gap-2">
          {path === "members" ? (
            <div className="hidden md:flex items-center py-4 gap-2">
              <Input
                placeholder={`Filter by ${filterKey}...`}
                value={
                  (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(filterKey)?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Input
                placeholder={`Filter by ${"model"}...`}
                value={
                  (table.getColumn("model")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("model")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Input
                placeholder={`Filter by ${"capacity"}...`}
                value={
                  (table.getColumn("capacity")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("capacity")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Input
                placeholder={`Filter by ${"vehicle no"}...`}
                value={
                  (table
                    .getColumn("vehicle_number")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("vehicle_number")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <Select
                onValueChange={(value) => {
                  if (value === "all") {
                    table.getColumn("vehicle_type")?.setFilterValue("");
                  } else {
                    table.getColumn("vehicle_type")?.setFilterValue(value);
                  }
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="all" className="text-center">
                    All
                  </SelectItem>
                  <SelectItem value="open" className="text-center">
                    Open
                  </SelectItem>
                  <SelectItem value="close" className="text-center">
                    Close
                  </SelectItem>
                </SelectContent>
              </Select>

              {table ? (
                <Modals table={table} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader className="size-4 text-muted-foreground animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <Input
              placeholder={`Filter by ${filterKey}...`}
              value={
                (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(filterKey)?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
          )}

          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="ml-auto">
              <Button
                disabled={disabled}
                size="sm"
                variant="outline"
                className="font-normal text-xs"
                onClick={() => {
                  const selectedIds = table
                    .getSelectedRowModel()
                    .flatRows.map((row) => row.original.id);
                  open(selectedIds);
                  table.resetRowSelection();
                }}
              >
                <BellPlus className="size-4 mr-0.5" />
                Send Alert ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
