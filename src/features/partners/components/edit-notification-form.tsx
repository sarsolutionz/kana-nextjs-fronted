/* eslint-disable react-hooks/exhaustive-deps */
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Loader } from "lucide-react";
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
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { dashboardFormSchema } from "@/features/dashboard/schemas";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/date-picker";
import { useGetSummary } from "@/hooks/use-get-summary";
import { format } from "date-fns";
import { useEditNotificationByIdMutation } from "@/redux/features/vehicle/vehicleApi";

type FormValues = z.input<typeof dashboardFormSchema>;
interface EditNotioficationFormProps {
    onCancel: () => void;
    id: string;
    initialValues?: FormValues;
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading?: boolean;
}

export const EditNotioficationForm = ({
    onCancel,
    id,
    initialValues,
    error: notificationError,
    isLoading: notificationLoading,
}: EditNotioficationFormProps) => {
    const summary = useGetSummary();

    const form = useForm<z.infer<typeof dashboardFormSchema>>({
        resolver: zodResolver(dashboardFormSchema),
        defaultValues: initialValues,
    });

    const [editNotificationById, { isLoading: editNotificationIsLoading, error: editNotificationError, data }] = useEditNotificationByIdMutation();
    const error = notificationError || editNotificationError;
    const isLoading = notificationLoading || editNotificationIsLoading;

    useEffect(() => {
        if (initialValues) {
            form.reset(initialValues);
        }
    }, [initialValues, form]);

    const status = data?.status ?? undefined;
    const message = data?.message ?? undefined;

    useEffect(() => {
        if (status === 200) {
            summary?.refetch();
            toast.success("Notification Updated Successfully");
            onCancel?.();
        }
        if (status === 400) {
            toast.error(message)
            onCancel?.();
        }
        if (error && 'status' in error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorData = (error.data as any)?.detail;
            toast.error(errorData);
        }
    }, [error, summary, data, onCancel]);

    const onSubmit = async (values: z.infer<typeof dashboardFormSchema>) => {
        const modifiedValues = {
            ...values,
            date: format(values.date, "yyyy-MM-dd"),
        };

        const payload = {
            notification_id: id,
            notifications: modifiedValues,
        };
        await editNotificationById(payload)
    }

    if (isLoading) {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">Edit a notification</CardTitle>
            </CardHeader>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="source"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Source</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter source" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="destination"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Destination</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter destination" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="rate"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
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
                                    <FormItem className="space-y-1">
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
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Contact</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter contact" />
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
                                name="is_read"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Read Notification</FormLabel>
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="space-y-1 leading-none">
                                                If you want to cancel the order uncheck the box.
                                            </FormLabel>
                                        </FormItem>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Type your message here."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
