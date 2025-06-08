"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

import { columns } from "./columns";

import { DataTable } from "@/components/data-table";

import { useCreateTeamModal } from "@/features/teams/hooks/use-create-team-modal";
import { useGetAllProfilesInfoQuery } from "@/redux/features/team/teamApi";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UsersPage = () => {
  const { open } = useCreateTeamModal();

  const { data = [], isLoading } = useGetAllProfilesInfoQuery({
    refetchOnMountOrArgChange: true,
  });

  return (
    <ContentLayout title="Teams">
      <div className="max-w-screen-2xl mx-auto w-full pb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Teams</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Card className="border drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Teams History
            </CardTitle>
            <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
              <Button onClick={open} size="sm" className="w-full lg:w-auto">
                <Plus className="size-4" />
                Add user
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data}
              filterKey="email"
              disabled={isLoading}
              path="teams"
            />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
};

export default UsersPage;
