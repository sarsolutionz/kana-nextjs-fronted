import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFilterInfoModal } from "../hooks/use-filter-info-modal";
import { Input } from "@/components/ui/input";

interface TableProps<TData> {
  table: Table<TData>;
}

export const FiltersInfo = <TData,>({ table }: TableProps<TData>) => {
  const [open, setOpen] = useFilterInfoModal();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters a vehicle info</DialogTitle>
        </DialogHeader>
        <Input
          placeholder={`Filter by ${"address"}...`}
          value={
            (table?.getColumn("address")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table?.getColumn("address")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder={`Filter by ${"model"}...`}
          value={(table?.getColumn("model")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table?.getColumn("model")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder={`Filter by ${"capacity"}...`}
          value={
            (table?.getColumn("capacity")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table?.getColumn("capacity")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder={`Filter by ${"vehicle no"}...`}
          value={
            (table?.getColumn("vehicle_number")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              ?.getColumn("vehicle_number")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              table?.getColumn("vehicle_type")?.setFilterValue("");
            } else {
              table?.getColumn("vehicle_type")?.setFilterValue(value);
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
        <div className="flex justify-end">
          <Button disabled={false} onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
