import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { StateCitySelector } from "@/components/states-selector";

import { DatePicker } from "@/components/date-picker";

import { createNotificationSchema } from "../schemas";

import { useCreateNotificationMutation } from "@/redux/features/vehicle/vehicleApi";
import { TransportSelector } from "@/components/transport-selector";
interface CreateNotificationFormProps {
  id?: string;
  onCancel?: () => void;
}

export const CreateNotificationForm = ({
  id,
  onCancel,
}: CreateNotificationFormProps) => {
  const form = useForm<z.infer<typeof createNotificationSchema>>({
    resolver: zodResolver(createNotificationSchema),
    defaultValues: {
      date: new Date(),
      source: "",
      destination: "",
      rate: 1,
      weight: 1,
      message: "",
      contact: "",
    },
  });

  const [createNotification, { isSuccess, isLoading, error }] =
    useCreateNotificationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Notification created successfully");
      form.reset();
      onCancel?.();
    }
    if (error) {
      if ("data" in error) {
        const errorData = "Something went wrong";
        toast.error(errorData);
      }
    }
  }, [isSuccess, error, form, onCancel]);

  const onSubmit = async (values: z.infer<typeof createNotificationSchema>) => {
    const modifiedValues = {
      ...values,
      date: values.date.toISOString().split("T")[0],
    };

    const payload = {
      vehicle_ids: id?.split(",").map(Number),
      notifications: [modifiedValues],
    };
    await createNotification(payload);
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a notification
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <StateCitySelector
                        countryCode="IN"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <StateCitySelector
                        countryCode="IN"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={() => {
                          field.onChange(Number(field.value));
                        }}
                        placeholder="Enter rate"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onBlur={() => {
                          field.onChange(Number(field.value));
                        }}
                        placeholder="Enter weight"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2 w-full">
              <div>
                <h3 className="text-lg font-medium">Client Information</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed instructions for driver about the client
                </p>
              </div>
              <Separator className="bg-primary/10" />
              <TransportSelector form={form} isLoading={isLoading} />
            </div>
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      disabled={isLoading}
                      className="bg-background resize-none"
                      placeholder="Enter instructions here for the driver"
                    />
                  </FormControl>
                  <FormDescription>
                    Describe in detail about company&apos;s information and
                    relevant details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between pt-5">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isLoading}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isLoading}>
                create notification
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
