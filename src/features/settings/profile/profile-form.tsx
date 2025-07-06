import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormItem,
    FormLabel,
    FormField,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import { ProfileData } from "../types";
import { profileFormSchema } from "../schemas";
import { useEditUserByIdMutation } from "@/redux/features/team/teamApi";
import { useEffect } from "react";
import { toast } from "sonner";

interface ProfileFormProps {
    id: string;
    data: ProfileData;
    isLoading: boolean;
};

export const ProfileForm = ({
    id,
    data,
    isLoading: getIsLoading,
}: ProfileFormProps) => {
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: data.name ?? "",
            email: data.email ?? "",
            number: data.number ?? "",
            is_active: data.is_active ?? false,
            is_admin: data.is_admin ?? "",
            is_blocked: data.is_blocked ?? "",
        },
        mode: "onChange",
    });

    const [
        editUserById,
        { isLoading: editIsLoading, data: editData },
    ] = useEditUserByIdMutation();

    const isLoading = getIsLoading || editIsLoading;
    const status = editData?.status ?? undefined
    const message = editData?.message ?? undefined

    useEffect(() => {
        if (status === 200) {
            toast.success(message);
            form.reset(editData.data);
        }
        if (status === 400) {
            toast.error(message)
        }
    }, [message, status, form, editData]);

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        if (values.is_admin) {
            delete values.is_active;
        }
        await editUserById({ id, data: values });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your name" autoComplete="name" />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="example@gmail.com" />
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
                                    <Input {...field} placeholder="1234567890" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="is_admin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Permissions 1</FormLabel>
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                    <FormControl>
                                        <Checkbox
                                            disabled={true}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="space-y-1 leading-none">
                                        Is admin
                                    </FormLabel>
                                </FormItem>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Permissions 2</FormLabel>
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                    <FormControl>
                                        <Checkbox
                                            disabled={data.is_admin}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="space-y-1 leading-none">
                                        Is active
                                    </FormLabel>
                                </FormItem>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="is_blocked"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Permissions 3</FormLabel>
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="space-y-1 leading-none">
                                        Is Blocked
                                    </FormLabel>
                                </FormItem>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {id &&
                    <Button type='submit' disabled={isLoading}>Update profile</Button>
                }
            </form>
        </Form>
    )
}