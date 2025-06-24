import { parseAsString, useQueryState, } from "nuqs";

export const useEditPartnerModal = () => {
    const [partnerId, setPartnerId] = useQueryState(
        "edit-partner",
        parseAsString,
    )

    const open = (id: string) => setPartnerId(id);
    const close = () => setPartnerId(null);

    return {
        partnerId,
        open,
        close,
        setPartnerId,
    };
};