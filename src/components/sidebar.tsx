import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Navigation } from "@/components/navigation";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <div className="flex items-center space-x-2 p-1">
          <Image src="/logo.png" alt="logo" width={48} height={48} />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#113e57]">Kana Logistics</h1>
            <p className="text-[#113e57] text-xs capitalize">
              A division of Dr. kana pvt. ltd.
            </p>
          </div>
        </div>
      </Link>
      <Separator className="my-4" />
      <Navigation />
    </aside>
  );
};
