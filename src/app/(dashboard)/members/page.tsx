/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect } from "react";
import { Filter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useGetAllVehicleInfoQuery } from "@/redux/features/vehicle/vehicleApi";
import { useFilterInfoModal } from "@/features/members/hooks/use-filter-info-modal";
import { useCreateVehicleModal } from "@/features/members/hooks/use-create-vehicle-modal";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

const MembersPage = () => {
  const [_open, setOpen] = useFilterInfoModal();
  const { open: isOpen } = useCreateVehicleModal();
  const { data, isLoading, refetch } = useGetAllVehicleInfoQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  // useEffect(() => {
  //   if (data) {
  //     refetch();
  //   }
  // }, [data, refetch]);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      <Card className="border drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Vehicle History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button onClick={isOpen} size="sm" className="w-full lg:w-auto">
              <Plus className="size-4" />
              Add new
            </Button>
            <Button
              onClick={() => setOpen(true)}
              size="sm"
              className="md:hidden w-full lg:w-auto"
            >
              <Filter className="size-4" />
              Filters Info
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data || []}
            filterKey="address"
            // TODO: Notification Alert
            disabled={isLoading}
            path="members"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPage;
