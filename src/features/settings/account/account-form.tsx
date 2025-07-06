import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { accountFormSchema } from "../schemas"
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi"
import { toast } from "sonner"

export const AccountForm = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            password: "",
            confirm: "",
            current: ""
        },
        mode: "onChange",
    });

    const [updatePassword, { isLoading, data }] = useUpdatePasswordMutation();

    const status = data?.status ?? undefined
    const message = data?.message ?? undefined

    useEffect(() => {
        if (status === 200) {
            toast.success(message);
            form.reset();
        }
        if (status === 400) {
            toast.error(message)
        }
    }, [message, status, form]);

    const onSubmit = async (values: z.infer<typeof accountFormSchema>) => {
        await updatePassword(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="current"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showCurrentPassword ? "text" : "password"}
                                            {...field}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(e => !e)}
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                                            tabIndex={-1}
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOffIcon className="size-5 text-muted-foreground" />
                                            ) : (
                                                <EyeIcon className="size-5 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Enter your current password to confirm changes.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            {...field}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(e => !e)}
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                                            tabIndex={-1}
                                        >
                                            {showNewPassword ? (
                                                <EyeOffIcon className="size-5 text-muted-foreground" />
                                            ) : (
                                                <EyeIcon className="size-5 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Your new password must be at least 8 characters long.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...field}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(e => !e)}
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
                                            tabIndex={-1}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOffIcon className="size-5 text-muted-foreground" />
                                            ) : (
                                                <EyeIcon className="size-5 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Re-enter your new password to confirm it matches.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isLoading}>Update account</Button>
            </form>
        </Form>
    )
}