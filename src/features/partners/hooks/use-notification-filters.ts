import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { NotificationStatus } from "@/features/partners/types";

export const useNotificationFilters = () => {
    return useQueryStates({
        status: parseAsStringEnum(Object.values(NotificationStatus)),
        creatorId: parseAsString,
        search: parseAsString,
        dueDate: parseAsString,
    });
};