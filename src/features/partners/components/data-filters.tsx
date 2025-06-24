import { ListChecksIcon, UserIcon } from "lucide-react";

import { DatePicker } from "@/components/date-picker";

import { NotificationStatus } from "@/features/partners/types";
import { useNotificationFilters } from "@/features/partners/hooks/use-notification-filters";

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectSeparator, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

export const DataFilters = () => {
    const [{ partnerId, status, dueDate }, setNotifications] = useNotificationFilters();

    const onStatusChange = (value: string) => {
        setNotifications({ status: value === "all" ? null : (value as NotificationStatus) });
    }

    const onPartnerChange = (value: string) => {
        setNotifications({ partnerId: value === "all" ? null : (value as string) });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status || undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All statuses" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    <SelectItem value={NotificationStatus.DONE}>Done</SelectItem>
                    <SelectItem value={NotificationStatus.IN_PROGRESS}>Progress</SelectItem>
                    <SelectItem value={NotificationStatus.REJECTED}>Rejected</SelectItem>
                </SelectContent>
            </Select>
            <Select
                defaultValue={partnerId || undefined}
                onValueChange={(value) => onPartnerChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All partners" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All partners</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="partner1">Partner 1</SelectItem>
                </SelectContent>
            </Select>
            <DatePicker
                placeholder="Due date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setNotifications({ dueDate: date ? date.toISOString() : undefined });
                }}
            />
        </div>
    )
}