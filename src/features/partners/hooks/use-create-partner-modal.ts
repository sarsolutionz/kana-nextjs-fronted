import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreatePartnerModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-partner",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        setIsOpen,
    };
};