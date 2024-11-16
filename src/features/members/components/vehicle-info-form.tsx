import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { VehicleType } from "../types";
import { useCreateVehicleMutation } from "@/redux/features/vehicle/vehicleApi";
import { toast } from "sonner";
import { useEffect } from "react";

type FormValues = z.infer<typeof VehicleInfoSchema>;

interface VehicleInfoFormProps {
  onCancel?: () => void;
}

export const VehicleInfoForm = ({onCancel}: VehicleInfoFormProps) => {
  const [createVehicle, { data, isSuccess, error, isLoading }] =
    useCreateVehicleMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(VehicleInfoSchema),
    defaultValues: {
      model: "",
      name: "",
      number: "",
      address: "",
      vehicle_type: VehicleType.DEFAULT,
      vehicle_number: "",
      capacity: undefined,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const msg = data.message;
      toast.success(msg)
      form.reset();
      onCancel?.();
    }
    if (error) {
      if ("data" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData = error as any;
        const emailErrorMessage = errorData.data.errors.error
        toast.error(emailErrorMessage);
      }
    }
  }, [isSuccess, data, error, form])
  

  const onSubmit = async (values: FormValues) => {
    await createVehicle(values);
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
              <FormLabel>Owner Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter phone number" />
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
              <Select defaultValue={field.value} onValueChange={field.onChange}>
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
          name="vehicle_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Vehicle Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
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
          {false ? "Save changes" : "Create Vehicle Info"}
        </Button>
      </form>
    </Form>
  );
};
