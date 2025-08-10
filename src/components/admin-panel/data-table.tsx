/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { z } from "zod";
import * as React from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
} from "@tabler/icons-react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { useIsMobile } from "@/hooks/use-mobile";
import { useGetSummary } from "@/hooks/use-get-summary";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { dashboardFormSchema } from "@/features/dashboard/schemas";

import { DatePicker } from "../date-picker";

import { useDeleteNotificationByIdMutation, useEditNotificationByIdMutation } from "@/redux/features/vehicle/vehicleApi";

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const Actions = ({ item }: { item: z.infer<typeof dashboardFormSchema> }) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Notification",
    "Are you sure you want to delete this notification? This action cannot be undone.",
  );

  const [deleteNotificationById, { isLoading, isSuccess, data, error }] =
    useDeleteNotificationByIdMutation();

  const status = data?.status ?? undefined
  const message = data?.message ?? undefined

  React.useEffect(() => {
    if (isSuccess && status === 200) {
      toast.success(message);
      router.refresh();
    }
    if (status === 400) {
      toast.error(message);
    };
    if (error && 'status' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = (error.data as any)?.errors?.detail;
      toast.error(errorData);
    }
  }, [message, status, isSuccess, router, error]);

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    await deleteNotificationById(item.id);
  };

  if (drawerOpen) {
    return (
      <TableCellViewer
        item={item}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    )
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => setDrawerOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={isLoading}
            onClick={onDelete}
            className="text-amber-700 focus:text-amber-700 font-medium"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

const columns: ColumnDef<z.infer<typeof dashboardFormSchema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
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
    header: "Load_created",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
        {row.original.created_by?.name ?? "Unknown"}
      </Badge>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
        {row.original.source}
      </Badge>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
        {row.original.destination}
      </Badge>
    ),
  },
  {
    accessorKey: "is_read",
    header: "Notification",
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
    accessorKey: "driver_name",
    header: "Driver Name",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.driver_name}
      </Badge>
    ),
  },
  {
    accessorKey: "driver_number",
    header: "Driver Number",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.driver_number}
      </Badge>
    ),
  },
  {
    accessorKey: "vehicle_number",
    header: "Vehicle Number",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.vehicle_number}
      </Badge>
    ),
  },
  {
    accessorKey: "vehicle_model",
    header: "Vehicle Modal",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.vehicle_model}
      </Badge>
    ),
  },
  {
    accessorKey: "rate",
    header: () => <div className="w-full text-left">Rate</div>,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.rate}
      </Badge>
    ),
  },
  {
    accessorKey: "weight",
    header: () => <div className="w-full text-left">Weight</div>,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.weight}
      </Badge>
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 truncate max-w-[100px]">
        {row.original.message}
      </Badge>
    ),
  },
  // {
  //   accessorKey: "contact",
  //   header: "Contact",
  //   cell: ({ row }) => (
  //     <Badge variant="outline" className="text-muted-foreground px-1.5">
  //       {row.original.contact ? row.original.contact : "Not Found"}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.date instanceof Date
          ? row.original.date.toLocaleString()
          : row.original.date}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Actions item={row.original} />
      )
    }
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof dashboardFormSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof dashboardFormSchema>[];
}) {
  const [data, setData] = React.useState<z.infer<typeof dashboardFormSchema>[]>([]);
  React.useEffect(() => {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    }
  }, [initialData]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  // Ensure data is cleared when initialData is empty
  React.useEffect(() => {
    if (!initialData || initialData.length === 0) {
      setData([]);
    } else {
      setData(initialData);
    }
  }, [initialData]);

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row?.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue="read-notifications"
      className="w-full flex-col justify-start gap-6 py-8"
    >
      <div className="flex items-center justify-between gap-8 mb-8">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="read-notifications">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="read-notifications">Read Notifications</SelectItem>
            <SelectItem value="unread-notifications">Unread Notifications</SelectItem>
            <SelectItem value="rejected-notifications">Rejected Notifications</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="read-notifications">Read</TabsTrigger>
          <TabsTrigger value="unread-notifications">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected-notifications">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent
        value="read-notifications"
        className="relative flex flex-col gap-4 overflow-auto shadow"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
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
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
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
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="unread-notifications"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="rejected-notifications" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}


interface TableCellViewerProps {
  item: z.infer<typeof dashboardFormSchema>;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TableCellViewer({ item, drawerOpen, setDrawerOpen }: TableCellViewerProps) {
  const summary = useGetSummary();
  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof dashboardFormSchema>>({
    resolver: zodResolver(dashboardFormSchema),
    defaultValues: {
      id: item.id || "",
      source: item.source || "",
      destination: item.destination || "",
      rate: item.rate || 0,
      weight: item.weight || 0,
      contact: item.contact || "",
      date: item.date || new Date(),
      is_read: item.is_read ?? true,
      message: item.message || "",
      created_at: item.created_at || "",
    }
  });

  const [editNotificationById, { isSuccess, isLoading, error, data }] = useEditNotificationByIdMutation();

  React.useEffect(() => {
    if (isSuccess && data.message) {
      form.reset(data?.message);
      summary?.refetch();
      toast.success("Notification updated successfully.");
      setDrawerOpen(false);
    }
    if (error && 'status' in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData = (error.data as any)?.errors?.detail;
      setDrawerOpen(false);
      toast.error(errorData);
    }
  }, [isSuccess, error, form, summary?.refetch, data]);

  const onSubmit = async (values: z.infer<typeof dashboardFormSchema>) => {
    const modifiedValues = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
    };

    const payload = {
      notification_id: values.id,
      notifications: modifiedValues,
    };
    await editNotificationById(payload)
  }

  return (
    <Drawer
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit Notification</DrawerTitle>
          <DrawerDescription>
            Modify the notification details.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Source</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter source" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter destination" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Rate</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onBlur={() => {
                            field.onChange(Number(field.value));
                          }}
                          placeholder="Enter rate"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onBlur={() => {
                            field.onChange(Number(field.value));
                          }}
                          placeholder="Enter weight"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter contact" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_read"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Notification</FormLabel>
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="space-y-1 leading-none">
                          If you want to cancel the order uncheck the box.
                        </FormLabel>
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Type your message here."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 mb-6 flex justify-end gap-3">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button type="submit" disabled={isLoading}>Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
