"use client";

import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import { DataTable } from "@/features/partners/components/data-table";
import { DataFilters } from "@/features/partners/components/data-filters";

import { columns } from "@/features/partners/components/columns";
import { PartnerColumns } from "@/features/partners/components/partner-columns";

import { useGetDriverInfoQuery } from "@/redux/features/partner/partnerApi";
import { useGetAllNotificationByFilterQuery } from "@/redux/features/vehicle/vehicleApi";

import { getNotificationFlags } from "@/lib/utils";

import { useCreatePartnerModal } from "../hooks/use-create-partner-modal";
import { useNotificationFilters } from "../hooks/use-notification-filters";

export const PartnerViewSwitcher = () => {
    const { open } = useCreatePartnerModal();
    const [{ creatorId, status, dueDate }] = useNotificationFilters();
    const { read, accepted } = getNotificationFlags(status);

    const { data: DriverInfo, isLoading: driverLoading } = useGetDriverInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const drivers = DriverInfo?.drivers ?? [];

    const { data: NotificationsData, isLoading: notificationLoading } = useGetAllNotificationByFilterQuery({
        read: read,
        accepted: accepted,
        date: dueDate ?? undefined,
        user: creatorId ?? undefined,
    }, {
        refetchOnMountOrArgChange: true,
    });

    const notfications = NotificationsData?.data ?? [];
    const creators = NotificationsData?.creators ?? []

    const [view, setView] = useQueryState("partner-view", {
        defaultValue: "notification",
    });

    const isLoading = driverLoading || notificationLoading;

    return (
        <Tabs
            defaultValue={view}
            onValueChange={setView}
            className="flex-1 w-full border rounded-lg"
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList className="w-full lg:w-auto rounded-lg border">
                        <TabsTrigger className="h-8 w-full lg:w-auto rounded-lg" value="notification">
                            Notification
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto rounded-lg" value="partner">
                            Partner
                        </TabsTrigger>
                    </TabsList>
                    <Button onClick={open} size="sm" className="w-full lg:w-auto">
                        <PlusIcon className="size-4 mr-1" />
                        New Partner
                    </Button>
                </div>
                <Separator className="my-4" />
                {view === "notification" &&
                    <>
                        <DataFilters creators={creators} />
                        <Separator className="my-4" />
                    </>
                }
                {isLoading ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <TabsContent value="notification" className="mt-0">
                            <DataTable
                                columns={columns}
                                disabled={isLoading}
                                data={notfications}
                                path="notification"
                            />
                        </TabsContent>
                        <TabsContent value="partner" className="mt-0">
                            <DataTable
                                columns={PartnerColumns}
                                disabled={isLoading}
                                data={drivers}
                                filterKey="email"
                                path="partner"
                            />
                        </TabsContent>
                    </>
                )}
            </div>
        </Tabs>
    )
}