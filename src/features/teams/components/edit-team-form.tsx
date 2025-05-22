import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTeamSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActiveProfile } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useEditUserByIdMutation,
  useGetUserByIdQuery,
} from "@/redux/features/team/teamApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { skipToken } from "@reduxjs/toolkit/query";

interface EditTeamFormProps {
  onCancel: () => void;
  id: string;
}

export const EditTeamForm = ({ onCancel, id }: EditTeamFormProps) => {
  const form = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: async () => {
      if (userData) {
        return {
          name: userData.name || "",
          number: userData.number || "",
          is_active: userData.is_active ?? false,
          is_admin: userData.is_admin ?? false,
          is_blocked: userData.is_blocked ?? false,
          role: userData.role || ActiveProfile.DEFAULT,
          email: userData.email || "",
        };
      }
      return {
        name: "",
        number: "",
        is_active: false,
        is_admin: false,
        is_blocked: false,
        role: ActiveProfile.DEFAULT,
        email: "",
      };
    },
  });

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIdQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });

  const [
    editUserById,
    { isSuccess: editIsSuccess, isLoading: editIsLoading, error: editError },
  ] = useEditUserByIdMutation();

  const error = userError || editError;
  const isLoading = userLoading || editIsLoading;

  useEffect(() => {
    if (editIsSuccess) {
      toast.success("User updated");
      form.reset();
      onCancel?.();
    }
    if (error && "data" in error) {
      toast.error("Something went wrong");
    }
  }, [editIsSuccess, id, form, onCancel, error]);

  const onSubmit = async (values: z.infer<typeof createTeamSchema>) => {
    await editUserById({ id, data: values });
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Edit a team</CardTitle>
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
                        disabled
                        className="opacity-100 bg-muted"
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
                name="is_admin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permissions 1</FormLabel>
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          disabled
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
                    <FormLabel>User Blocked</FormLabel>
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="space-y-1 leading-none">
                        Is blocked
                      </FormLabel>
                    </FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        console.log("Role changed to:", value);
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
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
