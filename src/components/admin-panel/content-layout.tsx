import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div
        className={cn(
          title === "Dashboard"
            ? "container pt-8 pb-8 px-4 sm:px-8 2xl:px-14"
            : "min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] pt-8 pb-8 px-4 sm:px-8"
        )}
      >
        {children}
      </div>
    </div>
  );
}
