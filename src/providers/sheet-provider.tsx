"use client"

import { useMountedState } from "react-use"

import { NewVehicleSheet } from "@/features/members/components/new-vehicle-sheet"

export const SheetProvider = () => {
    const isMounted = useMountedState();
    
    if (!isMounted) return null;

    return (
        <>
        <NewVehicleSheet /> 
        </>
    )
}