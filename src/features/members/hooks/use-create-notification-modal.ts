import { parseAsString, useQueryState, } from "nuqs";

export const useCreateNotificationModal = () => {
    const [notificationId, setNotificationId] = useQueryState(
        "create-notification",
        parseAsString,
    )

    const open = (ids: string[]) => setNotificationId(ids.join(","));
    const close = () => setNotificationId(null);

    return {
        notificationId,
        open,
        close,
        setNotificationId,
    };
};