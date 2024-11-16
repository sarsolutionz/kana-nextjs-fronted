'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCreateVehicleModal } from "../hooks/use-create-vehicle-modal"
import { VehicleInfoForm } from "./vehicle-info-form";

export const NewVehicleSheet = () => {
    const {isOpen, setIsOpen, close} = useCreateVehicleModal();
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Vehicle</SheetTitle>
                    <SheetDescription>Add a new vehicle info</SheetDescription>
                </SheetHeader>
                <VehicleInfoForm onCancel={close} />
            </SheetContent>
        </Sheet>
    )
}