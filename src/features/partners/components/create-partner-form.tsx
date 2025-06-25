"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { partnerSignUpSchema } from "../schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { usePartnerSignUpMutation } from "@/redux/features/partner/partnerApi";

interface CreatePartnerFormProps {
    onCancel?: () => void;
}

export const CreatePartnerForm = ({ onCancel }: CreatePartnerFormProps) => {
    const form = useForm<z.infer<typeof partnerSignUpSchema>>({
        resolver: zodResolver(partnerSignUpSchema),
        defaultValues: {
            email: "",
            full_name: "",
            number: "",
        },
    });

    const [partnerSignUp, { error, isSuccess, isLoading }] = usePartnerSignUpMutation();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Partner created");
        }
        if (error) {
            if ("data" in error) {
                toast.error("Something went wrong!");
            }
        }
    }, [isSuccess, error]);

    const onSubmit = async (values: z.infer<typeof partnerSignUpSchema>) => {
        await partnerSignUp(values);
        form.reset();
        onCancel?.();
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">Create a new partner</CardTitle>
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
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>FullName</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your fullname" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email address</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter your email" />
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
                                        <FormLabel>Enter Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter phone number"
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
                                Create Partner
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
