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

export const SignUpCard = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log({ values });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none lg:rounded-none">
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
              name="password"
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
            <Button disabled={false} size="lg" className="w-full">
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
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          disabled={false}
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
            <span className="text-black hover:underline">Terms of Service</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-black hover:underline">Privacy Policy.</span>
          </Link>
        </CardDescription>
        <p className="p-3 text-muted-foreground">
          Already have an account?
          <Link href={"/sign-in"}>
            <span className="hover:underline text-black">&nbsp;Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
