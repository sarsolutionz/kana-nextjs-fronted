"use client";

import Link from "next/link";
import { z } from "zod";

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

import { loginSchema } from "../schemas";
import { useSignInMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignInCard = () => {
  const router = useRouter();
  const [signIn, { data, isSuccess, error, isLoading }] = useSignInMutation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.msg;
      router.push("/");
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorData = error as any;
        const emailErrorMessage = errorData.data.errors.email
          ? errorData.data.errors.email[0]
          : errorData.data.errors.password;
        toast.error(emailErrorMessage);
      }
    }
  }, [isSuccess, error, data?.msg, router]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await signIn(values);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none lg:rounded-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
        <CardDescription>
          Login or Create account to get back to your dashboard!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-7 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button disabled={isLoading} size="lg" className="w-full">
              Login
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
      <CardContent className="flex text-sm items-center justify-center">
        <p className="py-3 text-muted-foreground">
          Don&apos;t have an account?
          <Link href={"/sign-up"}>
            <span className="hover:underline text-black">&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
