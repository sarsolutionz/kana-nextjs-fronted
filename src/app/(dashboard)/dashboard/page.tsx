/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { WelcomeMsg } from "@/components/welcome-msg";
import { Filters } from "@/components/filters";
import { DataGrid } from "@/components/data-grid";
import { DataCharts } from "@/components/data-charts";
import { DataTable } from "@/components/admin-panel/data-table";

import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";

import { useGetSummary } from "@/hooks/use-get-summary";
import { useEffect } from "react";

export default function DashboardPage() {
  const summary = useGetSummary();
  const notifications = summary?.notifications;
  const isSuccess = summary?.isSuccess;

  useEffect(() => {
    if (isSuccess) {
      summary.refetch();
    }
  }, [isSuccess, summary?.refetch]);

  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;

  return (
    <>
      <div className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-4 lg:px-6 pb-30">
        <div className="max-w-screen-2xl mx-auto">
          <ContentLayout title="Dashboard">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="text-white">
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    Dashboard
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <WelcomeMsg />
            <Filters />
            <TooltipProvider>
              <div className="flex gap-6 mt-6 pb-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is-hover-open"
                        onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                        checked={settings.isHoverOpen}
                      />
                      <Label htmlFor="is-hover-open">Hover Open</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      When hovering on the sidebar in mini state, it will open
                    </p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="disable-sidebar"
                        onCheckedChange={(x) => setSettings({ disabled: x })}
                        checked={settings.disabled}
                      />
                      <Label htmlFor="disable-sidebar">Disable Sidebar</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hide sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </ContentLayout>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 px-3 lg:px-14 -mt-20">
        <DataGrid />
        <DataCharts />
        <DataTable data={notifications} />
      </div>
    </>
  );
}
