import { parseAsString, useQueryState } from "nuqs";

export const useEditNotificationModal = () => {
    const [notificationId, setNotificationId] = useQueryState(
        "edit-notification",
        parseAsString,
    )

    const open = (id: string) => setNotificationId(id);
    const close = () => setNotificationId(null);

    return {
        notificationId,
        open,
        close,
        setNotificationId,
    };
}