/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { apiSchema } from "../schemas";
import { VehicleInfoSchema } from "../schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { VehicleType, VehicleStatus, LoactionStatus } from "../types";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type FormValues = z.input<typeof VehicleInfoSchema>;
type ApiFormValues = z.input<typeof apiSchema>;
interface VehicleInfoFormProps {
  id?: string;
  data: any;
  isSuccess: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
}

export const VehicleInfoForm = ({
  id,
  data,
  isSuccess,
  isLoading,
  error,
  defaultValues,
  onSubmit,
}: VehicleInfoFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(VehicleInfoSchema),
    defaultValues: defaultValues,
  });

  const successToastShown = useRef(false);

  useEffect(() => {
    if (isSuccess && data) {
      if (!successToastShown.current) {
        successToastShown.current = true;
        const msg = data.message;
        if (msg === undefined) return;
        toast.success(msg);
      }
      form.reset(defaultValues);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        const errorMessage =
          errorData?.data?.errors?.error || "Something went wrong";
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, data, error, form, defaultValues]);

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedInput = e.target.value.replace(/-/g, "").toUpperCase();
    const formattedValue = cleanedInput
      .slice(0, 10)
      .replace(/(.{0,2})(.{0,2})(.{0,2})(.{0,4})/, (_, p1, p2, p3, p4) =>
        [p1, p2, p3, p4].filter(Boolean).join("-")
      );
    form.setValue("vehicle_number", formattedValue, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter owner name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter model name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter owner phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alternate_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter driver phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicle_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an vehicle type" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent>
                  <SelectItem value={VehicleType.OPEN}>Open</SelectItem>
                  <SelectItem value={VehicleType.CLOSE}>Close</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an vehicle status" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent>
                  <SelectItem value={VehicleStatus.IN_COMPLETE}>
                    Incomplete
                  </SelectItem>
                  <SelectItem value={VehicleStatus.IN_PROGRESS}>
                    Progress
                  </SelectItem>
                  <SelectItem value={VehicleStatus.COMPLETED}>
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Status</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an location status" />
                  </SelectTrigger>
                </FormControl>
                <FormMessage />
                <SelectContent>
                  <SelectItem value={LoactionStatus.ON_LOCATION}>On</SelectItem>
                  <SelectItem value={LoactionStatus.OFF_LOCATION}>
                    Off
                  </SelectItem>
                  <SelectItem value={LoactionStatus.IN_TRANSIT}>
                    In Transit
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vehicle_number"
          rules={{
            pattern: {
              value: /^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-[0-9]{4}$/,
              message: "Invalid vehicle number",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  onChange={handleChange}
                  placeholder="Enter vehicle number (e.g., GJ-05-ES-9658)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Capacity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={() => {
                    field.onChange(Number(field.value));
                  }}
                  placeholder="Enter vehicle capacity"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={isLoading}>
          {id ? "Save changes" : "Create Vehicle Info"}
        </Button>
      </form>
    </Form>
  );
};
