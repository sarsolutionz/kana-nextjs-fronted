"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCreateVehicleModal } from "@/features/members/hooks/use-create-vehicle-modal";
import { useGetAllVehicleInfoQuery } from "@/redux/features/vehicle/vehicleApi";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

const MembersPage = () => {
  const { open } = useCreateVehicleModal();
  const { data, isLoading, refetch } = useGetAllVehicleInfoQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data, refetch]);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10">
      <Card className="border drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Vehicle History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button onClick={open} size="sm" className="w-full lg:w-auto">
              <Plus className="size-4" />
              Add new
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MembersPage;
