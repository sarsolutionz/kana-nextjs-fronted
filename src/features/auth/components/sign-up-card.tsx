"use client";

import { z } from "zod";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { registerSchema } from "../schemas";
import { useEffect } from "react";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpCard = () => {
  const router = useRouter();
  const [signUp, { data, error, isSuccess, isLoading }] = useSignUpMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      number: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.msg;
      router.push("/sign-in")
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData = error as any;
        const emailErrorMessage = errorData.data.errors.email ? errorData.data.errors.email[0] : errorData.data.errors.password;
        toast.error(emailErrorMessage);
      }
    }
  }, [isSuccess, error, data?.msg, router]);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    await signUp(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none lg:rounded-l-xl lg:rounded-r-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your credential below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-7 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} size="lg" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7 py-7">
        <Separator />
      </div>
      <CardContent className="py-2 flex flex-col gap-y-4">
        <Button
          disabled={isLoading}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          disabled={isLoading}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <CardContent className="text-sm items-center justify-center text-center">
        <CardDescription>
          By clicking continue, you agree to our{" "}
          <Link href="/privacy">
            <span className="text-black hover:underline dark:text-gray-300">Terms of Service</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-black hover:underline dark:text-gray-300">Privacy Policy.</span>
          </Link>
        </CardDescription>
        <p className="p-3 text-muted-foreground">
          Already have an account?
          <Link href={"/sign-in"}>
            <span className="hover:underline text-black dark:text-gray-300">&nbsp;Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
