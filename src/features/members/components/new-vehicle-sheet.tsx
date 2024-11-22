"use client";

import { z } from "zod";
import { Loader } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { VehicleInfoForm } from "./vehicle-info-form";
import { useCreateVehicleModal } from "../hooks/use-create-vehicle-modal";

import { useCreateVehicleMutation } from "@/redux/features/vehicle/vehicleApi";

import { VehicleInfoSchema } from "../schemas";

type FormValues = z.input<typeof VehicleInfoSchema>;

export const NewVehicleSheet = () => {
  const { isOpen, setIsOpen, close } = useCreateVehicleModal();

  const [createVehicle, { data, isSuccess, error, isLoading }] =
    useCreateVehicleMutation();

  const onSubmit = async (values: FormValues) => {
    await createVehicle(values);
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Vehicle</SheetTitle>
          <SheetDescription>Add a new vehicle info</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <VehicleInfoForm
            onSubmit={onSubmit}
            data={data}
            isSuccess={isSuccess}
            error={error}
            isLoading={isLoading}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
