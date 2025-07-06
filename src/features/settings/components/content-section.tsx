import { Separator } from "@/components/ui/separator";

interface ContentSectionProps {
    title: string;
    desc: string;
    children: React.ReactNode;
};

export const ContentSection = ({
    title,
    desc,
    children,
}: ContentSectionProps) => {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex-none">
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
            <Separator className="my-4 flex-none" />
            <div className="faded-bottom h-full w-full overflow-y-auto scroll-smooth pr-4 pb-12">
                <div className="px-1.5">{children}</div>
            </div>
        </div>
    )
};
