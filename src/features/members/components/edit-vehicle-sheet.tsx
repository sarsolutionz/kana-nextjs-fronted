import { z } from "zod";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useOpenMember } from "../hooks/use-open-member";
import { VehicleInfoSchema } from "../schemas";
import { skipToken } from "@reduxjs/toolkit/query";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { VehicleInfoForm } from "./vehicle-info-form";

import { useGetByIdVehicleInfoQuery } from "@/redux/features/vehicle/vehicleApi";

import { VehicleType } from "../types";

type FormValues = z.input<typeof VehicleInfoSchema>;

export const EditVehicleSheet = () => {
  const { isOpen, onClose, id } = useOpenMember();

  const {
    data: memberData,
    refetch: memberRefetch,
    isLoading: memberLoading,
    isSuccess: memberSuccess,
    error: memberError,
  } = useGetByIdVehicleInfoQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (id && memberSuccess) {
      memberRefetch();
    }
  }, [id, memberSuccess, memberRefetch]);

  const isLoading = memberLoading;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const defaultValues = memberData
    ? {
        model: memberData.model || "",
        name: memberData.name || "",
        number: memberData.number || "",
        address: memberData.address || "",
        vehicle_type: memberData.vehicle_type || VehicleType.DEFAULT,
        vehicle_number: memberData.vehicle_number || "",
        capacity: memberData.capacity || undefined,
      }
    : {
        model: "",
        name: "",
        number: "",
        address: "",
        vehicle_type: VehicleType.DEFAULT,
        vehicle_number: "",
        capacity: undefined,
      };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Member</SheetTitle>
            <SheetDescription>Edit an existing member.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <VehicleInfoForm
              key={id}
              id={id}
              data={memberData}
              isSuccess={memberSuccess}
              isLoading={memberLoading}
              error={memberError}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
