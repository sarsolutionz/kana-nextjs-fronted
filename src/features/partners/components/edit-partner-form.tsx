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
import { partnerFormSchema } from "@/features/partners/schemas";
import { useEditPartnerByIdMutation } from "@/redux/features/partner/partnerApi";

type FormValues = z.input<typeof partnerFormSchema>;
interface EditPartnerFormProps {
    onCancel: () => void;
    id: string;
    initialValues?: FormValues;
    error?: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
}

export const EditPartnerForm = ({
    onCancel,
    id,
    initialValues,
    error: userError,
    isLoading: userLoading,
}: EditPartnerFormProps) => {
    const form = useForm<z.infer<typeof partnerFormSchema>>({
        resolver: zodResolver(partnerFormSchema),
        defaultValues: initialValues,
    });

    const [
        editPartnerById,
        { isSuccess: editIsSuccess, isLoading: editIsLoading, error: editError },
    ] = useEditPartnerByIdMutation();

    const error = userError || editError;
    const isLoading = userLoading || editIsLoading;

    useEffect(() => {
        if (editIsSuccess) {
            toast.success("Partner updated");
            form.reset();
            onCancel?.();
        }
        form.reset(initialValues);
        if (error && "data" in error) {
            toast.error("Something went wrong");
        }
    }, [editIsSuccess, form, onCancel, error, initialValues]);

    const onSubmit = async (values: z.infer<typeof partnerFormSchema>) => {
        await editPartnerById({ id, data: values });
    };

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
                <CardTitle className="text-xl font-bold">Edit a partner</CardTitle>
            </CardHeader>
            <div className="px-7">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter your email"
                                            />
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
                                        <FormLabel>Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your name" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_deleted"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Deleted</FormLabel>
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel className="space-y-1 leading-none">
                                                Is deleted
                                            </FormLabel>
                                        </FormItem>
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
