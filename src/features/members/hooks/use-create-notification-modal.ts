import { parseAsInteger, useQueryState, } from "nuqs";

export const useCreateNotificationModal = () => {
    const [notificationId, setNotificationId] = useQueryState(
        "create-notification",
        parseAsInteger,
    )

    const open = (id: number) => setNotificationId(id);
    const close = () => setNotificationId(null);

    return {
        notificationId,
        open,
        close,
        setNotificationId,
    };
};