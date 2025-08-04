"use client";

import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteNotificationByIdMutation } from "@/redux/features/vehicle/vehicleApi";

interface DataTableProps<TData extends { id: string | number }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterKey?: string;
    disabled?: boolean;
    path: string;
}

export function DataTable<TData extends { id: string | number }, TValue>({
    columns,
    data,
    filterKey = "",
    disabled,
    path,
}: DataTableProps<TData, TValue>) {
    const tableBodyRef = React.useRef<HTMLTableSectionElement>(null);
    const router = useRouter();
    const [ConfrimDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to perform a bulk delete."
    );

    const [deleteNotificationById, { isLoading, isSuccess, data: deleteData }] =
        useDeleteNotificationByIdMutation();

    const status = deleteData?.status ?? undefined
    const message = deleteData?.message ?? undefined

    React.useEffect(() => {
        if (isSuccess && status === 200) {
            toast.success(message);
            router.refresh();
        }
        if (status === 400) {
            toast.error(message);
        };
    }, [message, status, isSuccess, router]);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    const handleWheel = (e: React.WheelEvent) => {
        if (tableBodyRef.current) {
            tableBodyRef.current.scrollLeft += e.deltaY * 0.5;
            e.preventDefault();
        }
    };

    return (
        <div>
            <ConfrimDialog />
            <div className="flex items-center pb-4">
                {path === "partner" &&
                    <Input
                        placeholder={`Search by ${filterKey}...`}
                        value={
                            (table.getColumn(filterKey)?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn(filterKey)?.setFilterValue(event.target.value)
                        }
                        className="max-w-xs"
                    />
                }
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <Button
                        disabled={isLoading || disabled}
                        size="sm"
                        variant="outline"
                        className="text-amber-700 hover:text-amber-700 ml-auto font-normal text-xs"
                        onClick={async () => {
                            const ok = await confirm();
                            if (ok) {
                                const ids = table.getFilteredSelectedRowModel().rows.map((r) => r.original.id)
                                await deleteNotificationById(ids)
                                table.resetRowSelection();
                            }
                        }}
                    >
                        <Trash2 className="size-4 mr-2" />
                        Delete ({table.getFilteredSelectedRowModel().rows.length})
                    </Button>
                )}
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
                    <TableBody ref={tableBodyRef} onWheel={handleWheel}>
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
        </div>
    );
}