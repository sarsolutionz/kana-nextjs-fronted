import { z } from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { 
    Select, 
    SelectItem, 
    SelectValue, 
    SelectContent, 
    SelectTrigger, 
} from "@/components/ui/select";

import { items } from "../types"
import { displayFormSchema } from "../schemas"

import { ActiveProfile } from "@/features/teams/types"
import { useCreateDisplayMutation } from "@/redux/features/vehicle/vehicleApi"

import { useConfirm } from "@/hooks/use-confirm"

export const DisplayForm = () => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Sidebar Items",
        "Are you sure you want to update this sidebar?"
    );

    const form = useForm<z.infer<typeof displayFormSchema>>({
        resolver: zodResolver(displayFormSchema),
        defaultValues: {
            items: ["members"],
            role: undefined,
        },
        mode: "onChange",
    });

    const [createDisplay, { isLoading, data }] = useCreateDisplayMutation();

    const status = data?.status ?? undefined;
    const message = data?.message ?? undefined;

    useEffect(() => {
        if (status === 201) {
            toast.success(message);
            form.reset();
        }
        if (status === 400) {
            toast.error(message)
        }
    }, [message, status, form]);

    const onSubmit = async (values: z.infer<typeof displayFormSchema>) => {
        const ok = await confirm();
        if (!ok) return;
        await createDisplay(values)
    };

    return (
        <>
            <ConfirmDialog />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col w-[200px]">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        value={field.value || ActiveProfile.DEFAULT}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an role type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage />
                                        <SelectContent>
                                            <SelectItem value={ActiveProfile.ADMIN}>
                                                Admin
                                            </SelectItem>
                                            <SelectItem value={ActiveProfile.STAFF}>
                                                Staff
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Sidebar</FormLabel>
                                    <FormDescription>
                                        Select the items you want to display in the sidebar.
                                    </FormDescription>
                                </div>
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-y-0 space-x-3"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>Update display</Button>
                </form>
            </Form>
        </>
    )
}