import { z } from "zod";
import { useEffect } from "react";
import { Loader } from "lucide-react";

import { skipToken } from "@reduxjs/toolkit/query";
import { VehicleInfoSchema } from "../schemas";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useOpenMember } from "../hooks/use-open-member";
import { VehicleInfoForm } from "./vehicle-info-form";

import {
  useEditVehicleInfoMutation,
  useGetByIdVehicleInfoQuery,
} from "@/redux/features/vehicle/vehicleApi";

import { VehicleType, VehicleStatus, LocationStatus } from "../types";

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
    refetchOnMountOrArgChange: false,
  });

  const [
    editVehicleInfo,
    { isSuccess: editSuccess, error: editError, isLoading: editIsLoading },
  ] = useEditVehicleInfoMutation();

  useEffect(() => {
    if (id && memberSuccess && editSuccess) {
      memberRefetch();
    }
  }, [id, memberSuccess, memberRefetch, editSuccess]);

  const error = memberError || editError;
  const isSuccess = memberSuccess || editSuccess;
  const isLoading = memberLoading || editIsLoading;

  const onSubmit = async (values: FormValues) => {
    await editVehicleInfo({ id, data: values });
    onClose();
  };

  const defaultValues = memberData
    ? {
        model: memberData.model || "",
        name: memberData.name || "",
        number: memberData.number || "",
        alternate_number: memberData.alternate_number || "",
        address: memberData.address || "",
        vehicle_type: memberData.vehicle_type || VehicleType.DEFAULT,
        status: memberData.status || VehicleStatus.DEFAULT,
        location_status: memberData.location_status || LocationStatus.DEFAULT,
        vehicle_number: memberData.vehicle_number || "",
        capacity: memberData.capacity || undefined,
      }
    : {
        model: "",
        name: "",
        number: "",
        alternate_number: "",
        address: "",
        vehicle_type: VehicleType.DEFAULT,
        status: VehicleStatus.DEFAULT,
        location_status: LocationStatus.DEFAULT,
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
              isSuccess={isSuccess}
              isLoading={isLoading}
              error={error}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
