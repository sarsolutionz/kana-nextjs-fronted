import { ListChecksIcon, UserIcon } from "lucide-react";

import { DatePicker } from "@/components/date-picker";

import { Creators, NotificationStatus } from "@/features/partners/types";
import { useNotificationFilters } from "@/features/partners/hooks/use-notification-filters";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { format } from "date-fns";

interface DataFiltersProps {
    creators: Creators[];
}

export const DataFilters = ({ creators }: DataFiltersProps) => {
    const [{ creatorId, status, dueDate }, setNotifications] = useNotificationFilters();

    const onStatusChange = (value: string) => {
        setNotifications({ status: value === "all" ? null : (value as NotificationStatus) });
    }

    const onPartnerChange = (value: string) => {
        setNotifications({ creatorId: value === "all" ? null : (value as string) });
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
                defaultValue={creatorId || undefined}
                onValueChange={(value) => onPartnerChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All partners" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All creators</SelectItem>
                    <SelectSeparator />
                    {creators.map((creator) => (
                        <SelectItem key={creator.id} value={creator.name}>
                            {creator.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DatePicker
                placeholder="Due date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setNotifications({ dueDate: date ? format(date, 'yyyy-MM-dd') : undefined });
                }}
            />
        </div>
    )
}