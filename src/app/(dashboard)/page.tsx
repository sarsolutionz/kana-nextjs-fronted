"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

import { ContentLayout } from "@/components/admin-panel/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);
  if (!user) redirect("/sign-in");

  return (
    <ContentLayout title="Home">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </ContentLayout>
  );
}
